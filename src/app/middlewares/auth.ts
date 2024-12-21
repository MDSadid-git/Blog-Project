import { NextFunction, Request, Response } from 'express';

import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import { User } from '../modules/user/user.model';
import { TUserRole } from '../modules/auth/auth.interface';

// ------ START auth ------
export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not logged in! Please log in to get access.',
      );
    }

    // verify token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userEmail } = decoded;

    const user = await User.findOne({ userEmail }).select('+password');

    // Check user exist or no!
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This User not found');
    }

    // Check user is blocked!
    if (user.isBlocked) {
      throw new AppError(httpStatus.BAD_REQUEST, 'This User is blocked');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You don"t have access to perform this action',
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
// ------ END auth ------
