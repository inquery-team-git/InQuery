import type { Reaction } from '@/types';

import PostReactions from '../PostReactions';
import SocialShareButtons from '../SocialShare';

interface PublicFooterProps {
  reactions: Reaction[];
  myReaction: string;
  addReaction: (
    callback: (reactions: Reaction[], myNewReaction: string) => void,
    reactions: Reaction[],
    myNewReaction: string
  ) => void;
  removeReaction: (
    callback: (reactions: Reaction[], myNewReaction: string) => void,
    reactions: Reaction[],
    myNewReaction: string
  ) => void;
}

const PublicChangelogFooter = (props: PublicFooterProps) => {
  return (
    <div className="pchangelog-post-footer">
      <div className="left">
        <PostReactions {...props} />
      </div>
      <div className="right">
        <SocialShareButtons
          contentLink={
            'https://changelog.getlog.co/a8677606-5ada-11ed-b41c-0200555c4945'
          }
        />
      </div>
    </div>
  );
};

export default PublicChangelogFooter;
