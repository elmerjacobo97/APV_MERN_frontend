import {useEffect, useState} from 'react';
import usePacientes from '../hooks/usePacientes';
import Swal from "sweetalert2";

const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id, setId] = useState(null);

    const { guardarPaciente, paciente } = usePacientes();

    useEffect(() => {
        if (paciente?.nombre) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
            setId(paciente._id);
        }
    }, [paciente])

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar el formulario
        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                text: 'Todos los campos son obligatorios',
                showConfirmButton: false,
                timer: 3000
            })
            return;
        }

        guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });
        if (id) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: 'Paciente actualizado correctamente',
                showConfirmButton: false,
                timer: 3000
            })
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: 'Paciente agregado correctamente',
                showConfirmButton: false,
                timer: 3000
            })
        }

        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
        setId('');
    };

    return (
        <>
            <h2 className="font-black text-3xl text-center">Administrador de pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">Añade tus pacientes y {''}
                <span className="text-indigo-600 font-bold">administralos</span>
            </p>

            <form
                className='bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md animate__animated animate__fadeIn'
                onSubmit={handleSubmit}
            >
                <div className='mb-5'>
                    <label htmlFor='nombre' className='text-gray-700 uppercase font-bold'>
                        Nombre Mascota
                    </label>
                    <input
                        type='text'
                        id='nombre'
                        placeholder='Nombre de la mascota'
                        className='border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md focus:outline-none focus:ring focus:ring-indigo-600 focus:transition'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className='mb-5'>
                    <label htmlFor='propitario' className='text-gray-700 uppercase font-bold'>
                        Nombre Propietario
                    </label>
                    <input
                        type='text'
                        id='propitario'
                        placeholder='Nombre del propietario'
                        className='border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md focus:outline-none focus:ring focus:ring-indigo-600 focus:transition'
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>

                <div className='mb-5'>
                    <label htmlFor='email' className='text-gray-700 uppercase font-bold'>
                        Email Propietario
                    </label>
                    <input
                        type='email'
                        id='email'
                        placeholder='Email del propietario'
                        className='border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md focus:outline-none focus:ring focus:ring-indigo-600 focus:transition'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className='mb-5'>
                    <label htmlFor='fecha' className='text-gray-700 uppercase font-bold'>
                        Fecha Alta
                    </label>
                    <input
                        type='date'
                        id='fecha'
                        className='border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md focus:outline-none focus:ring focus:ring-indigo-600 focus:transition'
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>

                <div className='mb-5'>
                    <label htmlFor='sintomas' className='text-gray-700 uppercase font-bold'>
                        Síntomas
                    </label>
                    <textarea
                        id='sintomas'
                        placeholder='Describe los sítomas de tu mascota'
                        className='border w-full p-2 mt-2 placeholder:text-gray-400 rounded-md focus:outline-none focus:ring focus:ring-indigo-600 focus:transition'
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    />
                </div>

                <input
                    type='submit'
                    value={id ? 'Guardar Cambios' : 'Agregar Paciente'}
                    className='bg-indigo-700 w-full p-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 transition duration-300 active:bg-indigo-500'
                />
            </form>
        </>
    );
};

export default Formulario;
