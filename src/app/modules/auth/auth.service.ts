import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import bcrypt from 'bcrypt';
import { TLoginUser, TRegisterUser } from './auth.interface';

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

  return user;
};
// ------ END Login ------

const findSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

export const AuthServices = {
  registerUserIntoDB,
  loginUser,
};
