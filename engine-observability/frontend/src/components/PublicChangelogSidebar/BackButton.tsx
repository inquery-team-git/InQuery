import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

interface BackButtonProps {
  backEnabled: boolean;
  buttonText: string;
}

const BackButton = (props: BackButtonProps) => {
  const { backEnabled = true, buttonText = 'Back to changelog' } = props;

  if (!backEnabled) return null;

  return (
    <Link href={'/changelog'}>
      <div
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        }}
        className="backLink"
      >
        <ArrowBackIcon className="backLink-icon" />
        {buttonText}
      </div>
    </Link>
  );
};

export default BackButton;
