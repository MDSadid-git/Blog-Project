import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const registerUser = catchAsync(async (req, res) => {
  const user = await AuthServices.registerUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.CREATED,
    data: user,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const user = await AuthServices.loginUser(req.body);
  sendResponse(res, {
    success: true,
    message: 'User logged in successfully',
    statusCode: httpStatus.OK,
    data: user,
  });
});

export const AuthController = {
  registerUser,
  loginUser,
};
