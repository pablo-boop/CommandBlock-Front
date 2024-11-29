// AuthContext.js
'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { message, Space } from 'antd';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //Message success and error
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const id = localStorage.getItem('id');
        if (token && id) {
            setUser({ token, id });
        }
        setLoading(false);
    }, []);

    //Messages Succes and Error
    const success = (msg) => {
        messageApi.open({
            type: 'success',
            content: msg,
        });
    };

    const error = (msg) => {
        messageApi.open({
            type: 'error',
            content: msg,
        });
    };

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    
                    if (data.message == 'Senha incorreta' || data.message == 'Usuário não encontrado') {
                        error(data.message)
                    } else {
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
                    }
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
            {contextHolder}
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