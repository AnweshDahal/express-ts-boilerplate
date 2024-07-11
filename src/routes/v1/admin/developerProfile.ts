import { Router } from 'express';

import createDeveloperProfileController from '../../../controllers/v1/admin/developerProfile/createDeveloperProfileController';
import listDeveloperProfileController from '../../../controllers/v1/admin/developerProfile/listDeveloperProfileController';
import showDeveloperProfileController from '../../../controllers/v1/admin/developerProfile/showDeveloperProfileController';
import updateDeveloperProfileController from '../../../controllers/v1/admin/developerProfile/updateDeveloperProfileController';
import deleteDeveloperProfileController from '../../../controllers/v1/admin/developerProfile/deleteDeveloperProfileController';

const developerProfileRouter = Router();

developerProfileRouter
  .route('/')
  .get(listDeveloperProfileController)
  .post(createDeveloperProfileController);

developerProfileRouter
  .route('/:id')
  .get(showDeveloperProfileController)
  .patch(updateDeveloperProfileController)
  .delete(deleteDeveloperProfileController);

export default developerProfileRouter;
