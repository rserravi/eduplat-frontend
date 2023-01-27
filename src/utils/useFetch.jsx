// useFetch.jsx
import { useState } from 'react';
import { userGoogleRegistrationAPI } from 'api/userApi';

const useFetch = (url) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGoogle = async (response) => {
        const result = await userGoogleRegistrationAPI(response);
        console.log('AHORA CARGAMOS LA PÁGINA DE EDICIÓN DE USUARIO');
        console.log(result);
    };
    return { loading, error, handleGoogle };
};

export default useFetch;
