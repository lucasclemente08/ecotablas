import React, { useState } from 'react';

const Login = () => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('test@test.com');
    const [password, setPassword] = useState('123123');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setLoading(true);
        
        // Aquí puedes agregar la lógica de autenticación, como enviar una solicitud al servidor
        
        setLoading(false);
    };

    return (
        <div className='relative flex h-full  w-full md:p-5 font-aeonik '>
            <div className='p-10 h-3/4  w-full md:w-1/2 xl:w-1/3 mx-auto  rounded-xl bg-light-gray '>
                <figure className='text-center font-bold text-3xl'>
                    <img
                        src=""
                        alt='Logo '
                        width={150}
                        className='m-auto'
                    />
                    <figcaption>Accede a tu cuenta</figcaption>
                </figure>
                <form className='space-y-4 max-w-lg my-5 mx-auto' onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor='email'
                            className='block mb-2 text-sm font-medium text-dark '
                        >
                            Email
                        </label>
                        <input
                            onChange={(event) => setEmail(event.target.value)}
                            type='email'
                            name='email'
                            id='email'
                            className='bg-gray-50 outline outline-1 outline-light text-gray-900 text-sm rounded-lg  focus:outline-2 block w-full p-3'
                            placeholder='name@company.com'
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='password'
                            className='block mb-2 text-sm font-medium text-slate-800'
                        >
                            Contraseña
                        </label>
                        <input
                            onChange={(event) => setPassword(event.target.value)}
                            type='password'
                            name='password'
                            id='password'
                            placeholder='••••••••'
                            className='bg-gray-50 outline outline-1  outline-light text-gray-900 text-sm rounded-lg focus:outline-2 block w-full p-3 '
                            required
                        />
                    </div>
                    <div className='flex justify-end'>
                        <a
                            href='/login/recovery'
                            className='text-sm font-normal text-dark/70 underline'
                        >
                            Olvidé mi contraseña
                        </a>
                    </div>
                    {errors.length > 0 && (
                        <div className='text-[#B33A3A]'>
                            <ul className='mb-0'>
                                {errors.map((error) => (
                                    <li key={error}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {loading && (
                        <div className='flex justify-center'>
                            <span className='text-dark'>
                                Espera un momento, estamos cargando tu información...
                            </span>
                        </div>
                    )}
                    <div className='flex flex-col gap-2'>
                        <button
                            type='submit'
                            className='w-full text-black bg-teal hover:-translate-y-1 transition-transform border-2   font-bold rounded-full px-5 py-3 text-center text-lg'
                        >
                            Acceder
                        </button>
                        <div className='flex justify-center divide-y-2'>
                            <span className='text-dark'>o</span>
                        </div>
         
                    </div>
                    <div className='text-sm text-center font-normal text-dark '>
                        ¿No tienes cuenta?
                        <a href='/register' className=' text-semibold underline  mx-2'>
                            Registrarme
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
