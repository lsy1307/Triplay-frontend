import { useState, useEffect } from 'react';
import { fetchCurrentUser } from '../api/user';

const useCurrentUser = () => {
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUserId = async () => {
            try {
                const currentUserId = await fetchCurrentUser(); // API 호출
                setUserId(currentUserId); // userId 저장
                console.log(currentUserId);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadUserId();
    }, []);

    return { userId, loading, error };
};

export default useCurrentUser;
