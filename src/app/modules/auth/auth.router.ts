import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { loginUserValidation, registerUserValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const AuthRoutes = Router();

AuthRoutes.post(
  '/register',
  validateRequest(registerUserValidation),
  AuthController.registerUser,
);
AuthRoutes.post(
  '/login',
  validateRequest(loginUserValidation),
  AuthController.loginUser,
);

export default AuthRoutes;
