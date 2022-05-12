import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([email, password].includes('')) {
            setAlerta({
                msg: 'Ambos campos son obligatorios',
                error: true,
            });
            return;
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/login', { email, password });
            setAlerta({});
            localStorage.setItem('token', data.token);
            setAuth(data);
            navigate('/admin');
        } catch (e) {
            setAlerta({
                msg: e.response.data.msg,
                error: true,
            });
        }
    };

    const { msg } = alerta;

    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-black text-4xl md:text-6xl capitalize'>
                    Inicia Sesión y Administra <span className='text-black'>tus Pacientes</span>
                </h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {msg && <Alerta alerta={alerta} />}

                <form onSubmit={handleSubmit}>
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

                    <input
                        type='submit'
                        value='Iniciar Sesión'
                        className='bg-indigo-700 w-full p-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 transition duration-300 md:w-auto focus:outline-none focus:ring focus:ring-violet-300'
                    />
                </form>

                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link
                        to='/registrar'
                        className='block text-center my-5 text-gray-500 underline'
                    >
                        ¿No tienes una cuenta? Regístrate
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

export default Login;
