import PaginationInfo from "./pagination-info";

export interface FooterProps {
    onChangePageNumber?: (pageNumber: number) => void;
    onChangePageSize?: (pageSize: number) => void;
    exportDataFooter?: () => void;
    paginationInfo?: PaginationInfo;
}