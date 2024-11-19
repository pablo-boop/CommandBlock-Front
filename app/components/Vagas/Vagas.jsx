import styles from "./styles.module.css";
import { useRouter } from 'next/navigation';
import { Card } from 'antd';

const Vagas = ({ text, title, creation_time, expiration_time, type, id }) => {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/Candidato?id=${id}`);
    };

    const formatDate = (dateString) => {
        // Cria um objeto Date a partir da string
        const date = new Date(dateString);
        
        // Pega os componentes da data
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Mês começa do 0
        const year = date.getUTCFullYear();
        
        // Retorna a data formatada
        return `${day}-${month}-${year}`;
    }

    return (
            <Card
                onClick={handleClick}
                title={title}
                style={{
                    width: '100%'
                }}
            >
                <p className={styles.subTitle}>Tipo: <p className={styles.text}>{type}</p></p>
                <p className={styles.subTitle}>Data de Criação: <p className={styles.text}>{formatDate(creation_time)}</p></p>
                <p className={styles.subTitle}>Data de Expiração: <p className={styles.text}>{formatDate(expiration_time)}</p></p>
            </Card>
    )
}

export default Vagas;