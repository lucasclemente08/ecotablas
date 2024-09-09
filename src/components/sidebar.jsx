import {useState} from 'react';
import {signOut} from "firebase/auth";
import {auth} from '../firebase/firebase';
import {Link, useNavigate} from 'react-router-dom';
import {FaChevronDown} from "react-icons/fa6";
import {FaChevronUp} from "react-icons/fa";
import Links from './LinksBar';

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                console.error("Error al cerrar sesión: ", error);
            });
    };

    return (
        <div className="h-dvh">
            <div
                className={`${
                open
                    ? "w-28"
                    : "w-20"} bg-dark-purple w-60 min-h-screen pt-1 bg-sky-600 shadow relative duration-300`}>
                <div className="flex flex-col items-center m-1 p-4">
                    <div className="mt-10">
                        <h1
                            className={`text-white origin-left font-medium text-xl duration-200 ${
                            !open && "scale-0"}`}>
                            Gestión de ecotablas
                        </h1>
                    </div>
                </div>

                <Links/>
               
                <div className="mt-60 text-center justify-center mb-5 flex w-full">
                    <button
                        onClick={handleSignOut}
                        className="font-semibold text-white hover:text-red-600">
                        Cerrar sesión
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Sidebar;
