import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import classNames from 'classnames';
import { find, kebabCase } from 'lodash';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import MarkdownPreview from '@/components/MarkDown/Preview';
import {
  addReactionToChangelogPost,
  removeReactionFromChangelogPost,
} from '@/data/public/reaction.data';
import type {
  ChangelogPost,
  EnumPostReactions,
  FormItem,
  Reaction,
} from '@/types';

import PublicChangelogFooter from '../Footers/PublicChangelog';

const MAX_HEIGHT = 300;
interface PublicChangelogPreviewProps {
  data: ChangelogPost;
  allLabels: FormItem[];
  enabledOptions?: string[];
  details?: string;
  fullHeight?: boolean;
  isDraft?: boolean;
  showMore?: boolean;
}

function PublicChangelogPreview(props: PublicChangelogPreviewProps) {
  const {
    data,
    details,
    allLabels,
    enabledOptions = [],
    fullHeight,
    isDraft,
    showMore = false,
  } = props;

  const [detailSectionHeight, setDetailSectionHeight] = useState(0);
  const [readMore, setReadMore] = useState(showMore);

  const markdown = details || data.details;
  const duration = moment.duration(moment().diff(moment(data.createdAt)));
  const minutes = parseInt(duration.asMinutes().toFixed(0), 10);
  const hours = parseInt(duration.asHours().toFixed(0), 10);
  let timeStampText = moment(data.createdAt).format('MMM DD, YYYY');
  if (minutes < 1) {
    timeStampText = `Just Now`;
  }
  if (minutes < 60 && minutes > 1) {
    timeStampText = `${minutes} minutes ago`;
  }
  if (minutes > 60 && minutes < 24 * 60) {
    timeStampText = `${hours} hours ago`;
  }

  const getDetailsSectionHeight = () => {
    const ele = document.getElementById('changelog-details-container');
    if (ele) {
      return ele.clientHeight;
    }
    return 0;
  };

  const togglereadMore = () => {
    setReadMore(false);
  };

  useEffect(() => {
    const height = getDetailsSectionHeight();
    setDetailSectionHeight(height);
  }, []);

  const addReaction = (
    callback: (reactions: Reaction[], myNewReaction: string) => void,
    reactions: Reaction[],
    myNewReaction: string
  ) => {
    // eslint-disable-next-line no-promise-executor-return
    return addReactionToChangelogPost({
      // eslint-disable-next-line no-underscore-dangle
      entityId: data._id,
      reaction: myNewReaction as EnumPostReactions,
    }).then(() => {
      callback(reactions, myNewReaction);
    });
  };

  const removeReaction = (
    callback: (reactions: Reaction[], myNewReaction: string) => void,
    reactions: Reaction[],
    myNewReaction: string
  ) => {
    return removeReactionFromChangelogPost({
      // eslint-disable-next-line no-underscore-dangle
      entityId: data._id,
      reaction: myNewReaction as EnumPostReactions,
    }).then(() => {
      callback(reactions, '');
    });
  };

  let myReaction;
  if (data.reactions) {
    myReaction = find(data.reactions as unknown as Reaction[], {
      myReaction: true,
    });
  }
  return (
    <div
      className={classNames('changelogItem', 'pchangelogItem', {
        disableDivider: fullHeight,
      })}
    >
      <div className="titleContainer">
        <div className="left">
          {enabledOptions.includes('view') && (
            <Link href={`/changelog/${kebabCase(data.title)}`}>
              <div
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
                className="p-0"
              >
                <div className="title">{data.title}</div>
                {isDraft && <div className="draft-title">{'(Draft)'}</div>}
              </div>
            </Link>
          )}
        </div>
        <div className="right">
          {enabledOptions.includes('view') && (
            <Link href={`/changelog/${kebabCase(data.title)}`} className="p-0">
              <div style={{ cursor: 'pointer' }} className="timestamp">
                {timeStampText}
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className="category">
        <div className={`type ${data.types}`}>{data.types}</div>
      </div>
      <div
        className={classNames('markdown', {
          truncated: readMore && detailSectionHeight > MAX_HEIGHT,
        })}
        id="changelog-details-container"
      >
        <MarkdownPreview value={markdown} />
      </div>
      {readMore && detailSectionHeight > MAX_HEIGHT && (
        <div className="showMore-section">
          <div className="showMore-link" onClick={togglereadMore}>
            Read More
            <ArrowDownIcon className="showMore-icon" />
          </div>
        </div>
      )}
      <div className="labels">
        {allLabels &&
          allLabels.length > 0 &&
          data.labels &&
          data.labels.map((label, index) => {
            const labelData = find(allLabels, { value: label });
            if (!labelData) return null;
            return (
              <div key={index} className={`type ${label.toLowerCase()}`}>
                {labelData?.text}
              </div>
            );
          })}
      </div>
      <PublicChangelogFooter
        reactions={data.reactions as unknown as Reaction[]}
        myReaction={myReaction ? myReaction.reaction : ''}
        removeReaction={removeReaction}
        addReaction={addReaction}
      />
    </div>
  );
}

export default PublicChangelogPreview;
