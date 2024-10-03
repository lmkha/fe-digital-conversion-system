'use client';

import Sidebar from "./components/sidebar";

export default function Page() {

    return (
        <div className="w-screen h-screen">
            <Sidebar />

            <div className="flex flex-col w-screen h-screen justify-center items-center">
                <div className="w-40 h-40 
                              bg-red-400 mb-4 hover:bg-red-500
                                rounded-xl hover:rounded-3xl 
                                transition-all duration-100"
                />
            </div>
        </div>
    );
}
