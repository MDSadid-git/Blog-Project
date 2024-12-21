import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';
import { Blog } from './blog.model';
import { TBlog } from './blog.interface';

// ------ START createBlog ------
const createBlog = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const result = await BlogServices.createBlogIntoDB(req.body, token as string);

  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});
// ------ END createBlog ------

// ------ START updateSingleBlog ------
const updateBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.updateBlogFromDB(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});
// ------ END updateSingleBlog ------

// ------ START deleteBlog ------
const deleteBlog = catchAsync(async (req, res) => {
  await BlogServices.deleteBlogFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
    data: null,
  });
});
// ------ END deleteBlog ------

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB(
    req.query as Record<string, unknown>,
  );

  sendResponse(res, {
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const BlogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
