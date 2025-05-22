import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', {
                email,
                password,
            });
            const { token } = response.data;
            setToken(token);
            // Fetch user data after successful login
            const userResponse = await axios.get('http://localhost:3001/api/users/me');
            setUser(userResponse.data);
        } catch (error) {
            throw new Error('Login failed');
        }
    };

    const register = async (email: string, password: string, firstName: string, lastName: string) => {
        try {
            await axios.post('http://localhost:3001/api/auth/register', {
                email,
                password,
                firstName,
                lastName,
            });
            await login(email, password);
        } catch (error) {
            throw new Error('Registration failed');
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                register,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 