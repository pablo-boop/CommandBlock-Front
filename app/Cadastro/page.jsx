"use client"
// Front - Style and Components
import styles from "./cadastro.module.css";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { FiArrowLeft } from "react-icons/fi";
// ANTD
import { DatePicker } from 'antd';
import { message, Space } from 'antd';
// Back - API and Hooks
import axios from "axios";
import { useState } from "react";

const Cadastro = () => {

    //Response
    const [response, setResponse] = useState("");
    //Inputs
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [course, setCourse] = useState("");
    //Message success and error
    const [messageApi, contextHolder] = message.useMessage();

    const clearInputs = () => {
        setName("");
        setBirthdate("");
        setCpf("");
        setEmail("");
        setPassword("");
        setCourse("");
    }

    const onChange = (date, dateString) => {
        const formattedDate = dateString.split('-').reverse().join('-');
        setBirthdate(formattedDate);
    };

    //Requisição POST users
    const handleSubmit = async () => {
        if (name === "" || birthdate === "" || cpf === "" || email === "" || password === "" || course === "") {
            error("Preencha todos os campos!")
        } else {
            try {
                const response = await axios.post('https://009e-201-63-78-210.ngrok-free.app/users', { name, birthdate, email, cpf, course, password, type: "Aluno" });
                if (response.message == "Usuário cadastrado com sucesso!") {
                    success(response.message);
                    console.log(response);
                } else {
                    error(response.message);
                }

            } catch (error) {
                console.error(error);
            }
        }
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

    return (
        <div className={styles.cadastro}>
            {contextHolder}
            <div className={styles.card}>
                <div className={styles.imagem}>
                    <FiArrowLeft className={styles.arrow} />
                    <img src={'/cadastro.svg'} alt="Cadastro" />
                </div>

                <div className={styles.forms}>
                    <h1 className={styles.title}> Seja Bem-Vindo</h1>
                    <p className={styles.text}>Por favor, faça o cadastro antes de continuar</p>

                    <div className={styles.campos}>
                        <FaRegUser className={styles.icone} />
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            type="text"
                            placeholder="Nome do Usuário"
                            required
                            className={styles.inputs}
                        />
                    </div>

                    <div className={styles.campos}>
                        <IoLockClosedOutline className={styles.icone} />
                        <input
                            value={cpf}
                            onChange={e => setCpf(e.target.value)}
                            type="text" // Changed to text for CPF validation
                            placeholder="CPF"
                            required
                            className={styles.inputs}
                        />
                    </div>

                    <div className={styles.campos}>
                        <MdOutlineEmail className={styles.icone} />
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            placeholder="E-mail"
                            required
                            className={styles.inputs}
                        />
                    </div>

                    <div className={styles.campos}>
                        <IoLockClosedOutline className={styles.icone} />
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            placeholder="Senha"
                            required
                            className={styles.inputs}
                        />
                    </div>

                    <div>
                        <DatePicker
                            className={styles.datePicker}
                            onChange={onChange} // Update here
                            placeholder="Selecionar data de Nascimento"
                        />
                    </div>

                    <p className={styles.curso}>Qual curso você está atualmente fazendo?</p>

                    <div className={styles.opcoes}>
                        <label className={styles.inputlabel}>
                            <input
                                onChange={e => setCourse(e.target.value)}
                                type="radio"
                                name="curso"
                                value="Desenvolvimento de sistemas"
                                className={styles.input}
                            />
                            Desenvolvimento de sistemas
                        </label>

                        <label className={styles.inputlabel}>
                            <input
                                onChange={e => setCourse(e.target.value)}
                                type="radio"
                                name="curso"
                                value="Técnico de fabricação mecanica"
                                className={styles.input}
                            />
                            Técnico de fabricação mecanica
                        </label>

                        <label className={styles.inputlabel}>
                            <input
                                onChange={e => setCourse(e.target.value)}
                                type="radio"
                                name="curso"
                                value="Técnico de eletroeletronica"
                                className={styles.input}
                            />
                            Técnico de eletroeletronica
                        </label>
                    </div>
                    <Space>
                        <button className={styles.buttonRegister} onClick={handleSubmit}>
                            <p className={styles.buttonTxt}>Cadastrar-se</p>
                        </button>

                    </Space>

                    <p className={styles.logintext}>
                        Já tem um cadastro? <a href="/Login" className={styles.login}>Faça o Login</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Cadastro;
