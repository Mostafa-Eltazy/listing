import { Router } from 'express';
import { Route } from '../../common/interfaces/routes.interface';
import { CategoriesController, ICategoriesController } from '../../controllers/categories.controller';


class CategoriesRoute implements Route {
  public path = '/categories';
  public router = Router();

  constructor(private categoriesController: ICategoriesController = new CategoriesController()) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.categoriesController.fetchCategories);
  }
}

export { CategoriesRoute };
