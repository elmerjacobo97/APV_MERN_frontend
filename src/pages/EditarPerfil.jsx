import {useEffect, useState} from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const EditarPerfil = () => {
    const { auth, actualizarPerfil } = useAuth();
    const [perfil, setPerfil] = useState({});

    useEffect(() => {
        setPerfil(auth)
    }, [auth])

    const handleSubmit = (e) => {
        e.preventDefault();

        const {nombre, email} = perfil
        if ([nombre, email].includes('')) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                text: 'Email y Nombre son obligatorios',
                showConfirmButton: false,
                timer: 3000
            })
            return;
        }

        actualizarPerfil(perfil)
    }

    return (
        <>
            <AdminNav />
            <h2 className="font-black text-3xl text-center mt-10">Modifica tu perfil</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''}
                <span className="text-indigo-600 font-bold">información aquí</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-5">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="my-3">
                            <label htmlFor="nombre" className="uppercase font-bold text-gray-600">Nombre</label>
                            <input
                                type='text'
                                id='nombre'
                                placeholder='Ingresa tu nombre'
                                className='border w-full p-2 mt-3 bg-gray-50 rounded-lg focus:outline-none focus:ring focus:ring-indigo-600 focus:transition placeholder:text-gray-400'
                                name="nombre"
                                value={perfil.nombre || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="email" className="uppercase font-bold text-gray-600">Email</label>
                            <input
                                type='email'
                                id='email'
                                placeholder='Ingresa tu correo electrónico'
                                className='border w-full p-2 mt-3 bg-gray-50 rounded-lg focus:outline-none focus:ring focus:ring-indigo-600 focus:transition placeholder:text-gray-400'
                                name="email"
                                value={perfil.email || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="web" className="uppercase font-bold text-gray-600">Sitio web</label>
                            <input
                                type='text'
                                id='web'
                                placeholder='Ingresa tu sitio web'
                                className='border w-full p-2 mt-3 bg-gray-50 rounded-lg focus:outline-none focus:ring focus:ring-indigo-600 focus:transition placeholder:text-gray-400'
                                name="web"
                                value={perfil.web || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="telefono" className="uppercase font-bold text-gray-600">Teléfono</label>
                            <input
                                type='tel'
                                id='telefono'
                                placeholder='Ingresa tu número telefónico'
                                className='border w-full p-2 mt-3 bg-gray-50 rounded-lg focus:outline-none focus:ring focus:ring-indigo-600 focus:transition placeholder:text-gray-400'
                                name="telefono"
                                value={perfil.telefono || '' }
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>

                        <div className="flex justify-center">
                            <input
                                type='submit'
                                value='Guardar Cambios'
                                className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 transition duration-300 md:w-auto focus:outline-none focus:ring focus:ring-violet-300'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditarPerfil;
