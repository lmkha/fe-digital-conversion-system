import { PreviewUserList } from "@/contexts/management-user-context";
import isValidPassword from "@/core/logic/password-validator";
import { checkEmail, checkUserName } from "@/services/user";

export type ImportUserValidatedField =
  | "username"
  | "fullname"
  | "jobtitle"
  | "role"
  | "email"
  | "exists-email"
  | "exists-username";

export async function importUserValidator({
  username,
  fullname,
  jobTitle,
  role,
  email,
  previewUserList,
}: {
  username: string;
  fullname: string;
  jobTitle: string;
  role: string;
  email: string;
  previewUserList: PreviewUserList;
}): Promise<ImportUserValidatedField[]> {
  // Validate username
  const errorFields: ImportUserValidatedField[] = [];
  if (username.length > 50) errorFields.push("username");
  // If username is vietnamese, add to errorFields
  if (!/^[a-zA-Z0-9_]+$/.test(username)) errorFields.push("username");

  // Validate name
  if (fullname.length == 0 || fullname.length > 100)
    errorFields.push("fullname");

  // Validate job title
  if (jobTitle.length == 0 || jobTitle.length > 100)
    errorFields.push("jobtitle");

  // Validate role
  if (role.length == 0) errorFields.push("role");

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) errorFields.push("email");

  // email
  // call APi
  // errorFields.push("existedEmail")
  const [uniqueEmail, uniqueUserName] = await Promise.all([
    checkEmail(email),
    checkUserName(username),
  ]);

  //validate in users import
  let countUsername = 0;
  let countEmail = 0;
  console.log("validate:", previewUserList);
  previewUserList.forEach((user) => {
    if (user.email === email) countEmail++;
    if (user.userName === username) countUsername++;
  });

  if (!uniqueEmail.data || countEmail > 1) {
    errorFields.push("exists-email");
  }

  if (!uniqueUserName.data || countUsername > 1) {
    errorFields.push("exists-username");
  }

  return errorFields;
}
