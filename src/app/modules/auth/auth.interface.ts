import { Model } from 'mongoose';
import { USER_ROLE } from './auth.constant';
import { TUser } from '../user/user.interface';

export interface TRegisterUser {
  email: string;
  password: string;
  name: string;
}

export interface TLoginUser {
  email: string;
  password: string;
}

export type TRole = 'admin' | 'user';

export type TUserRole = keyof typeof USER_ROLE;

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomEmail(email: string): Promise<TUser>;
  isUserPasswordMatch(plainTextPass: string, hasPass: string): Promise<boolean>;
}
