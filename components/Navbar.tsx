import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
    return (
        <div className="w-full h-16 border-b-2 border-[#1c1c1c] flex items-center justify-center">
            <div className="w-full max-w-350 mx-auto flex items-center justify-between px-5 max-sm:px-3">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold tracking-wide max-sm:text-[16px]">Campaign Monitoring Dashboard</h1>
                    <p className="text-[11px] opacity-70 -mt-0.5">Real-time campaign performance tracking</p>
                </div>
                <FaUserCircle size={25} className="cursor-pointer opacity-80" />
            </div>
        </div>
    )
}