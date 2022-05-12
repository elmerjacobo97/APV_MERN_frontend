import { Navigate, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import useAuth from '../hooks/useAuth';

const RutaProtegida = () => {
    const { auth, cargando } = useAuth();

    if (cargando) return <Spinner />;

    return (
        <div>
            <Header />

            {auth?._id ? (
                <main className='container mx-auto mt-10'>
                    <Outlet />
                </main>
            ) : (
                <Navigate to='/' />
            )}

            <Footer />
        </div>
    );
};

export default RutaProtegida;
