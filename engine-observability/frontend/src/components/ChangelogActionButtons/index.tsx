/* eslint-disable @typescript-eslint/no-unused-expressions */
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import dayjs from 'dayjs';
import moment from 'moment';
import React, { Fragment, useState } from 'react';

import { ChangelogPostStatus } from '@/types';

interface ChangelogActionButtonsProps {
  draftStatus: 'empty' | 'saving' | 'saved' | 'failed';
  status: ChangelogPostStatus;
  loading: boolean;
  publishedAt?: string;
  scheduledAt?: string;
  onSchedule?: (scheduleTimeStamp: any, callback?: any) => void;
  onPublish?: (callback?: any) => void;
  onUnschedule?: (callback?: any) => void;
  onUnpublish?: (callback?: any) => void;
  className?: string;
  disable?: boolean;
}

function ChangelogActionButtons(props: ChangelogActionButtonsProps) {
  const [publishLoading, setPublishLoading] = useState(false);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedDate, handleDateChange] = useState<any>(dayjs());

  const togglePublishLoading = () => {
    setPublishLoading((preValue) => !preValue);
  };
  const toggleScheduleLoading = () => {
    setScheduleLoading((preValue) => !preValue);
  };
  const toggleDatetimePicker = () => {
    setOpen((preValue) => !preValue);
  };

  const onSchedule = (dateTime: any) => {
    handleDateChange(dateTime.$d);
    toggleScheduleLoading();
    if (props.onSchedule) {
      props.onSchedule(moment(dateTime).toDate(), toggleScheduleLoading);
    }
  };
  const onPublish = () => {
    togglePublishLoading();
    if (props.onPublish) {
      props.onPublish(togglePublishLoading);
    }
  };
  const onUnschedule = () => {
    props.onUnschedule && props.onUnschedule();
  };
  const onUnpublish = () => {
    props.onUnpublish && props.onUnpublish();
  };

  return (
    <Fragment>
      <div className={props.className}>
        <div className={`draftStatus ${props.draftStatus}`}>
          {props.draftStatus === 'saved' && 'Saved just now'}
          {props.draftStatus === 'failed' && 'Failed'}
          {props.draftStatus === 'saving' && 'Saving draft...'}
        </div>
        <div className="composerButtons">
          {/* Publish Now and Schedule Button */}
          {props.status === ChangelogPostStatus.DRAFT && (
            <Fragment>
              <Button
                variant="contained"
                color="primary"
                className="publishButton"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.1s ease-in-out',
                  minWidth: '150px',
                  minHeight: '48px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '16.5px',
                  lineHeight: '20px',
                  textTransform: 'none',
                }}
                disabled={props.disable || props.loading}
                onClick={onPublish}
                endIcon={
                  props.loading &&
                  publishLoading && (
                    <CircularProgress thickness={4} color="inherit" size={24} />
                  )
                }
              >
                Publish Now
              </Button>
              <Tooltip title="Schedule">
                <Button
                  variant="contained"
                  color="primary"
                  className="scheduleButton"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.1s ease-in-out',
                    minHeight: '48px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '16.5px',
                    lineHeight: '20px',
                    textTransform: 'none',
                  }}
                  disabled={props.disable || props.loading}
                  onClick={toggleDatetimePicker}
                >
                  {props.loading && scheduleLoading ? (
                    <CircularProgress thickness={4} color="inherit" size={24} />
                  ) : (
                    <ScheduleIcon className="scheduleIcon" />
                  )}
                </Button>
              </Tooltip>
            </Fragment>
          )}

          {/* Scheduled and Cancel */}
          {props.status === ChangelogPostStatus.SCHEDULED && (
            <Fragment>
              <div className="scheduledFor">
                {`Scheduled: ${moment(props.scheduledAt).format(
                  'hh:mm a'
                )} on ${moment(props.scheduledAt).format('MMM DD, YYYY')}`}
              </div>
              {props.loading ? (
                <CircularProgress thickness={4} color="inherit" size={24} />
              ) : (
                <div className="unschedule" onClick={onUnschedule}>
                  Cancel
                </div>
              )}
            </Fragment>
          )}

          {/* Published and Revert to draft */}
          {props.status === ChangelogPostStatus.PUBLISHED && (
            <Fragment>
              <div className="publishedAt">{`Published: ${moment(
                props.publishedAt
              ).format('hh:mm a')} on ${moment(props.publishedAt).format(
                'MMM DD, YYYY'
              )}`}</div>
              {props.loading ? (
                <CircularProgress thickness={4} color="inherit" size={24} />
              ) : (
                <div className="unpublish" onClick={onUnpublish}>
                  Revert to draft
                </div>
              )}
            </Fragment>
          )}
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDateTimePicker
            open={open}
            defaultValue={dayjs()}
            value={selectedDate}
            onClose={toggleDatetimePicker}
            onAccept={onSchedule}
            disablePast
          />
        </LocalizationProvider>
      </div>
    </Fragment>
  );
}

export default ChangelogActionButtons;
