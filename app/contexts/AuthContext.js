'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check if there's a token in localStorage on initial load
        const token = localStorage.getItem('auth_token');
        if (token) {
            // You might want to validate the token here
            setUser({ token });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            // Replace with your actual API endpoint
            const response = await fetch('http://192.168.1.2:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const users = await fetch('http://192.168.1.2:4000/users', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
            })

            const usersData = await users.json();

            const user = usersData.users.find(user => user.email === email);

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();

            // Save token to localStorage
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('id', user.id);

            // Update user state
            setUser({ 
                token: data.token,
                id: user.id 
            });

            // Redirect to dashboard or home page
            router.push('/');

            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        setUser(null);
        router.push('/login');
    };

    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
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