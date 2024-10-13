
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
