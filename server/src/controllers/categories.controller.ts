import { NotFoundError } from '@prisma/client/runtime';
import { NextFunction, Request, Response } from 'express';
import { ICategoriesService, CategoriesService } from '../services/categories.service';

export interface ICategoriesController {
  fetchCategories(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class CategoriesController implements ICategoriesController {
  constructor(private categoriesService: ICategoriesService = new CategoriesService()) {}

  public fetchCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const categories =  await this.categoriesService.getCategories()
    res.status(200).json(categories);
  };
}
