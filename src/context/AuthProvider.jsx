import { createContext, useEffect, useState } from 'react';
import clienteAxios from '../config/axios';
import Swal from "sweetalert2";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setCargando(false);
                return;
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const { data } = await clienteAxios('/veterinarios/perfil', config);
                setAuth(data);
            } catch (e) {
                console.log(e.response.data.msg);
                setAuth({});
            }

            setCargando(false);
        };
        autenticarUsuario();
    }, []);

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({});
    };

    const actualizarPerfil = async (datos) => {
        const token = localStorage.getItem('token');

        if (!token) {
            setCargando(false);
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const url = `/veterinarios/perfil/${datos._id}`;
            await clienteAxios.put(url, datos, config);
            await Swal.fire({
                position: 'center',
                icon: 'success',
                text: 'Almacenado correctamente',
                showConfirmButton: false,
                timer: 3000
            })
        } catch (e) {
            await Swal.fire({
                position: 'center',
                icon: 'error',
                text: e.response.data.msg,
                showConfirmButton: false,
                timer: 3000
            })
        }
    }

    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('token');

        if (!token) {
            setCargando(false);
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const url = '/veterinarios/actualizar-password'
            const {data} = await clienteAxios.put(url, datos, config);
            await Swal.fire({
                position: 'center',
                icon: 'success',
                text: data.msg,
                showConfirmButton: false,
                timer: 3000
            })

        } catch (e) {
            await Swal.fire({
                position: 'center',
                icon: 'error',
                text: e.response.data.msg,
                showConfirmButton: false,
                timer: 3000
            })
        }

    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;
