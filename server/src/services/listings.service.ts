import { Listing } from '@prisma/client';
import { prisma } from '../database';

export interface IListingsService {
  getListings(limit: number, page: number): Promise<{ listings: Listing[]; count: number; limit: number }>;
  createNewListing(auctionDate: Partial<Listing>): Promise<Partial<Listing>>;
  getListing(listingId: number): Promise<Listing | null>;
}

export class ListingsService implements IListingsService {
  public async getListings(limit: number, page: number): Promise<{ listings: Listing[]; count: number; limit: number }> {
    const offset = limit * (page - 1);
    const [count, listings] = await Promise.all([
      prisma.listing.count(),
      prisma.listing.findMany({
        take: limit,
        skip: offset,
        include: { creator: { select: { username: true } } },
        orderBy: { updatedAt: 'desc' },
      }),
    ]);

    return { listings: listings, count, limit };
  }

  public async createNewListing(listingData: Partial<Listing>): Promise<Partial<Listing>> {
    const { title, startPrice, maxPrice, creatorId, categoryId, images } = listingData;

    const categoryIdInt = parseInt(categoryId as unknown as string);

    return prisma.listing.create({
      data: {
        title,
        startPrice,
        maxPrice,
        images,
        creator: { connect: { id: creatorId } },
        category: { connect: { id: categoryIdInt } },
      } as unknown as Listing,
    });
  }

  public async getListing(listingId: number): Promise<Listing | null> {
    return prisma.listing.findUnique({ where: { id: listingId } });
  }
}
