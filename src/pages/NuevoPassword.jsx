import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const NuevoPassword = () => {
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);

    const params = useParams();
    const { token } = params;

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`veterinarios/olvide-password/${token}`);
                setAlerta({
                    msg: 'Coloca tu nuevo password',
                    error: false,
                });
                setTokenValido(true);
            } catch (e) {
                setAlerta({
                    msg: 'Hubo un error con el enlace',
                    error: true,
                });
            }
        };
        comprobarToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            setAlerta({
                msg: 'El password debe ser mínimo de 6 caracteres',
                error: true,
            });
            return;
        }

        try {
            const url = `/veterinarios/olvide-password/${token}`;
            const { data } = await clienteAxios.post(url, { password });
            setAlerta({
                msg: data.msg,
                error: false,
            });

            setPasswordModificado(true);
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
                    Restablece tu password y no pierdas acceso a{' '}
                    <span className='text-black'>tus pacientes</span>
                </h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {msg && <Alerta alerta={alerta} />}

                {tokenValido && (
                    <form onSubmit={handleSubmit}>
                        <div className='mb-5'>
                            <label
                                htmlFor='password'
                                className='uppercase text-gray-600 block text-xl font-bold'
                            >
                                Nuevo password
                            </label>
                            <input
                                type='password'
                                id='password'
                                placeholder='Tu nuevo password'
                                className='border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-none focus:ring focus:ring-indigo-600 transition'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <input
                            type='submit'
                            value='Restablecer password'
                            className='bg-indigo-700 w-full p-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 transition duration-300 md:w-auto focus:outline-none focus:ring focus:ring-violet-300'
                        />
                    </form>
                )}

                {passwordModificado && (
                    <Link to='/' className='block text-center my-5 text-gray-500 underline'>
                        Iniciar Sesión
                    </Link>
                )}
            </div>
        </>
    );
};

export default NuevoPassword;
