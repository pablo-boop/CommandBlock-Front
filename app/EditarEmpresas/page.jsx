"use client"
import styles from "./editarempresas.module.css";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import {FiArrowLeft } from "react-icons/fi";
import { CiPhone } from "react-icons/ci";

const cadastro = () => {
    return (
        <>
        <div className={styles.cadastro}>
            <div className={styles.card}>

                <div className={styles.imagem}>
                <FiArrowLeft className={styles.arrow} />
                    <img src={'/cadastro.svg'}></img>
                </div>

                <div className={styles.forms}>
                    <h1 className={styles.title}> Editar Empresas</h1>
                    <p className={styles.text}>Por favor, Preencha o campo de nome e atualize os outros dados</p>
                    
                    <div className={styles.campos}>
                    <FaRegUser className={styles.icone} />
                    <input type="text" placeholder="Nome da Empesa" required className={styles.inputs} />
                    </div>

                    <div className={styles.campos}>
                    <MdOutlineEmail className={styles.icone} />
                    <input type="email" placeholder="E-mail" required className={styles.inputs} />
                    </div>

                    <div className={styles.campos}>
                    <IoLockClosedOutline className={styles.icone} />
                    <input type="password" placeholder="CNPJ" required className={styles.inputs} />
                    </div>

                    <div className={styles.campos}>
                    <CiPhone className={styles.icone} />
                    <input type="password" placeholder="Telefone" required className={styles.inputs} />
                    </div>

                    <button className={styles.button} type="submit">Cadastrar</button>
                    
                </div>

            </div>
        </div>
        </>
    )
}

export default cadastro;