import CheckIcon from '@mui/icons-material/CheckCircle';
import FacebookIcon from '@mui/icons-material/FacebookRounded';
import LinkIcon from '@mui/icons-material/LinkRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import classNames from 'classnames';
import { useState } from 'react';

interface SocialShareButtonsProps {
  contentText?: string;
  contentLink: string;
}

function SocialShareButtons(props: SocialShareButtonsProps) {
  const { contentLink } = props;
  const [copied, setCopied] = useState<boolean>(false);
  const onCopy = () => {
    navigator.clipboard.writeText(contentLink);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="share-icons-wrapper">
      <div className="share-icons">
        <p className="share-text">Share</p>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${contentLink}`}
          target="_blank"
          className="socialIcon-container"
          title="Share on Facebook"
          rel="noreferrer"
        >
          <FacebookIcon className="socialIcon" />
        </a>

        <a
          href={`https://twitter.com/intent/tweet?text=ddd%20by%20shubhpan2&url=${contentLink}&via=cannyHQ`}
          target="_blank"
          className="socialIcon-container"
          title="Share on Twitter"
          rel="noreferrer"
        >
          <TwitterIcon className="socialIcon" />
        </a>

        <a
          href="#"
          className="socialIcon-container"
          title="Copy Link"
          rel="noreferrer"
          onClick={onCopy}
        >
          <LinkIcon className="socialIcon" />
        </a>
      </div>
      <div
        className={classNames('clipboard-copy-success')}
        style={{ display: copied ? 'block' : 'none' }}
      >
        <div className="socialIcon-container">
          <CheckIcon className="socialIcon" />
        </div>
        <p className="share-text">Link copied</p>
      </div>
    </div>
  );
}

export default SocialShareButtons;
