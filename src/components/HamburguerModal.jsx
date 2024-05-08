import { useEffect, useRef } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
// Nota: Asegúrate de importar correctamente esta función
// import logo from '../public/logo.svg';


const HamburgerModal = ({ open, close }) => {
  const modalRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      close(e);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      className="fixed top-0 right-0 bottom-0 z-50 w-3/4 backdrop-blur-md flex flex-col items-center bg-white/50 rounded-lg"
    >
      <div className="flex justify-end w-full p-5">
        <button
          onClick={close}
          type="button"
          className="text-gray-500 bg-white hover:bg-gray-200 hover:text-red-700 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
          aria-label="Cerrar modal"
        >
          <RiCloseFill />
        </button>
      </div>

      <figure className="mb-5">
        <img
          src={logo}
          alt="Logo de Aventura Compartida"
          width={100}
          height={50}
          priority={true}
        />
      </figure>

      <ul className="flex flex-col divide-y-2 font-semibold items-center text-black">
        <li className="inline-flex items-center hover:text-light-green py-3">
          <Link href="/" onClick={close}>
            Inicio
          </Link>
        </li>
        <li className="inline-flex items-center hover:text-light-green py-3">
          <Link href="/explore" onClick={close}>
            Explorar
          </Link>
        </li>
        <li className="inline-flex items-center hover:text-light-green py-3">
          <Link href="/post" onClick={close}>
            Compartir
          </Link>
        </li>
      </ul>

      <div className="mt-10">
        <Link href={session?.user ? "/profile" : "/login"} onClick={close} className="font-semibold hover:text-light-green">
          {session?.user ? "Perfil" : "Iniciar sesión"}
        </Link>
      </div>

      <div className="mt-auto flex flex-col justify-end w-full items-end">
        {session?.user ? (
          <button
            // onClick={() => signOut()}
            className="font-semibold hover:text-red-500 text-end"
          >
            Salir
          </button>
        ) : null}

        <Link />
      </div>

      <div className="text-gray-500 font-bold text-center text-sm">Ecotablas</div>
    </div>
  );
};

export default HamburgerModal;
