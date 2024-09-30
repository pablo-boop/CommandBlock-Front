"use client"
import styles from "./login.module.css"
import Link from 'next/link';

import { FiUser, FiLock, FiArrowLeft } from "react-icons/fi";

const Login = () => {
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <Link href='./' className={styles.buttonArrow}>
                    <FiArrowLeft className={styles.arrow} />
                </Link>
                <div className={styles.left}>
                    <h1 className={styles.title}>Bem-vindo de volta!</h1>
                    <p className={styles.txt}>Por favor, faça o login antes de continuar</p>
                    <div className={styles.inputs}>
                        <div className={styles.inputWithIcon}>
                            <FiUser className={styles.icon} />
                            <input className={styles.input} type="text" placeholder="Nome do Usuário" />
                        </div>
                        <div className={styles.inputWithIcon}>
                            <FiLock className={styles.icon} />
                            <input className={styles.input} type="text" placeholder="Senha" />
                        </div>
                    </div>
                    <div className={styles.actionArea}>
                        <p className={styles.txt}>Caso ainda não tenha um login, <Link href='./Cadastro' className={styles.register}>Cadastre-se</Link></p>
                        <button className={styles.buttonRegister} >
                            <p className={styles.buttonTxt}>Cadastrar-se</p>
                        </button>
                    </div>
                </div>
                <div className={styles.right}>
                    <img src={'/cadastro.svg'} alt="img" className={styles.img} />
                </div>
            </div>
        </div>
    )
}
export default Login