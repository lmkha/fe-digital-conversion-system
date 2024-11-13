import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

interface ImportStatusDialogProps {
  open: boolean;
  onClose: () => void;
  isSuccess: boolean | null;
  countSuccess: number;
  countError: number;
  errorMessage: string;
  onDownloadErrorFile?: () => void;
}

const ImportStatusDialog: React.FC<ImportStatusDialogProps> = ({
  open,
  onClose,
  isSuccess,
  countSuccess,
  countError,
  errorMessage,
  onDownloadErrorFile,
}) => {
  if (isSuccess === null) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      {/* Header Section */}
      <DialogTitle
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          textAlign: "center",
          color: "#333",
        }}
      >
        Trạng thái nhập người dùng
      </DialogTitle>

      <DialogContent>
        {isSuccess ? (
          countError === 0 ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              p={2}
            >
              <CheckCircleIcon sx={{ fontSize: 60, color: "#4caf50" }} />
              <Typography
                variant="h6"
                sx={{ color: "#4caf50", fontWeight: "medium", mt: 1 }}
              >
                Tất cả người dùng đã được thêm thành công!
              </Typography>
            </Box>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              p={2}
            >
              <Stack spacing={1.5} sx={{ width: "100%", px: 2 }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    bgcolor: "#e0f2f1",
                    padding: "8px 12px",
                    borderRadius: "6px",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <PersonAddIcon sx={{ color: "#4caf50" }} />
                    <Typography variant="body2" color="#4caf50">
                      Thành công
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="#4caf50">
                    {countSuccess}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    bgcolor: "#ffebee",
                    padding: "8px 12px",
                    borderRadius: "6px",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <PersonOffIcon sx={{ color: "#f44336" }} />
                    <Typography variant="body2" color="#f44336">
                      Thất bại
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="#f44336">
                    {countError}
                  </Typography>
                </Stack>
              </Stack>

              {countError > 0 && (
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    mt: 3,
                    textTransform: "none",
                    borderRadius: "8px",
                    padding: "6px 16px",
                  }}
                  startIcon={<CloudDownloadIcon />}
                  onClick={onDownloadErrorFile}
                >
                  Tải file các người dùng bị lỗi
                </Button>
              )}
            </Box>
          )
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            p={2}
          >
            <ErrorIcon sx={{ fontSize: 60, color: "#f44336" }} />
            <Typography
              variant="h6"
              sx={{ color: "#f44336", mt: 1, fontWeight: "medium" }}
            >
              Đã xảy ra lỗi!
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ mt: 1, px: 2 }}
            >
              {errorMessage}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "8px",
            px: 3,
          }}
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImportStatusDialog;
