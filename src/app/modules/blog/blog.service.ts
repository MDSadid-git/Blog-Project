import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { BlogQueryParams, TBlog } from './blog.interface';
import { Blog } from './blog.model';
import mongoose from 'mongoose';
import { BlogSearchableFields } from './blog.constant';

// ------ START createBlogIntoDB ------
const createBlogIntoDB = async (payload: TBlog, accessToken: string) => {
  if (!accessToken || !payload.author) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }

  // Create blog
  const result = await (
    await Blog.create(payload)
  ).populate<{ author: { _id: string; name: string; email: string } }>(
    'author',
  );

  const userBolgdata = {
    title: result.title,
    content: result.content,
    author: {
      id: result.author?._id,
      name: result.author.name,
      email: result.author.email,
    },
    _id: result._id,
  };

  return userBolgdata;
};
// ------ END createBlogIntoDB ------

// ------ START findSingleBlog ------
const updateBlogFromDB = async (id: string, payload: Partial<TBlog>) => {
  const updateBlog = await Blog.findByIdAndUpdate(
    id,
    {
      $set: payload,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (updateBlog) {
    const result = await updateBlog.populate<{
      author: { _id: string; name: string; email: string };
    }>('author');

    const userBolgdata = {
      title: result?.title,
      content: result?.content,
      author: {
        id: result?.author?._id,
        name: result?.author?.name,
        email: result?.author?.email,
      },
      _id: result._id,
    };

    return userBolgdata;
  }
  return null;
};
// ------ END findSingleBlog ------

// ------ START deleteBlog ------
const deleteBlogFromDB = async (id: string) => {
  await Blog.findByIdAndDelete(id);
};
// ------ END deleteBlog ------

// ------ START getAllBlogsFromDB ------
const getAllBlogsFromDB = async (query: BlogQueryParams) => {
  const { search, sortBy = 'createdAt', sortOrder = 'desc', filter } = query;

  const searchCriteria: any = search
    ? {
        $or: BlogSearchableFields.map((field) => ({
          [field]: { $regex: search, $options: 'i' },
        })),
      }
    : {};

  const filterCriteria: any = filter
    ? { author: new mongoose.Types.ObjectId(filter) }
    : {};

  const sortCriteria: any = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  const blogsQuery = await Blog.find({
    ...searchCriteria,
    ...filterCriteria,
  })
    .sort(sortCriteria)
    .populate('author');

  return blogsQuery;
};
// ------ END getAllBlogsFromDB ------

export const BlogServices = {
  createBlogIntoDB,
  updateBlogFromDB,
  deleteBlogFromDB,
  getAllBlogsFromDB,
};
