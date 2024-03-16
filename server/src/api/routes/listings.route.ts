import { Router } from 'express';
import { Route } from '../../common/interfaces/routes.interface';
import { ListingsController, IListingsController } from '../../controllers/listings.controller';
import { validate } from '../../middleware/request-validator.middleware';
import { createListingSchema } from '../../validations/listing.validation.schema';
import { auth } from '../../middleware/authenticate-token.middleware';
import { upload } from '../../middleware/upload-file.middleware';

class ListingsRoute implements Route {
  public path = '/listings';
  public router = Router();

  constructor(private listingsController: IListingsController = new ListingsController()) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.listingsController.fetchListings);
    this.router.get(`${this.path}/:listingId`, this.listingsController.fetchListing);
    this.router.post(`/users/:userId/listings`, auth, upload.array('listingsImage'), validate(createListingSchema), this.listingsController.createListing);
  }
}

export { ListingsRoute };
