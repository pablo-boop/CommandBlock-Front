import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { Card } from "antd";

const Vagas = ({ title, creation_time, expiration_time, type, id }) => {
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getUTCDate().toString().padStart(2, "0");
        const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
        const year = date.getUTCFullYear();
        return `${day}-${month}-${year}`;
    };

    const router = useRouter();
    const handleClick = () => {
        router.push(`/Candidato?id=${id}`);
        console.log(id);
    };

    return (
        <Card
            onClick={() => handleClick()} // Passa os detalhes da vaga
            title={title}
            style={{
                width: "100%",
            }}
        >
            <div className={styles.texts}>
                <>
                    <p className={styles.subTitle}>Tipo: </p>
                    <p className={styles.text}>{type}</p>
                </>
                <>
                    <p className={styles.subTitle}>Data de Criação: </p>
                    <p className={styles.text}>{formatDate(creation_time)}</p>
                </>
                <>
                    <p className={styles.subTitle}>Data de Expiração: </p>
                    <p className={styles.text}>{formatDate(expiration_time)}</p>
                </>
            </div>
        </Card>
    );
};

export default Vagas;
