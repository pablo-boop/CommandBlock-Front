'use client'
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import styles from './styles.module.css';
import senaiLogo from '../../../public/senai.png';
import Image from 'next/image';
import Link from 'next/link';
//Imports styles
import { Button } from "antd";
import { CiLogout } from "react-icons/ci";

const Header = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { logout } = useAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const id = localStorage.getItem('id');
                ('Stored ID:', id); // Debug log 1

                if (!id) {
                    ('No ID found in localStorage'); // Debug log 2
                    setLoading(false);
                    return;
                }

                ('Fetching user data...'); // Debug log 3
                const response = await fetch('http://localhost:4000/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                ('API Response:', data); // Debug log 4

                if (!data.users) {
                    ('No users array in response'); // Debug log 5
                    setError('Invalid data format from API');
                    setLoading(false);
                    return;
                }

                const foundUser = data.users.find(u => {
                    ('Comparing:', u.id, id); // Debug log 6
                    return u.id.toString() === id.toString(); // Convert both to strings for comparison
                });

                setUser(foundUser || null);
                setLoading(false);

            } catch (error) {
                console.error('Error in fetchUserData:', error); // Debug log 8
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUserData();

        // Cleanup function
        return () => {
            setUser(null);
            setLoading(true);
            setError(null);
        };
    }, []); // Empty dependency array means this runs once on mount

    const handleLogout = async (e) => {
        e.preventDefault();
        const result = await logout();

        if (!result.success) {
            setError(result.error || 'Failed to login');
        }
    };

    // Debug render log
    ('Render State:', { user, loading, error });

    if (loading) {
        return (
            <div className={styles.container}>
                <Link href='/'>
                    <Image src={senaiLogo} alt="logo" className={styles.logo} />
                </Link>
                <div className={styles.buttons}>
                    <p>Carregando...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <Link href='/'>
                    <Image src={senaiLogo} alt="logo" className={styles.logo} />
                </Link>
                <div className={styles.buttons}>
                    <p>Erro: {error}</p>
                </div>
                <CiLogout className={styles.logout} onClick={handleLogout} />
            </div>
        );
    }

    if (user) {
        if (user.type == 'Aluno') {
            return (
                <div className={styles.container}>
                    <Link href='/'>
                        <Image src={senaiLogo} alt="logo" className={styles.logo} />
                    </Link>
                    <div className={styles.buttons}>
                        <p className={styles.welcome}>Seja bem-vindo <strong>{user.name}</strong></p>
                        <Button className={styles.buttonRegister} variant="primary">
                            <Link href='/Vaga'>
                                <p className={styles.buttonTxt}>Vagas</p>
                            </Link>
                        </Button>
                        <CiLogout className={styles.logout} onClick={handleLogout} />
                    </div>
                </div>
            )
        }

        if (user.type == 'Administrador') {
            return (
                <div className={styles.container}>
                    <Link href='/'>
                        <Image src={senaiLogo} alt="logo" className={styles.logo} />
                    </Link>
                    <div className={styles.buttons}>
                        <p className={styles.welcome}>Seja bem-vindo <strong>{user.name}</strong></p>
                        <Button className={styles.buttonRegister} variant="primary">
                            <Link href='/Conta'>
                                <p className={styles.buttonTxt}>Cadastros</p>
                            </Link>
                        </Button>
                        <Button className={styles.buttonRegister} variant="primary">
                            <Link href='/CadastroVagas'>
                                <p className={styles.buttonTxt}>Gerenciamento</p>
                            </Link>
                        </Button>
                        <CiLogout className={styles.logout} onClick={handleLogout} />
                    </div>
                </div>
            )
        }
    }

    // Default return for not logged in state
    return (
        <div className={styles.container}>
            <Link href='/'>
                <Image src={senaiLogo} alt="logo" className={styles.logo} />
            </Link>
            <div className={styles.buttons}>
                <Button className={styles.buttonRegister1} variant="primary">
                    <Link href='/Cadastro'>
                        <p className={styles.buttonTxt}>Cadastrar-se</p>
                    </Link>
                </Button>

                <Link href='/Login' color="danger" variant="outlined">
                    <Button className={styles.buttonLogin}>
                        <p className={styles.buttonTxt}>Login</p>
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Header;