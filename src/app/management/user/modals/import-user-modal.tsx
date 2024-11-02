import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    IconButton,
    Stack,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useAppContext } from "@/contexts/app-context";
import { downloadUserTemplate, importUsers } from "@/services/user";
import ErrorUser from "@/services/models/error-user";
import { useManagementUser } from "@/contexts/management-user-context";

interface ImportUsersPopupProps {
    open: boolean;
    deptId: string;
    onClose: () => void;
}

const ImportUsersPopup: React.FC<ImportUsersPopupProps> = ({
    open,
    deptId,
    onClose,
}) => {
    const { setPreviewUserList } = useManagementUser();
    const { setToastInfo } = useAppContext();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null); // null = chưa tải lên, true = thành công, false = thất bại
    const [countError, setCountError] = useState<number>();
    const [countSuccess, setCountSuccess] = useState<number>();
    const [errorUsers, setErrorUsers] = useState<ErrorUser[]>();

    // Hàm kiểm tra định dạng và kích thước của file
    const validateFile = (file: File): boolean => {
        const validExtensions = [".csv", ".xls", ".xlsx"];
        const fileExtension = file.name
            .slice(file.name.lastIndexOf("."))
            .toLowerCase();

        if (!validExtensions.includes(fileExtension)) {
            setErrorMessage(
                "Định dạng file không hợp lệ. Vui lòng chọn file CSV hoặc Excel."
            );
            setSelectedFile(null);
            return false;
        } else if (file.size > 5 * 1024 * 1024) {
            setErrorMessage(
                "File quá lớn. Vui lòng chọn file có kích thước tối đa 5MB."
            );
            setSelectedFile(null);
            return false;
        }

        setErrorMessage(""); // Xóa thông báo lỗi nếu file hợp lệ
        return true;
    };

    useEffect(() => {
        if (!open) {
            setSelectedFile(null);
            setErrorMessage("");
            setIsSuccess(null);
        }
    }, [open]);

    //ham xu li file thay doi
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && validateFile(file)) {
            setSelectedFile(file);
        }
    };
    //ham xu li keo file vao
    const handleDropFile = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && validateFile(file)) {
            setSelectedFile(file);
        }
    };
    //ham xu li bam nut tai len
    const handleSubmit = async () => {
        if (!selectedFile) return;
        // Nếu thành công thì gọi hàm: setPreviewUserList để set dữ liệu vào context, từ đó có dữ liệu để hiển thị bên page preview
        const result = await importUsers(selectedFile, deptId);
        setErrorUsers(result.data?.errorUsers);
        if (!result.success) {
            setIsSuccess(false);
            setErrorMessage(result.message);
        } else {
            setIsSuccess(true);
            setCountError(result.data?.countError);
            setCountSuccess(result.data?.countSuccess);
        }
    };

    // ham xu li tai file mau
    const handleDownloadSample = async () => {
        downloadUserTemplate(deptId).then((result) => {
            setToastInfo && setToastInfo({
                show: true,
                message: result.success ? "Tải file mẫu thành công" : "Tải file mẫu thất bại",
                severity: result.success ? "success" : "error",
            });
        })
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 'bold' }}>
                Nhập tài khoản
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ position: "absolute", right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {isSuccess === true ? (
                    // Success all
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
                                Kiểm tra danh sách người dùng để đảm bảo dữ liệu đã nhập chính xác.
                            </Typography>
                        </Box>
                    ) : (
                        // Success with error
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            textAlign="center"
                            sx={{ borderRadius: 4 }}
                        >
                            <Typography variant="h5" sx={{
                                fontWeight: 'medium',
                                color: 'black',
                                mb: 2
                            }}>
                                Kết quả thêm người dùng
                            </Typography>
                            <Stack sx={{ width: '70%', mb: 2 }}>
                                <Stack direction={'row'} sx={{ width: '100%', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="green">
                                        Số lượng người dùng được thêm thành công:
                                    </Typography>
                                    <Typography variant="body2" color="green">
                                        {countSuccess}
                                    </Typography>
                                </Stack>
                                <Stack direction={'row'} sx={{ width: '100%', justifyContent: 'space-between' }}>
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
                                sx={{
                                    textTransform: "none",
                                }}
                                onClick={() => { }}
                            >Tải file các người dùng bị lỗi</Button>
                        </Box>
                    )
                ) : isSuccess === false ? (
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
                ) : (
                    <>
                        {/* Giao diện tải file */}
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            border="2px dashed"
                            borderColor={errorMessage ? "red" : "#cccccc"}
                            borderRadius="8px"
                            p={4}
                            mb={2}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDropFile}
                        >
                            {selectedFile ? (
                                <Box textAlign="center">
                                    <CloudUploadIcon
                                        sx={{
                                            fontSize: 48,
                                            color: errorMessage ? "red" : "#cccccc",
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        color={errorMessage ? "error" : "textPrimary"}
                                        sx={{ mt: 2 }}
                                    >
                                        {selectedFile.name}{" "}
                                        <Button onClick={() => setSelectedFile(null)}>
                                            Thay đổi
                                        </Button>
                                    </Typography>
                                </Box>
                            ) : (
                                <Box textAlign="center">
                                    <CloudUploadIcon
                                        sx={{
                                            fontSize: 48,
                                            color: errorMessage ? "red" : "#cccccc",
                                        }}
                                    />
                                    <Typography variant="body2" color="textSecondary">
                                        Kéo và thả file vào đây hoặc{" "}
                                        <label
                                            htmlFor="file-upload"
                                            className="text-blue-600 cursor-pointer"
                                        >
                                            Nhấp để tải lên
                                        </label>
                                    </Typography>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept=".csv,.xls,.xlsx"
                                        onChange={handleFileChange}
                                        hidden
                                    />
                                    <Typography variant="caption" color="textSecondary">
                                        Định dạng hỗ trợ: Excel
                                    </Typography>
                                    <br></br>
                                    <Typography variant="caption" color="textSecondary">
                                        Kích thước tối đa: 5 MB
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                        {errorMessage && (
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="error">
                                    {errorMessage}
                                </Typography>
                            </Box>
                        )}
                        {/* Nút tải mẫu */}
                        <Box
                            display="flex"
                            alignItems="center"
                            bgcolor="#f5f5f5"
                            p={2}
                            borderRadius="8px"
                            mb={2}
                        >
                            <Typography variant="body2" color="textSecondary">
                                Định dạng mẫu
                            </Typography>
                            <Button onClick={handleDownloadSample} sx={{ ml: "auto" }}>
                                Tải mẫu
                            </Button>
                        </Box>
                    </>
                )}
            </DialogContent>
            {isSuccess === null && (
                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Hủy
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        disabled={!selectedFile || Boolean(errorMessage)}
                        variant="contained"
                    >
                        Nhập File
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
};

export default ImportUsersPopup;
