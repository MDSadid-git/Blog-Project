import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { Blog } from '../blog/blog.model';

// ------ START blockUserFromDB ------
const blockUserFromDB = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user && user.role === 'admin') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Admin Do not Blocking admin!');
  }

  if (user.isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already blocked');
  }

  user.isBlocked = true;
  await user.save();

  return user;
};
// ------ END blockUserFromDB ------

// ------ START deleteBlogFromDB ------
const deleteBlogFromDB = async (id: string) => {
  const blog = await Blog.findByIdAndDelete(id);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found to delete it!');
  }

  return blog;
};
// ------ END deleteBlogFromDB ------

export const AdminServices = {
  blockUserFromDB,
  deleteBlogFromDB,
};
