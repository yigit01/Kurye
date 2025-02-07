import React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "react-transition-group/Transition";

const TransitionLeft = React.forwardRef<HTMLDivElement, TransitionProps & { children: React.ReactElement }>(
  function TransitionLeft({ children, ...props }, ref) {
    return (
      <Slide direction="left" ref={ref} {...props} timeout={{ enter: 1000, exit: 1000 }}>
        {children}
      </Slide>
    );
  }
);

export default TransitionLeft;
