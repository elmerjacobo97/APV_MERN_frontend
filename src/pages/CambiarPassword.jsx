import AdminNav from "../components/AdminNav";
import {useState} from "react";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {
    const {guardarPassword} = useAuth();

    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_nuevo: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Object.values(password).some(campo => campo === '')) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                text: 'Ambos campos son obligatorios',
                showConfirmButton: false,
                timer: 3000
            })
            return;
        }

        if (password.pwd_nuevo.length < 6) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                text: 'El password debe tener mínimo 6 caracteres',
                showConfirmButton: false,
                timer: 3000
            })
            return;
        }

        guardarPassword(password);
    }


    return (
        <>
            <AdminNav />
            <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''}
                <span className="text-indigo-600 font-bold">password aquí</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-5">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="my-3">
                            <label htmlFor="password" className="uppercase font-bold text-gray-600">Password Actual</label>
                            <input
                                type='password'
                                id='password'
                                placeholder='Ingresa tu password actual'
                                className='border w-full p-2 mt-3 bg-gray-50 rounded-lg focus:outline-none focus:ring focus:ring-indigo-600 focus:transition placeholder:text-gray-400'
                                name="pwd_actual"
                                onChange={(e) => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="password-nuevo" className="uppercase font-bold text-gray-600">Nuevo Password</label>
                            <input
                                type='password'
                                id='password-nuevo'
                                placeholder='Ingresa tu nuevo password'
                                className='border w-full p-2 mt-3 bg-gray-50 rounded-lg focus:outline-none focus:ring focus:ring-indigo-600 focus:transition placeholder:text-gray-400'
                                name="pwd_nuevo"
                                onChange={(e) => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>
                        <div className="flex justify-center">
                            <input
                                type='submit'
                                value='Actualizar password'
                                className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 transition duration-300 md:w-auto focus:outline-none focus:ring focus:ring-violet-300'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CambiarPassword;
