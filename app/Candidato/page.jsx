import Header from '../components/Header/Header';
import styles from './candidato.module.css';
import { FiUser, FiLock, FiMail } from "react-icons/fi";
import Link from 'next/link';

const Candidato = () => {
    return (
        <div className={styles.container}>
            <Header />
            <h2 className={styles.tituloVaga}>Vaga no SENAI</h2>
            <img src="./candidatoImage.png" className={styles.image} />
            <h2 className={styles.detalhesVaga}>Sobre a vaga</h2>
            <p className={styles.explicacaoVaga}>Para manter a qualidade de seus processos, produtos e garantir o seu crescimento,
                o SENAI investe constantemente no aprimoramento de seus colaboradores. Por meio de programas
                de capacitação e qualificação, fortalecemos as competências organizacionais necessárias em um
                ambiente de mudanças e constantes desafios. O Investimento na formação das lideranças,
                acreditando em pessoas preparadas é fundamental para qualquer empresa. </p>


            <h2 className={styles.tituloEstagio}>Estágio</h2>
            <img src="./candidatoImage.png" className={styles.image} />
            <p className={styles.explicacao}>Para manter a qualidade de seus processos, produtos e garantir o seu crescimento,
                o SENAI investe constantemente no aprimoramento de seus colaboradores. Por meio de programas
                de capacitação e qualificação, fortalecemos as competências organizacionais necessárias em um
                ambiente de mudanças e constantes desafios. O Investimento na formação das lideranças,
                acreditando em pessoas preparadas é fundamental para qualquer empresa. </p>

            <h2 className={styles.tituloEfetivo}>Efetivo</h2>
            <img src="./candidatoImage.png" className={styles.image} />
            <p className={styles.explicacao}>Para manter a qualidade de seus processos, produtos e garantir o seu crescimento,
                o SENAI investe constantemente no aprimoramento de seus colaboradores. Por meio de programas
                de capacitação e qualificação, fortalecemos as competências organizacionais necessárias em um
                ambiente de mudanças e constantes desafios. O Investimento na formação das lideranças,
                acreditando em pessoas preparadas é fundamental para qualquer empresa. </p>


            <div className={styles.formsContainer}>
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
        </div>
    );
}

export default Candidato;