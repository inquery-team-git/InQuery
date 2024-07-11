/* eslint-disable no-param-reassign */
import AddIcon from '@mui/icons-material/Add';
import classNames from 'classnames';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import { useState } from 'react';

import celebrationSvg from '@/assets/images/reactions/reaction-celebration.svg';
import loveSvg from '@/assets/images/reactions/reaction-love.svg';
import smileySvg from '@/assets/images/reactions/reaction-smiley.svg';
import thumbsdownSvg from '@/assets/images/reactions/reaction-thumbsdown.svg';
import thumbsupSvg from '@/assets/images/reactions/reaction-thumbsup.svg';
import type { Reaction } from '@/types';
import { EnumPostReactions } from '@/types';

const avilableReactions = Object.values(EnumPostReactions);

interface PublicReactionsProps {
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

const PostReactions = (props: PublicReactionsProps) => {
  const [openReactionList, setOpenReactionList] = useState<boolean>(false);
  const [myReaction, setMyReaction] = useState<string>(props.myReaction);
  const [postReactions, setPostReactions] = useState<Reaction[]>(
    props.reactions
  );

  const toggleReactionList = () => {
    setOpenReactionList(!openReactionList);
  };

  const updateReactions = (reactions: Reaction[], myNewReaction: string) => {
    setPostReactions(reactions);
    setMyReaction(myNewReaction);
  };

  const handleReactions = (newReaction: string) => {
    let newPostReactions = [];
    if (myReaction === newReaction) {
      newPostReactions = postReactions.map((rct: Reaction) => {
        const rctData = { ...rct };
        if (rctData.reaction === newReaction) {
          rctData.count = rctData.count > 0 ? rctData.count - 1 : 0;
          rctData.myReaction = false;
        }
        return rctData;
      });
      props.removeReaction(updateReactions, newPostReactions, newReaction);
    } else {
      newPostReactions = postReactions.map((rct: Reaction) => {
        const rctData = { ...rct };
        if (rctData.reaction === newReaction) {
          rctData.count += 1;
          rctData.myReaction = true;
        }
        if (rctData.reaction === myReaction) {
          rctData.count = rctData.count > 0 ? rctData.count - 1 : 0;
          rctData.myReaction = false;
        }
        return rctData;
      });
      props.addReaction(updateReactions, newPostReactions, newReaction);
    }
    return setOpenReactionList(false);
  };

  const reactiomImages: Record<string, StaticImageData> = {
    smiley: smileySvg,
    love: loveSvg,
    thumbsup: thumbsupSvg,
    thumbsdown: thumbsdownSvg,
    celebration: celebrationSvg,
  };

  return (
    <div className="reactions-wrapper">
      <div className="reactions-list">
        {postReactions.length &&
          postReactions.map((rct) => (
            <a
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => handleReactions(rct.reaction)}
              className={classNames({
                active: myReaction === rct.reaction,
              })}
              key={rct.reaction}
            >
              <Image
                src={reactiomImages[rct.reaction] as StaticImageData}
                alt={rct.reaction}
              />
              <p className="number">{rct.count}</p>
            </a>
          ))}
      </div>
      <div className="reactions-menu-wrapper">
        <a
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          className={classNames('reaction-menu-trigger', {
            active: openReactionList,
          })}
          onClick={toggleReactionList}
        >
          <Image src={smileySvg} alt="Smiley" />
          <AddIcon className="add" />
        </a>
        <div
          style={{ display: openReactionList ? 'block' : 'none' }}
          className={classNames('reactions-menu')}
        >
          {avilableReactions.map((rct) => (
            <a
              key={rct}
              onClick={() => handleReactions(rct)}
              className={classNames({
                active: myReaction === rct,
              })}
            >
              <Image src={reactiomImages[rct] as StaticImageData} alt={rct} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostReactions;
