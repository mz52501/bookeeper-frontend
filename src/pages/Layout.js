import { Link, Outlet } from 'react-router-dom';
import { FaBook } from 'react-icons/fa';

export default function Layout() {
    //TODO: Replace currentUser with the one logged
    //const currentUser = { role: 'user', username: 'john.doe' }; 
    // To test admin use :
    const currentUser = { role: 'admin', username: 'admin.user' };

    return (
        <div className="flex flex-col h-full">
            <nav className="flex justify-start items-center bg-gray-200">
                <div className="py-3 px-5 flex justify-center items-center">
                    <p className="text-4xl font-semibold mr-1">Bookeeper</p>
                    <FaBook size={40} />
                </div>
                {/* Ajout des liens de navigation conditionnels */}
                <ul className="flex gap-4 ml-10">
                    {currentUser.role === 'admin' && (
                        <li>
                            <Link to="/addbook" className="text-blue-500 hover:underline">
                                Add a book
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link to="/profile" className="text-blue-500 hover:underline">
                            My profile
                        </Link>
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </div>
    )
}
