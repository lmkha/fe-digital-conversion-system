'use client';

export default function RecoveryOptionChooser({
    isVisible: isVisible,
    onclose,
    onSelectZaloRecovery = () => { },
    onSelectEmailRecovery = () => { },
}: {
    isVisible: boolean,
    onclose: () => void,
    onSelectZaloRecovery: () => void,
    onSelectEmailRecovery: () => void,
}) {
    if (!isVisible) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40" onClick={onclose}></div>

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                    className="bg-white p-6 rounded-lg shadow-lg w-[531px] h-[211px]" // Tailwind classes for width and height
                >
                    {/* Modal content */}
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <h2 className="text-2xl font-bold mb-4">Vui lòng chọn phương thức</h2>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded mb-2 w-full">
                            Gửi mã xác thực qua Zalo
                        </button>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-1 rounded w-full"
                            onClick={() => {
                                onSelectEmailRecovery();
                            }}
                        >
                            Gửi mã xác thực qua Email
                        </button>
                        <p className="mt-4 text-gray-500">Bạn đã có tài khoản ?&nbsp;
                            <a onClick={onclose} className="text-blue-500 hover:underline">Đăng nhập</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
