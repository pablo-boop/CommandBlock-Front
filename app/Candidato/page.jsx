"use client"
import Header from '../components/Header/Header';
import styles from './candidato.module.css';
import { FiUser, FiLock, FiMail } from "react-icons/fi";
import Link from 'next/link';
import { useState } from 'react';
const Candidato = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setcpf] = useState('');
    
    const register = async ()=>{
        try {
            const response = await fetch.post('http://10.88.199.225:4000/condidatura/candidacies/')
        } catch (error) {
            
        }
    }

    return (
        <div className={styles.container}>
            <Header />

            <div className={styles.allTexto}>
                <h2 className={styles.tituloVaga}>Vaga no SENAI</h2>
                <img src="./candidatoImage.png" className={styles.image} />
                <h2 className={styles.detalhesVaga}>Sobre a vaga</h2>
                <p className={styles.explicacaoVaga}>Para manter a qualidade de seus processos, produtos e garantir o seu crescimento,
                    o SENAI investe constantemente no aprimoramento de seus colaboradores. Por meio de programas
                    de capacitação e qualificação, fortalecemos as competências organizacionais necessárias em um
                    ambiente de mudanças e constantes desafios. O Investimento na formação das lideranças,
                    acreditando em pessoas preparadas é fundamental para qualquer empresa. </p>


                <h2 className={styles.tituloEstagio}>Estágio</h2>
                <img src="./estagio.jpg" className={styles.image} />
                <p className={styles.explicacaoVaga}>O estágio no SENAI é uma oportunidade única para os estudantes aplicarem seus conhecimentos em um ambiente profissional dinâmico e desafiador.
                    Oferece desenvolvimento de habilidades práticas, além de contribuir para a formação técnica e profissional. Com foco no aprendizado contínuo, os estagiários têm a chance de
                    trabalhar em projetos relevantes, sendo orientados por profissionais qualificados. O SENAI incentiva a inovação e a excelência, preparando jovens para o mercado de trabalho.
                </p>

                <h2 className={styles.tituloEfetivo}>Efetivação</h2>
                <img src="./efetivo.png" className={styles.image} />
                <p className={styles.explicacaoVaga}>A efetivação no SENAI representa o reconhecimento do desempenho e dedicação de profissionais que demonstram excelência em suas funções.
                    Esse processo valoriza colaboradores que se destacam por seu comprometimento com a qualidade do ensino e com o desenvolvimento de competências técnicas dos alunos.
                    A efetivação garante estabilidade e continuidade na prestação de serviços, fortalecendo o crescimento do mercado de trabalho.</p>
            </div>

            <div className={styles.formsContainer}>
                <form className={styles.canto} onSubmit={register}>
                    <p className={styles.textin}>Candidate-se à vaga</p>

                    <div className={styles.inputIcon}>
                        <FiUser className={styles.icon} />
                        <input
                        className={styles.inputs}
                        value={nome}
                        onChange={(e)=> setNome(e.target.value)}
                        type="text"
                        placeholder="Nome do Usuário" />
                    </div>

                    <div className={styles.inputIcon}>
                        <FiMail className={styles.icon} />
                        <input
                        className={styles.inputs}
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        type="email"
                        placeholder="E-mail" />
                    </div>

                    <div className={styles.inputIcon}>
                        <FiLock className={styles.icon} />
                        <input
                        className={styles.inputs}
                        value={cpf}
                        onChange={(e)=> setcpf(e.target.value)}
                        type="text"
                        placeholder="CPF" />
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
                </form>
            </div>
        </div>
    );
}

export default Candidato;