import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ForwardIcon from '@mui/icons-material/Forward';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import cn from 'classnames';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

interface RecommendationWrapperProps {
  open: boolean;
  onClose: () => void;
  recommendations: {
    flag: string;
    recommendation: string;
  }[];
  query: string;
}

const RecommendationWrapper = (props: RecommendationWrapperProps) => {
  const { recommendations } = props;
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      classes={{
        paper: cn('dialog-paper'),
      }}
      className="material-dialog"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '20px 20px 0px',
        }}
      >
        <h2>{'Query Recommendations'}</h2>
        <IconButton onClick={props.onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </div>
      <DialogContent style={{ padding: '0px' }}>
        <SyntaxHighlighter
          language="sql"
          wrapLines
          wrapLongLines
          customStyle={{
            minHeight: 300,
            maxHeight: 400,
            overflow: 'scroll',
          }}
        >
          {props.query}
        </SyntaxHighlighter>
        <div style={{ display: 'flex', alignItems: 'center', padding: '15px' }}>
          <ForwardIcon /> Recommendations
        </div>
        <div
          style={{
            padding: '0 0 50px',
            maxHeight: '450px',
            overflow: 'scroll',
          }}
        >
          {recommendations?.map((rmd, idx) => {
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: idx % 2 === 0 ? '#FFB2B2' : '#E8E8E8',
                  padding: '10px 15px',
                }}
              >
                <span style={{ fontWeight: 'bold' }}>{`Recommendation ${
                  idx + 1
                }:`}</span>
                <span style={{ marginLeft: '5px' }}>{rmd.recommendation}</span>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecommendationWrapper;
