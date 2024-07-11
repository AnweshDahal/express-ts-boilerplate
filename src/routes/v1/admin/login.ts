import { Router } from 'express';
import loginController from '../../../controllers/v1/admin/auth/loginController';
const loginRouter = Router();

loginRouter.route('/').post(loginController);

export default loginRouter;
