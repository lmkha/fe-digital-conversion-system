export interface ToastInfo {
    show: boolean;
    severity: 'success' | 'error';
    message: string;
    duration?: number;
    autoClose?: boolean;
    onClose?: () => void;
}
