import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (axiosParams: any) => {
    const [response, setResponse] = useState<any>(undefined);
    const [error, setError] = useState<any>(undefined);
    const [loading, setloading] = useState(true);

    const fetchData = async (params: any) => {
        try {
            const result = await axios.request(params);
            setResponse(result.data);
        } catch (error) {
            setError(error);
        } finally {
            setloading(false);
        }
    };

    useEffect(() => {
        fetchData(axiosParams);
    }, []);

    return { response, error, loading };
};

export default useAxios;

// const { response, loading, error } = useAxios({
//     method: 'POST',
//     url: '/posts',
//     headers: { // no need to stringify
//       accept: '*/*'
//     },
//     data: {  // no need to stringify
//         userId: 1,
//         id: 19392,
//         title: 'title',
//         body: 'Sample text',
//     },
// });