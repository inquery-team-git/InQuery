export enum ChangelogPostStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  PUBLISHED = 'published',
  DELETED = 'deleted',
}

export enum ChangelogPostCategory {
  ALL = 'all',
  FEATURE = 'feature',
  IMPORVED = 'improved',
  FIXED = 'fixed',
  INTEGRATION = 'integration',
}

export enum EnumPostReactions {
  SMILEY = 'smiley',
  LOVE = 'love',
  THUMBSUP = 'thumbsup',
  THUMBSDOWN = 'thumbsdown',
  CELEBRATION = 'celebration',
}

export enum TimestampFilter {
  last_24_hours = 'last_24_hours',
  last_6_hours = 'last_6_hours',
  last_hour = 'last_hour',
  last_30_minutes = 'last_30_minutes',
  last_15_minutes = 'last_15_minutes',
  last_5_minutes = 'last_5_minutes',
  last_minute = 'last_minute',
}
