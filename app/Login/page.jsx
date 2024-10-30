"use client"
import styles from "./login.module.css"
import Link from 'next/link';
import { FiUser, FiLock, FiArrowLeft } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {

    //input
    const [email, setEmail] = useState('');  // Corrigido
    const [password, setPassword] = useState('');  // Corrigido
    const router = useRouter();

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
        alert(msg)
        messageApi.open({
            type: 'error',
            content: msg,
        });
    };

    const login = async () => {
        if (email === '' || password === '') {
            alert("erro")
            error("Preencha todos os campos!");
        } else {
            try {
                const response = await fetch(`http://localhost:7000/login`, {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                    }),
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    })
                });

                const data = await response.json();

                if (data.token) {
                    // Armazene o token no localStorage
                    localStorage.setItem('token', data.token);
                }

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

                //const responseData = await response.json();
                clearInputs();
                alert(data.message)
                alert(data.token)
                success(data.message);
                router.push('/Candidato')

            } catch (err) {
                console.error(err);
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
