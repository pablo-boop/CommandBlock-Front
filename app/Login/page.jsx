"use client"
import styles from "./login.module.css"

import { FiUser, FiLock, FiArrowLeft } from "react-icons/fi";

const Login = () => {
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <FiArrowLeft className={styles.arrow} />
                <div className={styles.left}>
                    <h1>Bem-vindo de volta!</h1>
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
                        <p className={styles.txt}>Caso ainda não tenha um login, <a className={styles.register}>Cadastre-se</a></p>
                        <button className={styles.buttonRegister} >
                            <p className={styles.buttonTxt}>Cadastrar-se</p>
                        </button>
                    </div>
                </div>
                <div className={styles.right}>
                    <img src={'/cadastro.svg'} alt="img" className={styles.img}/>
                </div>
            </div>
        </div>
    )
}
export default Login