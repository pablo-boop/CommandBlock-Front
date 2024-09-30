import Header from '../components/Header/Header';
import styles from './candidato.module.css';
import { FiUser, FiLock, FiMail } from "react-icons/fi";

const Candidato = () => {
    return (
        <div className={styles.container}>
            <Header />
            <h2 className={styles.titulo}>Vaga no SENAI</h2>
            <img src="./candidatoImage.png" className={styles.image} />
            <div className={styles.canto}>
                <p className={styles.textin}>Candidate-se à vaga</p>

                <div className={styles.inputIcon}>
                    <FiUser className={styles.icon} />
                    <input className={styles.inputs} type="text" placeholder="Nome do Usuário"></input>
                </div>

                <div className={styles.inputIcon}>
                    <FiMail className={styles.icon} />
                    <input className={styles.inputs} type="text" placeholder="Email" />
                </div>

                <div className={styles.inputIcon}>
                    <FiLock className={styles.icon} />
                    <input className={styles.inputs} type="text" placeholder="CPF" />
                </div>

                <div>
                    <button className={styles.registerPdf} >
                        <p className={styles.buttonCurriculo}>Currículo - PDF</p>
                    </button>
                </div>

                <div>
                    <button className={styles.registerEnviar} >
                        <p className={styles.buttonEnviar}>Enviar</p>
                    </button>
                </div>

            </div>

        </div>
    );
}

export default Candidato;
