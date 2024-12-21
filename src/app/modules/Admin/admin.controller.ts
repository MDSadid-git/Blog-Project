import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

// ------ START blockUser ------
const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  if (req.user?.role !== 'admin') {
    throw new AppError(httpStatus.FORBIDDEN, 'Only Admin can block user');
  }

  const result = await AdminServices.blockUserFromDB(userId);

  sendResponse(res, {
    success: true,
    message: 'This User blocked successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});
// ------ END blockUser ------

// ------ START deleteBlog ------
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  if (req.user?.role !== 'admin') {
    throw new AppError(httpStatus.FORBIDDEN, 'Only Admin can deleted blog!');
  }

  const result = await AdminServices.deleteBlogFromDB(id);

  sendResponse(res, {
    success: true,
    message: 'Blog delete successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});
// ------ END deleteBlog ------

export const AdminController = {
  blockUser,
  deleteBlog,
};
