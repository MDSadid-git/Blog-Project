import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import bcrypt from 'bcrypt';
import { TLoginUser, TRegisterUser } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../config';

// ------ START REGISTER ------
const registerUserIntoDB = async (payload: TRegisterUser) => {
  const result = await User.create(payload);
  const userCreated = {
    id: result.id,
    email: result.email,
    name: result.name,
  };
  return userCreated;
};
// ------ END REGISTER ------

// ------ START Login ------
const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email });

  // Check user exist or no!
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Check user is blocked!
  if (user.isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is blocked');
  }

  // Check password match
  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);

  if (isPasswordMatch === false) {
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid password');
  }

  // Create JWT token
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    userId: user._id,
    accessToken,
  };
};
// ------ END Login ------

// ------ START Find User ------
const findSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};
// ------ END Find User ------

// ------ START Find All User ------
const findAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};
// ------ END Find All User ------

export const AuthServices = {
  registerUserIntoDB,
  loginUser,
  findSingleUserFromDB,
  findAllUserFromDB,
};
