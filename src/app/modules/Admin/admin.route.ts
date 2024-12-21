import express from 'express';
import { AdminController } from './admin.controller';
import { auth } from '../../middlewares/auth';

const router = express.Router();

// ------ START blockUser ------
router.patch('/user/:userId', auth('admin'), AdminController.blockUser);
// ------ END blockUser ------

// ------ START delete ------
router.delete('/blogs/:id', auth('admin'), AdminController.deleteBlog);
// ------ END delete ------

export const AdminRoutes = router;
