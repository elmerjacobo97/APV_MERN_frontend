import { useState } from 'react';
import Formulario from '../components/Formulario';
import ListadoPacientes from '../components/ListadoPacientes';

const AdministrarPacientes = () => {
    const [mostarFormulario, setMostarFormulario] = useState(false);

    return (
        <div className='flex flex-col md:flex-row'>
            <button
                type='button'
                className='bg-indigo-600 text-white font-bold uppercase mx-10 p-2 rounded-md hover:bg-indigo-800 transition duration-300 active:bg-indigo-500 mb-10 md:hidden'
                onClick={() => setMostarFormulario(!mostarFormulario)}
            >
                {mostarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}
            </button>

            <div className={`${mostarFormulario ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
                <Formulario />
            </div>
            <div className='md:w-1/2 lg:w-3/5'>
                <ListadoPacientes />
            </div>
        </div>
    );
};

export default AdministrarPacientes;
