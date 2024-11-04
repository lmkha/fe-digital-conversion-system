import React, { use, useEffect, useRef, useState } from "react";
import { TextField, MenuItem, TableRow, TableCell } from "@mui/material";
import UserDescription from "@/services/models/user-description";
import { PreviewUserList } from "@/contexts/management-user-context";
import { CircleCheck, CircleX } from "lucide-react";
import {
  ImportUserValidatedField,
  importUserValidator,
} from "@/validators/import-user";

interface PreviewUsersProps {
  index: number;
  usersData: UserDescription;
  roles: string[];
  previewUserList: PreviewUserList;
  setPreviewUserList: (previewUserList: PreviewUserList) => void;
  validate: boolean;
  setFalseValidate: () => void;
}

const UserPreview: React.FC<PreviewUsersProps> = ({
  index,
  usersData,
  roles,
  previewUserList,
  setPreviewUserList,
  validate,
  setFalseValidate,
}) => {
  const [user, setUser] = useState<UserDescription>(usersData);
  const [errorFields, setErrorFields] = useState<ImportUserValidatedField[]>();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (field: keyof typeof user, value: string) => {
    const newUser = { ...user, [field]: value };
    setUser(newUser);
    const newListPreview = previewUserList;
    newListPreview[index] = newUser;
    setPreviewUserList(newListPreview);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      console.log("user:::", newUser);
      validateUser(newUser, newListPreview);
    }, 1000);
  };

  const validateUser = async (
    user: UserDescription,
    previewUserList: PreviewUserList
  ) => {
    const errorFields = await importUserValidator({
      username: user.userName,
      fullname: user.fullName,
      jobTitle: user.jobTitle,
      role: user.role,
      email: user.email,
      previewUserList,
    });

    if (errorFields.length > 0) {
      setErrorFields(errorFields);
    } else {
      setErrorFields([]);
    }
  };

  useEffect(() => {
    if (validate) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      validateUser(user, previewUserList);
      setFalseValidate();
    }
  }, [validate]);

  useEffect(() => {
    validateUser(user, previewUserList);
    console.log(index);
  }, []);

  useEffect(() => {
    if ((errorFields?.length || 0) > 0) {
      setUser({ ...user, success: false });
    } else setUser({ ...user, success: true });
  }, [errorFields]);

  return (
    <TableRow
      hover
      key={index}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        // backgroundColor: isHighlighted ? "#F5D2DB" : "none",
      }}
    >
      <TableCell
        component="th"
        scope="row"
        sx={
          {
            // borderRadius: isHighlighted ? "8px 0 0 8px" : 0,
            // backgroundColor: isHighlighted ? "#F5D2DB" : "inherit",
          }
        }
      >
        <TextField
          size="small"
          variant="standard"
          value={user.userName}
          error={
            errorFields?.includes("username") ||
            errorFields?.includes("exists-username")
          }
          helperText={
            errorFields?.includes("username")
              ? "Tên tài khoản không được để trống và không chứa dấu cách"
              : errorFields?.includes("exists-username")
                ? "Tên tài khoản đã tồn tại"
                : ""
          }
          onChange={(e) => handleInputChange("userName", e.target.value)}
          fullWidth
        />
      </TableCell>
      <TableCell
        align="left"
        sx={
          {
            // backgroundColor: isHighlighted ? "#F5D2DB" : "inherit",
          }
        }
      >
        <TextField
          size="small"
          variant="standard"
          value={user.fullName || ""}
          error={errorFields?.includes("fullname")}
          helperText={
            errorFields?.includes("fullname")
              ? "Họ tên không được để trống"
              : ""
          }
          onChange={(e) => handleInputChange("fullName", e.target.value)}
          fullWidth
        />
      </TableCell>
      <TableCell
        align="left"
        sx={
          {
            // backgroundColor: isHighlighted ? "#F5D2DB" : "inherit",
          }
        }
      >
        <TextField
          size="small"
          variant="standard"
          value={user.email || ""}
          error={
            errorFields?.includes("email") ||
            errorFields?.includes("exists-email")
          }
          helperText={
            errorFields?.includes("email")
              ? "email không đúng định dạng"
              : errorFields?.includes("exists-email")
                ? "Email đã tồn tại"
                : ""
          }
          onChange={(e) => handleInputChange("email", e.target.value)}
          fullWidth
        />
      </TableCell>
      <TableCell
        align="left"
        sx={
          {
            // backgroundColor: isHighlighted ? "#F5D2DB" : "inherit",
          }
        }
      >
        <TextField
          size="small"
          variant="standard"
          value={user.jobTitle || ""}
          error={errorFields?.includes("jobtitle")}
          helperText={
            errorFields?.includes("jobtitle")
              ? "công việc không được để trống"
              : ""
          }
          onChange={(e) => handleInputChange("jobTitle", e.target.value)}
          fullWidth
        />
      </TableCell>
      <TableCell
        align="left"
        sx={
          {
            // backgroundColor: isHighlighted ? "#F5D2DB" : "inherit",
          }
        }
      >
        <TextField
          size="small"
          variant="standard"
          select
          defaultValue={user.role || ""}
          error={errorFields?.includes("role")}
          helperText={
            errorFields?.includes("role") ? "Vai trò không được để trống" : ""
          }
          onChange={(e) => handleInputChange("role", e.target.value)}
          fullWidth
        >
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </TextField>
      </TableCell>
      <TableCell
        align="right"
        sx={{
          // borderRadius: isHighlighted ? "0 8px 8px 0" : 0,
          // backgroundColor: isHighlighted ? "#F5D2DB" : "inherit",
          // fontWeight: "bold",
          maxWidth: 300,
          minWidth: 100,
        }}
      >
        <div className="flex items-center justify-center">
          {!user.success ? (
            <CircleX size={28} strokeWidth={2.5} color="red" />
          ) : (
            <CircleCheck size={28} strokeWidth={2.5} color="green" />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default UserPreview;