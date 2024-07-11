import type { ChangelogPostCategory, ChangelogPostStatus } from './enum';

export type ChangelogPostReactions = {
  smiley: string;
  love: string;
  thumbsup: string;
  thumbsdown: string;
  celebration: string;
};

export type ChangelogPost = {
  _id: string;
  createdBy: string;
  editedBy: string;
  lastSaved: string;
  title: string;
  details: string;
  types: ChangelogPostCategory | ChangelogPostCategory[];
  status: ChangelogPostStatus;
  labels: string[];
  urlName: string;
  reactions: ChangelogPostReactions;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  scheduledAt?: string;
};

export type ChangelogPostEdit = {
  _id: string;
  createdBy: string;
  editedBy: string;
  lastSaved: string;
  title: string;
  details: string;
  types: ChangelogPostCategory | ChangelogPostCategory[];
  status: ChangelogPostStatus;
  labels: string[];
  urlName: string;
  reactions: ChangelogPostReactions;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  scheduledAt?: string;
};

export type ChangelogPostStatusUpdate = {
  publishedAt?: string;
  scheduledAt?: string;
  status: ChangelogPostStatus;
};

export type ChangelogPostCreate = {
  title: string;
  types: ChangelogPostCategory | ChangelogPostCategory[];
  details: string;
  labels: string[];
  status: ChangelogPostStatus;
};
