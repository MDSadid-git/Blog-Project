import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import AppError from '../../errors/AppError';

// ------ START REGISTER ------
const registerUser = catchAsync(async (req, res) => {
  const user = await AuthServices.registerUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.CREATED,
    data: user,
  });
});
// ------ END REGISTER ------

// ------ START Login ------
const loginUser = catchAsync(async (req, res) => {
  const user = await AuthServices.loginUser(req.body);
  sendResponse(res, {
    success: true,
    message: 'User logged in successfully',
    statusCode: httpStatus.OK,
    data: user,
  });
});
// ------ END Login ------

// ------ START findSingleUser ------
const findSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AuthServices.findSingleUserFromDB(id);

  sendResponse(res, {
    success: true,
    message: 'User found successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});
// ------ END findSingleUser ------

// ------ START findAllUser ------
const findAllUser = catchAsync(async (req, res) => {
  if (req.user?.role !== 'admin') {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not fetching all users');
  }

  const result = await AuthServices.findAllUserFromDB();

  sendResponse(res, {
    success: true,
    message: 'All User found successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});
// ------ END findAllUser ------

export const AuthController = {
  registerUser,
  loginUser,
  findSingleUser,
  findAllUser,
};
