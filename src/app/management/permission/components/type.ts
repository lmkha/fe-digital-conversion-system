
interface PermissionItemProps {
    id?: string,
    no: string,
    type: string,
    permissionCode: string,
    permissionName: string,
}

interface ParentItemProps extends PermissionItemProps {
    childrenList?: PermissionItemProps[],
    onChangeItem: () => void,
    isExpanded: boolean,
}

interface PermissionChildItem {
    permissionId: string;
    permissionNo: string;
    type: string;
    permissionCode: string;
    permissionName: string;
    parentId: string;
}

interface PermissionParentItem {
    isExpanded: boolean;
    permissionId: string;
    permissionNo: string;
    permissionCode: string;
    permissionName: string;
    type: string;
    childrenList: PermissionChildItem[];
}

interface PermissionFilterData {
    type: string;
    permissionCode: string;
    permissionName: string;
}