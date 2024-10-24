import styles from "./styles.module.css"

const Vagas = ({ text, title, creation_time, expiration_time, type }) => {

    return (
        <div>
            <div className={styles.card}>
                <div className={styles.texts}>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.text}>{text}</p>
                </div>
                <div className={styles.infos}>
                    <p className={styles.type}>{type}</p>
                    <div className={styles.times}>
                        <p className={styles.text}>Data de criação: <p className={styles.time}>{creation_time}</p></p>
                        <p className={styles.text}>Data de expiração: <p className={styles.time}>{expiration_time}</p></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vagas;