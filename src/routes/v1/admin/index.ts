import { Router } from 'express';

import skillRouter from './skill';
import developerProfileRouter from './developerProfile';

const adminRouter = Router();

adminRouter.use('/skill', skillRouter);
adminRouter.use('/developer-profile', developerProfileRouter);
export default adminRouter;
