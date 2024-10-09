"use client"
import styles from "./conta.module.css";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { FiArrowLeft, FiKey, FiUsers } from "react-icons/fi";
import { CiCalendar } from "react-icons/ci";
import { useState, useEffect } from "react";

import { DatePicker } from 'antd';
import { message, Space } from 'antd';

const conta = () => {
    //Inputs
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [course, setCourse] = useState("");
    //Message success and error
    const [messageApi, contextHolder] = message.useMessage();
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

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
                const response = await fetch(`https://49ab-201-63-78-210.ngrok-free.app/users`, {
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
                        type: selectedOption
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
                <FiArrowLeft className={styles.arrow} />
                <div className={styles.leftForms}>
                    <h2 className={styles.title}>Criação de Contas</h2>
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
                </div>

                <div className={styles.rightForms}>
                    <h3 className={styles.curso}>Qual curso você deseja atribuir à este usuário?</h3>
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

                        <label className={styles.inputlabel}>
                            <input
                                onChange={e => setCourse(e.target.value)}
                                type="radio"
                                name="curso"
                                value="Sem curso"
                                className={styles.input}
                            />
                            Sem curso
                        </label>

                        <FiUsers className={styles.icone} />
                        <select
                            value={selectedOption}
                            onChange={handleOptionChange}
                            type="text"
                            placeholder="Tipo de Conta"
                            required
                            className={styles.tipo}
                        >
                            <option>Tipo de Conta</option>
                            <option>Administrador</option>
                            <option>Aluno</option>
                        </select>
                    </div>
                    <Space>
                        <button className={styles.buttonRegister} onClick={handleSubmit}>
                            <p className={styles.buttonTxt}>Cadastrar-se</p>
                        </button>
                    </Space>
                </div>
            </div>
        </div>

    )
}

export default conta;