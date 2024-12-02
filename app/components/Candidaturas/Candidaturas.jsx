import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { Card } from "antd";

const Vagas = ({ onClick, id_student, id_vacancy, id_company }) => {
    
    const [user, setUser] = useState("");
    const [vacancy, setVacancy] = useState("");
    const [company, setCompany] = useState("");

    //Formatação da data
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getUTCDate().toString().padStart(2, "0");
        const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
        const year = date.getUTCFullYear();
        return `${day}-${month}-${year}`;
    };

    //Find user name
    useEffect(() => {
        const fetchCandidacies = async () => {
            try {
                //Usuário
                const reponseUser = await fetch(`http://192.168.1.9:4000/users/${id_student}`, {
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
                setUser(responseData.user.name);

            } catch (err) {
                console.error(err);
                error(err.message);
            }
        };
        fetchCandidacies();
    }, []);


    return (
        <Card
            onClick={() => onClick({ id_student, id_vacancy, id_company, iniciated, curriculumAvaliation, documentsManagement, done, hired, description })} // Passa os detalhes da vaga
            title={title}
            style={{
                width: "100%",
            }}
        >
            <div className={styles.texts}>
                <>
                    <p className={styles.subTitle}>Nome do Estudante: </p>
                    <p className={styles.text}>{name_student}</p>
                </>
            </div>
        </Card>
    );
};

export default Vagas;
