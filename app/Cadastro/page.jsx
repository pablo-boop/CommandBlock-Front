"use client"
import styles from "./cadastro.module.css";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";

const cadastro = () => {
    return (
        <>
        <div className={styles.cadastro}>
            <div className={styles.card}>

                <div className={styles.imagem}>
                    <img src={'/cadastro.svg'}></img>
                    <div className={styles.placeholder}></div>
                </div>

                <div className={styles.forms}>
                    <h1 className={styles.title}> Seja Bem-Vindo</h1>
                    <p className={styles.text}>Por favor, faça o cadastro antes de continuar</p>
                    
                    <div className={styles.campos}>
                    <FaRegUser className={styles.icone} />
                    <input type="text" placeholder="Nome do Usuário" required className={styles.inputs} />
                    </div>

                    <div className={styles.campos}>
                    <MdOutlineEmail className={styles.icone} />
                    <input type="email" placeholder="E-mail" required className={styles.inputs} />
                    </div>

                    <div className={styles.campos}>
                    <IoLockClosedOutline className={styles.icone} />
                    <input type="password" placeholder="Senha" required className={styles.inputs} />
                    </div>

                    <p className={styles.curso}>Qual curso você está atualmente fazendo?</p>

                    <div className={styles.opcoes}>
                    <label className={styles.inputlabel}>
                    <input type="radio" name="curso" value="Desenvolvimento de sistemas" className={styles.input} />
                    Desenvolvimento de sistemas
                    </label>

                    <label className={styles.inputlabel}>
                    <input type="radio" name="curso" value="Técnico de fabricação mecanica" className={styles.input} />
                    Técnico de fabricação mecanica
                    </label>

                    <label className={styles.inputlabel}>
                    <input type="radio" name="curso" value="Técnico de eletroeletronica" className={styles.input} />
                    Técnico de eletroeletronica
                    </label>
                    </div>

                    <p className={styles.logintext}>Já tem um cadastro?  <a href="/Login" className={styles.login}>Faça o Login</a> </p>

                </div>

            </div>
        </div>
        </>
    )
}

export default cadastro;