// AuthContext.js
'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const id = localStorage.getItem('id');
        if (token && id) {
            setUser({ token, id });
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            fetch('http://192.168.56.1:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    
                    // Save both token and ID
                    localStorage.setItem('auth_token', data.token);
                    localStorage.setItem('id', data.id); // Make sure your API returns user.id
                    
                    // Update user state
                    setUser({ 
                        token: data.token,
                        id: data.id
                    });
                    
                    router.push('/');
                    resolve({ success: true });
                })
                .catch((error) => {
                    console.error('Login error:', error);
                    resolve({ success: false, error: error.message });
                });
        });
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('id');
        setUser(null);
        router.push('/Login');
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            logout,
            isAuthenticated: !!user
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};