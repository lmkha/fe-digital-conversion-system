import { FaBeer } from "@react-icons/all-files/fa/FaBeer";

export default function Sidebar() {
    return (
        <div className="flex flex-col fixed top-0 left-0 w-16 h-screen bg-checkVarPrimary
                        justify-center items-center text-white shadow-lg">
            <i>A</i>
            <i>B</i>
            <i>C</i>
            <i>D</i>
            <i>
                <SidebarIcon />
            </i>
        </div>
    );
}

// const SidebarIcon = ({ icon }: { icon: string }) => {

// }

const SidebarIcon = () => {
    return (
        <FaBeer />
    );
}
