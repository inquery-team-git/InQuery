import type { FilterType, LinkType } from '@/types';

export interface IPublicChangelogSidebar {
  backEnabled: boolean;
  filters?: FilterType[];
  links?: LinkType[];
  onClickFilter?: (type: string) => void;
}
