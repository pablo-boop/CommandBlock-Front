"use client"
import styles from "./conta.module.css";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import {FiArrowLeft, FiKey, FiUsers } from "react-icons/fi";
import { CiCalendar } from "react-icons/ci";

const conta = () => {
    return (
        <>
        <div className={styles.cadastro}>
            <div className={styles.card}>

                <div className={styles.imagem}>
                <FiArrowLeft className={styles.arrow} />
                </div>

                <div className={styles.forms}>

                <div className={styles.esquerdo}>
                    <h1 className={styles.title}>Criação de Contas</h1>
                    
                    <div className={styles.campos}>
                    <FaRegUser className={styles.icone} />
                    <input type="text" placeholder="Nome" required className={styles.inputs} />
                    </div>

                    <div className={styles.campos}>
                    <CiCalendar className={styles.icone} />
                    <input type="date" placeholder="Aniversário" required className={styles.inputs} />
                    </div>

                    <div className={styles.campos}>
                    <MdOutlineEmail className={styles.icone} />
                    <input type="email" placeholder="E-mail" required className={styles.inputs} />
                    </div>

                    <div className={styles.campos}>
                    <IoLockClosedOutline className={styles.icone} />
                    <input type="number" placeholder="CPF" required className={styles.inputs} />
                    </div>

                    <div className={styles.campos}>
                    <FiKey className={styles.icone} />
                    <input type="password" placeholder="Senha" required className={styles.inputs} />
                    </div>
                    </div>    
                </div>

                <div className={styles.direito}>

                 
                    <h3 className={styles.curso}>Qual curso você deseja atribuir à este usuário?</h3>

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

                    
                    <label className={styles.inputlabel}>
                    <input type="radio" name="curso" value="Sem curso" className={styles.input} />
                    Sem curso
                    </label>

                    <FiUsers className={styles.icone} />
                    <select type="text" placeholder="Tipo de Conta" required className={styles.tipo}>
                        <option>Tipo de Conta</option>
                        <option>Administrador</option>
                        <option>Usuário</option>
                    </select>
                    </div>

                    <button className={styles.buttonRegister} >
                            <p className={styles.buttonTxt}>Criar</p>
                    </button>

                </div>    

            </div>
        </div>
        </>
    )
}

export default conta;