import { useEffect, useRef } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { Link, useNavigate,  } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { signOut } from "firebase/auth";

const HamburgerModal = ({ open, close }) => {
    const modalRef = useRef(null);
    const navigate = useNavigate();

    const links = [
        { text: 'Inicio', href: '/', key: 'inicio' },
        { text: 'Empleados', href: '/empleados', key: 'empleados' },
        { text: 'Materiales', href: '/material', key: 'materiales' },
        { text: 'Tablas', href: '/tablas', key: 'tablas' },
        { text: 'Perfil', href: '/perfil', key: 'perfil' },
        { text: 'Ajustes', href: '/ajustes', key: 'ajustes' }
    ];

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("Sign out");
                navigate('/login'); // Navegar a la página de inicio de sesión
            })
            .catch((error) => {
                console.error("Error al cerrar sesión:", error);
            });
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                close(); // Cerrar el modal si se hace clic fuera de él
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [open, close]);

    if (!open) {
        return null;
    }

    return (
        <div
            ref={modalRef}
            tabIndex={-1}
            className="fixed top-0 right-0 bottom-0 z-50 w-3/4 backdrop-blur-md flex flex-col items-center bg-white/50 rounded-l-lg">
            <div className="flex justify-end w-full p-5">
                <button
                    onClick={close}
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-200 hover:text-red-700 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                    aria-label="Cerrar modal">
                    <RiCloseFill />
                </button>
            </div>

            <ul className="flex flex-col divide-y-2 font-semibold items-center text-black">
                {links.map(link => (
                    <li key={link.key} className="inline-flex items-center hover:text-slate-700 py-3">
                        <Link to={link.href} onClick={close}>
                            {link.text}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="mt-20">
                <div className="mt-auto mb-5 flex flex-col justify-end w-full items-end">
                    <button
                        onClick={handleSignOut}
                        className="font-semibold hover:text-red-700 text-end">
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HamburgerModal;
