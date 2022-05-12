import { createContext, useEffect, useState } from 'react';
import clienteAxios from '../config/axios';
import Swal from "sweetalert2";

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };

                const {data} = await clienteAxios('/pacientes', config);
                setPacientes(data);
            } catch (e) {
                console.log(e)
            }
        }

        obtenerPacientes();
    }, [])

    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        if (paciente.id) {
            // Editando
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
                const pacienteActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState);
                setPacientes(pacienteActualizado);
            } catch (e) {
                console.log(e)
            }

        } else {
            // Nuevo Registro
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config);
                // Crear un nuevo objeto sin esas 3 variables
                const {createdAt, updatedAt, __v, ...pacienteAlmacenado} = data;
                setPacientes([pacienteAlmacenado, ...pacientes]);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }

    };

    const setEdicion = (paciente) => {
        setPaciente(paciente);
    }

    const eliminarPaciente = id => {

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            Swal.fire({
                title: 'Estás Seguro?',
                text: "No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#4f46e5',
                cancelButtonColor: '#DC2626',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await clienteAxios.delete(`/pacientes/${id}`, config);
                    const pacienteActualizado = pacientes.filter(pacienteState => pacienteState._id !== id)
                    setPacientes(pacienteActualizado);
                    await Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        text: 'Eliminado correctamente',
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente,
        }}>
            {children}
        </PacientesContext.Provider>
    );
};

export default PacientesContext;
