import {Link, Outlet} from "react-router-dom";
import {FaBookAtlas} from "react-icons/fa6";

export default function Layout() {


    return (
        <div className="flex flex-col h-full">
            <nav className="flex justify-start items-center bg-gray-200">
                <div className="py-3 px-5 flex justify-center items-center">
                    <p className="text-4xl font-semibold mr-1">Bookeeper</p>
                    <FaBookAtlas size={40}/>
                </div>
            </nav>
            <Outlet/>
        </div>
    )
}
