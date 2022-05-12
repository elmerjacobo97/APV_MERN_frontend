import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const ConfirmarCuenta = () => {
    const params = useParams();
    const { id } = params;

    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});

    useEffect(() => {
        2;
        const confirmarCuenta = async () => {
            try {
                const url = `/veterinarios/confirmar/${id}`;
                const { data } = await clienteAxios(url);

                setCuentaConfirmada(true);
                setAlerta({
                    msg: data.msg,
                    error: false,
                });
            } catch (e) {
                setAlerta({
                    msg: e.response.data.msg,
                    error: true,
                });
            }

            setCargando(false);
        };

        confirmarCuenta();
    }, []);

    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-black text-4xl md:text-6xl capitalize'>
                    Confirma tu Cuenta y Comienza a Administrar{' '}
                    <span className='text-black'>tus Pacientes</span>
                </h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white animate__animated animate__fadeIn'>
                {!cargando && <Alerta alerta={alerta} />}

                {cuentaConfirmada && (
                    <Link to='/' className='block text-center my-5 text-gray-500 underline'>
                        Iniciar Sesión
                    </Link>
                )}
            </div>
        </>
    );
};

export default ConfirmarCuenta;
