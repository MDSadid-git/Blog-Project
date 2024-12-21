import { Schema } from 'mongoose';

export interface TBlog {
  title: string;
  content: string;
  author: Schema.Types.ObjectId;
  ispublished: boolean;
}

export interface BlogQueryParams {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filter?: string;
}
