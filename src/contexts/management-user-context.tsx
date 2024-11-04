"use client";

import UserDescription from "@/services/models/user-description";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type PreviewUserList = UserDescription[];

interface ManagementUserContextType {
  previewUserList: PreviewUserList | undefined;
  setPreviewUserList: (previewUserList: PreviewUserList) => void;
}

const ManagementUserContext = createContext<
  ManagementUserContextType | undefined
>(undefined);

export const ManagementUserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [previewUserList, setPreviewUserList] = useState<PreviewUserList>([]);

  return (
    <ManagementUserContext.Provider
      value={{ previewUserList, setPreviewUserList }}
    >
      {children}
    </ManagementUserContext.Provider>
  );
};

export const useManagementUser = () => {
  const context = useContext(ManagementUserContext);
  if (context === undefined) {
    throw new Error(
      "useManagementUser must be used within a ManagementUserProvider"
    );
  }
  return context;
};
