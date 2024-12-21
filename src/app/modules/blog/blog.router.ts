import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogController } from './blog.controller';
import { BlogValidations } from './blog.validation';
import { auth } from '../../middlewares/auth';
const router = express.Router();

// ------ START createBlog ------
router.post(
  '/create-blog',
  validateRequest(BlogValidations.blogValidationSchema),
  BlogController.createBlog,
);
// ------ END createBlog ------

// ------ START updateSingleBlog ------
router.patch(
  '/:id',
  auth('user'),
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogController.updateBlog,
);
// ------ END updateSingleBlog ------

// ------ START deleteBlog ------
router.delete('/:id', auth('user', 'admin'), BlogController.deleteBlog);
// ------ END deleteBlog ------

// ------ START getAllBlogs ------
router.get('/', BlogController.getAllBlogs);
// ------ END getAllBlogs ------

export const BlogRoutes = router;
