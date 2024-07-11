import { Router } from 'express';
import createSkillController from '../../../controllers/v1/admin/skill/createSkillController';
import listSkillController from '../../../controllers/v1/admin/skill/listSkillController';
import showSkillController from '../../../controllers/v1/admin/skill/showSkillController';
import deleteSkillController from '../../../controllers/v1/admin/skill/deleteSkillController';
import updateSkillController from '../../../controllers/v1/admin/skill/updateSkillController';

const skillRouter = Router();

skillRouter.route('/').get(listSkillController).post(createSkillController);

skillRouter
  .route('/:id')
  .get(showSkillController)
  .delete(deleteSkillController)
  .patch(updateSkillController);

export default skillRouter;
