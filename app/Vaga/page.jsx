"use client"

import styles from "./vaga.module.css"
import Vagas from "../components/Vagas/Vagas"
import Header from "../components/Header/Header"
import { useEffect, useState } from "react";
import { message } from "antd";

const Vaga = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [vacancies, setVacancies] = useState([]);
    const [response, setResponse] = useState("");

    useEffect(() => {
        const handleSubmit = async () => {
            try {
                const response = await fetch(`https://16fb-200-231-33-146.ngrok-free.app/vacancies`, {
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
                console.log(responseData);

                if (responseData.vacancies.length === 0) {
                    setResponse("Não há vagas disponíveis no momento.");
                } else {
                    setVacancies(responseData.vacancies);
                }

            } catch (err) {
                console.error(err);
                error(err.message);
            }
        };
        handleSubmit();
    }, []);

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
        <>
            {contextHolder}
            <Header />
            <div className={styles.vagacontainer}>
                <h2>Vagas</h2>
                <div className={styles.vagaitem}>
                    <div className={styles.vaga}>
                        {
                            vacancies.length === 0 ? (
                                <p>{response}</p>
                            ) : (
                                vacancies.map((vacancy, index) => (
                                    <Vagas key={index} imageURL="./cadastro.svg" text={vacancy.description} />
                                ))
                            )
                        }
                    </div>


                </div>
            </div>
        </>
    )
}

export default Vaga;