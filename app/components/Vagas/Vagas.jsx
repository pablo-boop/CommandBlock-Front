import styles from "./styles.module.css"

const Vagas = ({ imageURL, text, title }) => {
    return (
        <div>
            <div className={styles.card}>
             <img src={imageURL} alt="imagem" className={styles.imagem}></img>
             <p className={styles.texto}>{text}</p>
             </div>
        </div>
    )
}

export default Vagas;