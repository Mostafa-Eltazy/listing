import { NotFoundError } from '@prisma/client/runtime';
import { NextFunction, Request, Response } from 'express';
import { FileService, IFileService } from '../services/file.service';
import { IListingsService, ListingsService } from '../services/listings.service';

export interface IListingsController {
  createListing(req: Request, res: Response, next: NextFunction): Promise<void>;
  fetchListings(req: Request, res: Response, next: NextFunction): Promise<void>;
  fetchListing(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class ListingsController implements IListingsController {
  constructor(private fileService: IFileService = new FileService(), private listingService: IListingsService = new ListingsService()) {}

  public createListing = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const creatorId = parseInt(req.params.userId);
    const { title, startPrice, maxPrice, categoryId } = req.body;

    const startPriceInt = parseInt(startPrice);
    const maxPriceInt = parseInt(maxPrice);
    const categoryIdInt = parseInt(categoryId);
    let picsUrls;

    try {
      if (req.files) {
        const files = req.files as Express.Multer.File[];
        picsUrls = await Promise.all(
          files.map(async (file: Express.Multer.File) => {
            return await this.fileService.uploadFile(file);
          }),
        );
      }
    } catch (err) {
      const error = new Error('Error uploading images, please choose another');
      next(error);
    }

    try {
      const newListing = await this.listingService.createNewListing({
        title,
        startPrice: startPriceInt,
        maxPrice: maxPriceInt,
        categoryId: categoryIdInt,
        creatorId,
        images: picsUrls,
      });
      res.status(201).json(newListing);
    } catch (err) {
      next(err);
    }
  };

  public fetchListings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const limit = parseInt(req.query.limit as unknown as string);
    const page = parseInt(req.query.page as unknown as string);

    const listingsData = await this.listingService.getListings(limit, page);
    res.status(200).json(listingsData);
  };

  public fetchListing = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const listingId = parseInt(req.params.listingId);

    const listingsData = await this.listingService.getListing(listingId);
    res.status(200).json(listingsData);
  };
}
