import { useState } from 'react';

import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Registrar = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true,
            });
            return;
        }

        if (password !== repetirPassword) {
            setAlerta({
                msg: 'Los password no son iguales',
                error: true,
            });

            return;
        }

        if (password.length < 6) {
            setAlerta({
                msg: 'El password es muy corto, agrega mínimo 6 caracteres',
                error: true,
            });
            return;
        }

        setAlerta({});

        // Crear el usuario en la api
        try {
            await clienteAxios.post('/veterinarios', { nombre, email, password });

            setAlerta({
                msg: 'Creado correctamente, revisa tu email',
                error: false,
            });
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true,
            });
        }
    };

    const { msg } = alerta;

    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-black text-4xl md:text-6xl capitalize'>
                    Crea tu Cuenta y Administra <span className='text-black'>tus Pacientes</span>
                </h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white animate__animated animate__fadeIn'>
                {msg && <Alerta alerta={alerta} />}

                <form onSubmit={handleSubmit}>
                    <div className='mb-5'>
                        <label
                            htmlFor='nombre'
                            className='uppercase text-gray-600 block text-xl font-bold'
                        >
                            Nombre
                        </label>
                        <input
                            type='text'
                            id='nombre'
                            placeholder='Tu nombre'
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-none focus:ring focus:ring-indigo-600 focus:transition'
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <div className='mb-5'>
                        <label
                            htmlFor='email'
                            className='uppercase text-gray-600 block text-xl font-bold'
                        >
                            Email
                        </label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Email de registro'
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-none focus:ring focus:ring-indigo-600 focus:transition'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='mb-5'>
                        <label
                            htmlFor='password'
                            className='uppercase text-gray-600 block text-xl font-bold'
                        >
                            Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            placeholder='Tu password'
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-none focus:ring focus:ring-indigo-600 transition'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className='mb-5'>
                        <label
                            htmlFor='password-2'
                            className='uppercase text-gray-600 block text-xl font-bold'
                        >
                            Repetir Password
                        </label>
                        <input
                            type='password'
                            id='password-2'
                            placeholder='Repite tu password'
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-none focus:ring focus:ring-indigo-600 transition'
                            value={repetirPassword}
                            onChange={(e) => setRepetirPassword(e.target.value)}
                        />
                    </div>
                    <input
                        type='submit'
                        value='Crear Cuenta'
                        className='bg-indigo-700 w-full p-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 transition duration-300 md:w-auto focus:outline-none focus:ring focus:ring-violet-300'
                    />
                </form>

                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link to='/' className='block text-center my-5 text-gray-500 underline'>
                        ¿Ya tienes una cuenta? Inicia Sesión
                    </Link>
                    <Link
                        to='/olvide-password'
                        className='block text-center my-5 text-gray-500 underline'
                    >
                        Olvide mi password
                    </Link>
                </nav>
            </div>
        </>
    );
};

export default Registrar;
