import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { loginUserValidation, registerUserValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import { auth } from '../../middlewares/auth';

const route = Router();

// ------ START REGISTER ------
route.post(
  '/register',
  validateRequest(registerUserValidation),
  AuthController.registerUser,
);
// ------ END REGISTER ------

// ------ START Login ------
route.post(
  '/login',
  validateRequest(loginUserValidation),
  AuthController.loginUser,
);
// ------ END Login ------

// ------ START findSingleUser ------
route.get('/:id', auth('admin'), AuthController.findSingleUser);
// ------ END findSingleUser ------

// ------ START findAllUser ------
route.get('/', auth('admin'), AuthController.findAllUser);
// ------ END findAllUser ------

export const AuthRoutes = route;
