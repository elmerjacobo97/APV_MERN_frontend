import usePacientes from "../hooks/usePacientes";

const Paciente = ({paciente}) => {
    const { setEdicion, eliminarPaciente } = usePacientes()

    const {email, fecha, nombre, propietario, sintomas, _id} = paciente;
    const formatearFecha = fecha => {
        const nuevaFecha = new Date(fecha);
        return new Intl.DateTimeFormat('es-ES', {dateStyle: 'long'}).format(nuevaFecha)
    }

    return (
        <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-lg animate__animated animate__fadeIn">
            <p className="font-bold uppercase text-indigo-700 my-2">Nombre: {''}
                <span className="font-normal normal-case text-black">{nombre}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">Propietario: {''}
                <span className="font-normal normal-case text-black">{propietario}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">Email Contacto: {''}
                <span className="font-normal normal-case text-black">{email}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">Fecha de Alta: {''}
                <span className="font-normal normal-case text-black">{formatearFecha(fecha)}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">Síntomas: {''}
                <span className="font-normal normal-case text-black">{sintomas}</span>
            </p>

            <div className="flex justify-between my-5">
                <button
                    type="button"
                    className='bg-indigo-600 py-2 px-10 rounded-lg text-white uppercase font-bold hover:cursor-pointer
                    hover:bg-indigo-700 transition duration-300 active:bg-indigo-500'
                    onClick={() => setEdicion(paciente)}
                >Editar</button>
                <button
                    type="button"
                    className='bg-red-600 py-2 px-10 rounded-lg text-white uppercase font-bold hover:cursor-pointer
                    hover:bg-red-700 transition duration-300 active:bg-red-500'
                    onClick={() => eliminarPaciente(_id)}
                >Eliminar</button>
            </div>

        </div>
    );
};

export default Paciente;
