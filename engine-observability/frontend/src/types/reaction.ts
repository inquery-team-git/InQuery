export interface Reaction {
  reaction: string;
  count: number;
  myReaction: boolean;
}

export interface UpdateReaction {
  entityId: string;
  entityType: string;
  reaction: string;
}
