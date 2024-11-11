"use client"
import styles from "./login.module.css"
import Link from 'next/link';
import { FiUser, FiLock, FiArrowLeft } from "react-icons/fi";
import { message, Space } from 'antd';
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {

    //input
    const [email, setEmail] = useState('');  // Corrigido
    const [password, setPassword] = useState('');  // Corrigido
    const [messageApi, contextHolder] = message.useMessage();
    const [errorLogin, setErrorLogin] = useState('');
    const { login } = useAuth();


    const clearInputs = () => {
        setEmail("");
        setPassword("");
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorLogin('');
        console.log(email, password);

        const result = await login(email, password);

        if (!result.success) {
            setErrorLogin(result.error || 'Failed to login');
        }
    };

    return (  // JSX deve ser retornado diretamente no componente React
        <div className={styles.background}>
            <div className={styles.container}>
                <a href="/">
                    <FiArrowLeft className={styles.arrow} />
                </a>
                <div className={styles.left}>
                    <h1 className={styles.title}>Bem-vindo de volta!</h1>
                    <p className={styles.txt}>Por favor, faça o login antes de continuar</p>
                    <div className={styles.inputs}>
                        <div className={styles.inputWithIcon}>
                            <FiUser className={styles.icon} />
                            <input
                                value={email}
                                onChange={e => setEmail(e.target.value)}  // Corrigido para atualizar o email
                                className={styles.input}
                                required
                                type="text"
                                placeholder="E-mail"
                            />
                        </div>
                        <div className={styles.inputWithIcon}>
                            <FiLock className={styles.icon} />
                            <input
                                value={password}
                                onChange={e => setPassword(e.target.value)}  // Corrigido para atualizar a senha
                                className={styles.input}
                                required
                                type="password"  // Corrigido para senha
                                placeholder="Senha"
                            />
                        </div>
                    </div>
                    <div className={styles.actionArea}>
                        <button className={styles.buttonRegister} onClick={handleSubmit} >
                            <p className={styles.buttonTxt}>Entrar</p>
                        </button>
                        <p className={styles.txt}>Caso ainda não tenha um login,
                            <Link href="./Cadastro" className={styles.register}>Cadastre-se</Link>
                        </p>
                    </div>
                </div>
                <div className={styles.right}>
                    <img src={'/cadastro.svg'} alt="img" className={styles.img} />
                </div>
            </div>
        </div>
    );
}

export default Login;
