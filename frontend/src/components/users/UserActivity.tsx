//frontend\src\components\users\UserActivity.tsx
import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { Typography } from "@mui/material";

interface UserActivityProps {
  id: string;
}

const UserActivity: React.FC<UserActivityProps> = ({ id }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Aktivite Geçmişi
      </Typography>
      <Timeline>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="subtitle2">Kargo Teslim Edildi</Typography>
            <Typography variant="body2" color="text.secondary">
              12.03.2024 14:30 - TR123456789
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="subtitle2">Kargo Teslim Alındı</Typography>
            <Typography variant="body2" color="text.secondary">
              12.03.2024 09:15 - TR987654321
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="subtitle2">Mesai Başlangıcı</Typography>
            <Typography variant="body2" color="text.secondary">
              12.03.2024 08:00
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </>
  );
};

export default UserActivity;
