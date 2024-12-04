//Styles
import styles from "./styles.module.css";
import { Card } from "antd";
import { FaTrashAlt } from "react-icons/fa";
//Hooks
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Candidacies = ({ student, vacancy, company, description, creation_time, candicacy_id, deleteCandidacy }) => {

    //States
    const [userName, setUserName] = useState("");
    const [vacancyName, setVacancyName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const candidacyId = candicacy_id;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getUTCDate().toString().padStart(2, "0");
        const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
        const year = date.getUTCFullYear();
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        const fetchUser = async () => {
            //Usuário
            const response = await fetch(`http://localhost:4000/users/${student}`, {
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
            setUserName(responseData.user.name)
        }
        const fetchVacancy = async () => {
            //Vagas
            const response = await fetch(`http://localhost:4000/vacancies/${vacancy}`, {
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
            setVacancyName(responseData.vacancy.name)
        }
        const fetchCompany = async () => {
            //Company
            const response = await fetch(`http://localhost:4000/companies/${company}`, {
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
            setCompanyName(responseData.company.name)
        }

        fetchUser();
        fetchVacancy();
        fetchCompany();
    }, [])

    return (
        <Card
            title={""}
            style={{
                width: "100%",
            }}
        >
            <div className={styles.texts}>
                <div className={styles.top}>
                    <div className={styles.topTexts}>
                        <p className={styles.subTitle}>Vaga: </p>
                        <p className={styles.text}>{vacancyName}</p>
                    </div>
                    <div className={styles.topTexts}>
                        <p className={styles.subTitle}>Empressa: </p>
                        <p className={styles.text}>{companyName}</p>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <>
                        <div className={styles.bottomTexts}>
                            <p className={styles.subTitle}>Data de Criação: </p>
                            <p className={styles.text}>{formatDate(creation_time)}</p>
                        </div>
                        <div className={styles.bottomTexts}>
                            <p className={styles.subTitle}>Description: </p>
                            <p className={styles.text}>{description}</p>
                        </div>
                    </>
                    <div className={styles.icons}>
                        <FaTrashAlt className={styles.icon} onClick={() => deleteCandidacy(candidacyId)}/>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default Candidacies;
