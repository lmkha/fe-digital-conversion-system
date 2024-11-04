import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

interface FullScreenLoadingProps {
  open: boolean;
}

const FullScreenLoading: React.FC<FullScreenLoadingProps> = ({ open }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999, // Đặt z-index cao để luôn ở trước
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default FullScreenLoading;
