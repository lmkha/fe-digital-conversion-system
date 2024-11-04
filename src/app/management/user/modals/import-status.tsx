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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Trạng thái nhập người dùng</DialogTitle>
      <DialogContent>
        {isSuccess ? (
          countError === 0 ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              p={4}
              border="1px solid #4caf50"
              borderRadius="8px"
              bgcolor="#e8f5e9"
            >
              <CheckCircleIcon sx={{ fontSize: 48, color: "#4caf50" }} />
              <Typography variant="h6" sx={{ color: "#4caf50", mt: 2 }}>
                Thành công!
              </Typography>
              <Typography variant="body2" color="textSecondary">
                File của bạn đã được nhập thành công.
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Kiểm tra danh sách người dùng để đảm bảo dữ liệu đã nhập chính
                xác.
              </Typography>
            </Box>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              sx={{ borderRadius: 4 }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "medium", color: "black", mb: 2 }}
              >
                Kết quả thêm người dùng
              </Typography>
              <Stack sx={{ width: "70%", mb: 2 }}>
                <Stack
                  direction={"row"}
                  sx={{ width: "100%", justifyContent: "space-between" }}
                >
                  <Typography variant="body2" color="green">
                    Số lượng người dùng được thêm thành công:
                  </Typography>
                  <Typography variant="body2" color="green">
                    {countSuccess}
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  sx={{ width: "100%", justifyContent: "space-between" }}
                >
                  <Typography variant="body2" color="red">
                    Số lượng người dùng không được thêm:
                  </Typography>
                  <Typography variant="body2" color="red">
                    {countError}
                  </Typography>
                </Stack>
              </Stack>
              <Button
                size="medium"
                variant="outlined"
                sx={{ textTransform: "none" }}
                onClick={onDownloadErrorFile}
              >
                Tải file các người dùng bị lỗi
              </Button>
            </Box>
          )
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            p={4}
            border="1px solid #f44336"
            borderRadius="8px"
            bgcolor="#ffebee"
          >
            <ErrorIcon sx={{ fontSize: 48, color: "#f44336" }} />
            <Typography variant="h6" sx={{ color: "#f44336", mt: 1 }}>
              Thất bại!
            </Typography>
            <Typography variant="body2" color="black">
              {errorMessage}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImportStatusDialog;
