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

interface ShipmentHistoryProps {
  id: string;
}

const ShipmentHistory: React.FC<ShipmentHistoryProps> = ({ id }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Kargo Takip Geçmişi
      </Typography>
      <Timeline>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="subtitle2">Teslim Edildi</Typography>
            <Typography variant="body2" color="text.secondary">
              12.03.2024 14:30
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="subtitle2">Dağıtıma Çıktı</Typography>
            <Typography variant="body2" color="text.secondary">
              12.03.2024 09:15
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="subtitle2">Şubeye Ulaştı</Typography>
            <Typography variant="body2" color="text.secondary">
              11.03.2024 18:45
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </>
  );
};

export default ShipmentHistory;
