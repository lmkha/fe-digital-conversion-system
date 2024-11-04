/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  PreviewUserList,
  useManagementUser,
} from "@/contexts/management-user-context";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getRolesByDeptId } from "@/services/role";
import UserPreview from "../../components/user-preview";
import ConfirmationDialog from "../../modals/confirmation";
import { downloadUserError, importUsers, validateUser } from "@/services/user";
import ImportStatusDialog from "../../modals/import-status";
import { useRouter } from "next/navigation";
import FullScreenLoading from "@/app/management/components/loading";
import { useManagement } from "@/contexts/management-context";

export default function PreviewPage() {
  const { setHeaderTitle, setHeaderButtons, setFooterInfo, footerInfo } =
    useManagement();
  const router = useRouter();
  const { previewUserList, setPreviewUserList } = useManagementUser();
  const [page, setPage] = useState(0);
  const [roles, setRoles] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [countError, setCountError] = useState(0);

  //
  const [openImportStatus, setOpenImportStatus] = useState(false);
  const [isImportSuccess, setIsImportSuccess] = useState<boolean | null>(null);
  const [countSuccessImport, setCountSuccessImport] = useState(0);
  const [countErrorImport, setCountErrorImport] = useState(0);
  const [errorMessage, setErrorMessage] = useState("Lỗi trong quá trình nhập");
  const [listUserError, setListUserError] = useState<PreviewUserList>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [validate, setValidate] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log("change page");
    setPage(newPage);
    console.log(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDialog = () => {
    validateUserImport();
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseImportStatus = () => {
    router.push("/management/user");
    setOpenImportStatus(false);
  };

  const setFalseValidate = () => {
    setValidate(false);
  };

  const handleConfirmSave = async () => {
    if (previewUserList) {
      setIsLoading(true);
      const result = await importUsers(previewUserList);
      setIsLoading(false);
      if (result.success) {
        const data = result.data;
        setIsImportSuccess(true);
        setListUserError(data.errorUsers);
        setCountErrorImport(data.countError);
        setCountSuccessImport(data.countSuccess);
      } else {
        setIsImportSuccess(false);
        setErrorMessage(result.message);
        console.log("........", result.message);
      }
      setOpenDialog(false);
      setOpenImportStatus(true);
    }
  };

  const validateUserImport = async () => {
    if (previewUserList) {
      console.log("list check:", previewUserList);
      const result = await validateUser(previewUserList);
      if (result.success) {
        const newListUsers = result.data.users as PreviewUserList;
        // setPreviewUserList(newListUsers);
        setValidate(true);
        const errorCount = newListUsers.filter((user) => !user.success).length;
        setCountError(errorCount);
      }
    }
  };

  const handleDownloadErrorFile = async () => {
    console.log("listUserError::", listUserError);
    const result = await downloadUserError(
      listUserError,
      listUserError[0].deptId
    );
  };

  useEffect(() => {
    setHeaderTitle("Tạo tài khoản từ file");
    setHeaderButtons([
      {
        type: "cancel",
        label: "Hủy",
        onClick: () => {
          router.push("/management/user");
        },
      },
      {
        type: "add",
        label: "Lưu",
        onClick: () => {
          handleOpenDialog();
        },
      },
    ]);
    setFooterInfo({
      ...footerInfo,
      exportDataFooter: undefined,
      paginationInfo: undefined
    })
  }, [setHeaderButtons, setHeaderTitle]);

  useEffect(() => {
    if (previewUserList && previewUserList.length > 0) {
      getRolesByDeptId(previewUserList[0].deptId).then((res) => {
        const rolesRes = res.roles;
        const lstRole = rolesRes.map((role: any) => role.roleName);
        setRoles(lstRole);
      });
    }
  }, []);

  return (
    <div>
      {previewUserList && previewUserList.length > 0 ? (
        <>
          <FullScreenLoading open={isLoading} />
          <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 2 }}>
            <TableContainer
              sx={{
                maxHeight: 500,
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Tên tài khoản</TableCell>
                    <TableCell align="left">Họ tên</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Công việc</TableCell>
                    <TableCell align="left">Vai trò</TableCell>
                    <TableCell align="left">Trạng thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {previewUserList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, index) => {
                      return (
                        <UserPreview
                          key={index + page * rowsPerPage}
                          index={index + page * rowsPerPage}
                          usersData={user}
                          roles={roles}
                          previewUserList={previewUserList}
                          setPreviewUserList={setPreviewUserList}
                          validate={validate}
                          setFalseValidate={setFalseValidate}
                        />
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={previewUserList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage=""
            />
          </Paper>
          <ConfirmationDialog
            open={openDialog}
            onClose={handleCloseDialog}
            onConfirm={handleConfirmSave}
            title="Xác nhận lưu"
            message={
              countError
                ? `có ${countError} tài khoản chưa hợp lệ. Vẫn tiếp tục lưu ?`
                : "Bạn có chắc chắn muốn tạo danh sách tài khoản không?"
            }
            countError={countError}
          />

          <ImportStatusDialog
            open={openImportStatus}
            onClose={handleCloseImportStatus}
            isSuccess={isImportSuccess}
            countSuccess={countSuccessImport}
            countError={countErrorImport}
            errorMessage={errorMessage}
            onDownloadErrorFile={handleDownloadErrorFile}
          />
        </>
      ) : (
        <p>Không có dữ liệu</p>
      )}
    </div>
  );
}