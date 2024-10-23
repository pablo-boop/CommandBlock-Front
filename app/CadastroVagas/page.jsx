"use client"
import styles from "./cadastrovagas.module.css";
import Header from "../components/Header/Header";
import Vagas from "../components/Vagas/Vagas";

import { DatePicker } from 'antd';
import { message, Space } from 'antd';
import { useState, useEffect, useCallback } from "react";

const cadastrovagas = () => {
    //Vacancies properties
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [creationTime, setCreationTime] = useState("");
    const [expirationTime, setExpirationTime] = useState("");
    const [type, setType] = useState("");
    //Companies properties
    const [companyName, setCompanyName] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [companyCnpj, setCompanyCnpj] = useState("");
    const [companyPhone, setCompanyPhone] = useState("");
    //Messages Pop Up
    const [messageApi, contextHolder] = message.useMessage();
    const [response, setResponse] = useState("");
    const [vacancies, setVacancies] = useState([]);
    
    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                const response = await fetch(`http://10.88.199.225:4000/vacancies`, {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        "ngrok-skip-browser-warning": "69420",
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

                if (responseData.vacancies.length === 0) {
                    setResponse("Não há vagas disponíveis no momento.");
                } else {
                    setVacancies(responseData.vacancies);
                }

            } catch (err) {
                console.error(err);
                error(err.message);
            }
        }
        fetchVacancies();
    }, [vacancies])

    const onChangeCreation = (date, dateString) => {
        const formattedDate = dateString.split('-').reverse().join('-');
        setCreationTime(formattedDate);
    };

    const onChangeExpiration = (date, dateString) => {
        const formattedDate = dateString.split('-').reverse().join('-');
        setExpirationTime(formattedDate);
    };

    //Formatação da data
    const maskDate = (dateString) => {
        const dateParts = dateString.split('-');

        if (dateParts.length !== 3 || !/^\d{4}$/.test(dateParts[2])) {
            return dateString; // Retorna o valor original se não for um formato válido
        }

        const day = dateParts[0].padStart(2, '0');
        const month = dateParts[1].padStart(2, '0');

        return `${day}/${month}/${dateParts[2]}`;
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

    const clearInputs = () => {
        setName("");
        setDescription("");
        setCreationTime("");
        setExpirationTime("");
        setType("");
        setCompanyName("");
        setCompanyCnpj("");
        setCompanyPhone("");
        setCompanyEmail("");
    }

    const postVacancy = useCallback(async (data) => {
        try {
            const response = await fetch(`http://10.88.199.225:4000/vacancies`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                }),
                body: JSON.stringify(data)
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
            return responseData;
        } catch (err) {
            console.error(err);
            error(err.message);
            return null;
        }
    }, []);

    const postCompany = useCallback(async (data) => {
        try {
            const response = await fetch(`http://10.88.199.225:4000/companies`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                }),
                body: JSON.stringify(data)
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
            return responseData;
        } catch (err) {
            console.error(err);
            error(err.message);
            return null;
        }
    }, []);

    const handleSubmit = async () => {
        if (name === "" || description === "" || creationTime === "" || expirationTime === "" || type === "" || companyName === "" || companyEmail === "" || companyCnpj === "" || companyPhone === "") {
            error("Preencha todos os campos!");
        } else {

            const vacancyResult = await postVacancy({
                name: name,
                description: description,
                creation_time: creationTime,
                expiration_time: expirationTime,
                type: type,
            });

            const companyResult = await postCompany({
                name: companyName,
                cnpj: companyCnpj,
                email: companyEmail,
                phone: companyPhone,
            });

        }
        console.log({
            message: 'Vacancies',
            name: name,
            description: description,
            creationTime: creationTime,
            expirationTime: expirationTime,
            type: type,
        });
        console.log({
            message: 'Companies',
            companyName: companyName,
            companyEmail: companyEmail,
            companyCnpj: companyCnpj,
            companyPhone: companyPhone,
        });
    };

    return (
        <>
            <Header />
            {contextHolder}
            <div className={styles.container}>
                <form className={styles.forms}>
                    <h3 className={styles.h3}>Cadastrar Nova Vaga</h3>

                    <div className={styles.inputarea}>
                        <input type="text"
                            name="nome da vaga"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nome da Vaga"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputarea}>
                        <input type="text"
                            name="empresa"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Empresa"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.form}>

                        <div className={styles.inputarea}>
                            <label className={styles.label}>
                                <input type="text"
                                    name="cnpj"
                                    value={companyCnpj}
                                    onChange={(e) => setCompanyCnpj(e.target.value)}
                                    placeholder="CNPJ"
                                    className={styles.input2}
                                />
                            </label>
                        </div>

                        <div className={styles.inputarea}>
                            <label className={styles.label}>
                                <input type="number"
                                    name="telefone"
                                    value={companyPhone}
                                    onChange={(e) => setCompanyPhone(e.target.value)}
                                    placeholder="Telefone"
                                    className={styles.input3}
                                />
                            </label>
                        </div>
                    </div>

                    <div className={styles.inputarea}>
                        <input type="email"
                            name="email"
                            value={companyEmail}
                            onChange={(e) => setCompanyEmail(e.target.value)}
                            placeholder="Email"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputarea}>
                        <DatePicker
                            className={styles.datePicker}
                            onChange={onChangeCreation} // Update here
                            placeholder="Selecionar data de Criação"
                        />
                    </div>

                    <div className={styles.inputarea}>
                        <DatePicker
                            className={styles.datePicker}
                            onChange={onChangeExpiration} // Update here
                            placeholder="Selecionar data de Expiração"
                        />
                    </div>

                    <div className={styles.inputarea}>
                        <input type="text"
                            name="tipoVaga"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            placeholder="Tipo da Vaga"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputarea}>
                        <textarea
                            name="descricao"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descrição da Vaga"
                            className={styles.textarea}
                        />
                    </div>

                    <a href="/EditarEmpresas">
                        <p className={styles.empresas}>* Empresas</p>
                    </a>

                    <div className={styles.inputarea}>
                        <button className={styles.button} type="submit" onClick={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}>Cadastrar</button>
                    </div>

                </form>

                <div className={styles.vagacontainer}>
                    <h3 className={styles.h3}>Vagas</h3>
                    <div className={styles.vagaitem}>

                        <div className={styles.vaga}>
                            {
                                vacancies.length === 0 ? (
                                    <p className={styles.text}>Nenhuma vaga cadastrada</p>
                                ) : (
                                    vacancies.map((vacancy, index) => {
                                        return <Vagas key={index} title={vacancy.name} text={vacancy.description} creation_time={vacancy.creation_time} expiration_time={vacancy.expiration_time} type={vacancy.type} />
                                    })
                                )
                            }
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default cadastrovagas