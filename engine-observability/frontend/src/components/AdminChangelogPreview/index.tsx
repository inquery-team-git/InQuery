/* eslint-disable no-underscore-dangle */
import classNames from 'classnames';
import { find, kebabCase } from 'lodash';
import moment from 'moment';
import Link from 'next/link';

import MarkdownPreview from '@/components/MarkDown/Preview';
import type { ChangelogPost, ChangelogPostEdit, FormItem } from '@/types';

interface ChangeLogPreviewProps {
  data: ChangelogPost | ChangelogPostEdit | any;
  allLabels: FormItem[];
  enabledOptions?: string[];
  details?: string;
  fullHeight?: boolean;
  isDraft?: boolean;
}

function AdminChangelogPreview(props: ChangeLogPreviewProps) {
  const {
    data,
    allLabels,
    details,
    enabledOptions = [],
    fullHeight,
    isDraft,
  } = props;
  const markdown = details || data.details;
  return (
    <div
      className={classNames('changelogItem', {
        disableDivider: fullHeight,
      })}
    >
      <div className="titleContainer">
        <div className="left">
          <div className="title">{data.title}</div>
          {isDraft && <div className="draft-title">{'(Draft)'}</div>}
        </div>
        <div className="right">
          {enabledOptions.includes('view') && (
            <Link
              href={`/changelog/${kebabCase(data.urlName)}`}
              style={{ cursor: 'pointer' }}
              className="p-0"
            >
              <div className="timestamp">
                {moment(data.createdAt).format('MMM DD, YYYY')}
              </div>
            </Link>
          )}
          {enabledOptions.includes('edit') && (
            <>
              <div className="middot">·</div>
              <Link
                href={`/admin/changelog/edit/${data._id}`}
                style={{ cursor: 'pointer' }}
                className="editLink p-0"
              >
                Edit
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="category">
        <div className={`type ${data.types}`}>{data.types}</div>
      </div>
      <div className="markdown">
        <MarkdownPreview value={markdown} />
      </div>
      <div className="labels">
        {allLabels &&
          allLabels.length > 0 &&
          data.labels &&
          data.labels.map((label: string, index: number) => {
            const labelData = find(allLabels, { value: label });
            if (!labelData) return null;
            return (
              <div key={index} className={`type ${label.toLowerCase()}`}>
                {labelData?.text}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default AdminChangelogPreview;
