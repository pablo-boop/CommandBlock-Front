"use client"

import { Space } from 'antd';
import Header from '../components/Header/Header';
import styles from './candidato.module.css';
import { FiUser, FiLock, FiMail } from "react-icons/fi";
import { useState } from "react";
import { message } from 'antd';


const Candidato = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

    const clearInputs = () => {
        setName("");
        setEmail("");
        setCpf("");
    }

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

    //Requisição POST 
    const handleSubmit = async () => {
        if (name === "" || email === "" || cpf === "") {
            error("Preencha todos os campos!");
        } else {
            try {
                const response = await fetch(`https://3a31-201-63-78-210.ngrok-free.app/users`, {
                    method: "POST",
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "69420",
                    }),
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        cpf: cpf,
                    }),
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
                clearInputs()
                success(responseData.message);

            } catch (err) {
                console.error(err);
                error(err.message); // Exibe apenas a mensagem de erro
            }
        }
    };


    return (
        <div className={styles.container}>
            {contextHolder}
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
                <p className={styles.explicacaoVaga}>O estágio no SENAI é uma oportunidade única para os estudantes aplicarem
                    conhecimentos em um ambiente profissional dinâmico e desafiador.
                    Oferece desenvolvimento de habilidades práticas, além de contribuir para a formação técnica e profissional.
                    Com foco no aprendizado contínuo, os estagiários têm a chance de
                    trabalhar em projetos relevantes, sendo orientados por profissionais qualificados.
                    O SENAI incentiva a inovação e a excelência, preparando jovens para o mercado de trabalho.
                </p>

                <h2 className={styles.tituloEfetivo}>Efetivação</h2>
                <img src="./efetivo.png" className={styles.image} />
                <p className={styles.explicacaoVaga}>A efetivação no SENAI representa o reconhecimento do desempenho e dedicação de
                    profissionais que demonstram excelência em suas funções.
                    Esse processo valoriza colaboradores que se destacam por seu comprometimento com a
                    qualidade do ensino e com o desenvolvimento de competências técnicas dos alunos.
                    A efetivação garante estabilidade e continuidade na prestação de serviços,
                    fortalecendo o crescimento do mercado de trabalho.</p>
            </div>

            <div className={styles.formsContainer}>
                <div className={styles.canto}>
                    <p className={styles.textin}>Candidate-se à vaga</p>

                    <div className={styles.inputIcon}>
                        <FiUser className={styles.icon} />
                        <input 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className={styles.inputs} 
                        type="text" 
                        placeholder="Nome do Usuário">
                        </input>
                    </div>

                    <div className={styles.inputIcon}>
                        <FiMail className={styles.icon} />
                        <input 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className={styles.inputs} 
                        type="text" 
                        placeholder="Email" />
                    </div>

                    <div className={styles.inputIcon}>
                        <FiLock className={styles.icon} />
                        <input 
                        value={cpf}
                        onChange={e => setCpf(e.target.value)}
                        required
                        className={styles.inputs} 
                        type="text" 
                        placeholder="CPF" />
                    </div>

                    <div>
                        <button className={styles.registerPdf} >
                            <p className={styles.buttonCurriculo}>Currículo - PDF</p>
                        </button>
                    </div>

                    <div>
                        <Space>
                        <button className={styles.registerEnviar} onClick={handleSubmit} >
                            <p className={styles.buttonEnviar}>Enviar</p>
                        </button>
                        </Space>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Candidato;