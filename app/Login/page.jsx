"use client"
import styles from "./login.module.css"
import Link from 'next/link';
import { FiUser, FiLock, FiArrowLeft } from "react-icons/fi";
import { useState } from "react";

const Login = () => {

    //input
    const [email, setEmail] = useState('');  // Corrigido
    const [password, setPassword] = useState('');  // Corrigido

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

    const login = async () => {
        if (email === '' || password === '') {
            error("Preencha todos os campos!");
        } else {
            try {
                const response = await fetch(`https://f550-200-231-33-146.ngrok-free.app/login`, {
                    method: 'PUT',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        "ngrok-skip-browser-warning": "69420",
                    }),
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    })
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    let errorMessage = response.statusText;

                    try {
                        const errorJson = JSON.parse(errorText);
                        errorMessage = errorJson.message;
                    } catch (e) {
                        console.error("Erro ao parsear JSON:", e);
                    }

                    throw new Error(errorMessage);
                }

                const responseData = await response.json();
                clearInputs();
                success(responseData.message);

                setTimeout(() => {
                    window.location.href = '/Home';
                }, 2000);

            } catch (err) {
                console.error(err);
                error(err.message); // Exibe apenas a mensagem de erro
            }
        }
    };

    return (  // JSX deve ser retornado diretamente no componente React
        <div className={styles.background}>
            <div className={styles.container}>
                <FiArrowLeft className={styles.arrow} />
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
                        <button className={styles.buttonRegister} onClick={login} >
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
