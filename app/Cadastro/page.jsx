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
import { useState } from "react";

const Cadastro = () => {

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
    
    // Requisição POST users
    const handleSubmit = async () => {
        if (name === "" || birthdate === "" || cpf === "" || email === "" || password === "" || course === "") {
            error("Preencha todos os campos!");
        } else {
            try {
                const response = await fetch(`http://localhost:4000/users`, {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        "ngrok-skip-browser-warning": "69420",
                    }),
                    body: JSON.stringify({
                        name: name,
                        birthdate: birthdate,
                        cpf: cpf,
                        email: email,
                        password: password,
                        course: course,
                        type: "Aluno"
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
                clearInputs()
                success(responseData.message);
    
                // Redireciona para a página de Login
                setTimeout(() => {
                    window.location.href = '/Login';
                }, 2000);
    
            } catch (err) {
                console.error(err);
                error(err.message); // Exibe apenas a mensagem de erro
            }
        }
    };

    return (
        <div className={styles.cadastro}>
            {contextHolder}
            <div className={styles.card}>
                <div className={styles.imagem}>
                    <a href="/">
                        <FiArrowLeft className={styles.arrow} />
                    </a>
                    <div className={styles.img}>
                    <img  src={'/cadastro.svg'} alt="Cadastro" />
                    </div>
                </div>

                <div className={styles.forms}>
                    <h2 className={styles.title}> Seja Bem-Vindo</h2>
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
