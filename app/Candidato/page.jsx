"use client"
import Header from '../components/Header/Header';
import styles from './candidato.module.css';
import { FiUser, FiLock, FiMail } from "react-icons/fi";
import { useState } from "react";

import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;

const props = {
    name: 'file',
    multiple: false,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};


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
                const response = await fetch(`https://16fb-200-231-33-146.ngrok-free.app/users`, {
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
            <h2 className={styles.tituloVaga}>Vaga no SENAI</h2>
            <div className={styles.container}>
                <div className={styles.allTexto}>
                    <img src="./candidatoImage.png" className={styles.image} />
                    <h2 className={styles.title}>Sobre a vaga</h2>
                    <p className={styles.text}>Para manter a qualidade de seus processos, produtos e garantir o seu crescimento,
                        o SENAI investe constantemente no aprimoramento de seus colaboradores. Por meio de programas
                        de capacitação e qualificação, fortalecemos as competências organizacionais necessárias em um
                        ambiente de mudanças e constantes desafios. O Investimento na formação das lideranças,
                        acreditando em pessoas preparadas é fundamental para qualquer empresa. </p>

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

                    <h2 className={styles.title}>Estágio</h2>
                    <img src="./estagio.jpg" className={styles.image} />
                    <p className={styles.text}>O estágio no SENAI é uma oportunidade única para os estudantes aplicarem seus conhecimentos em um ambiente profissional dinâmico e desafiador.
                        Oferece desenvolvimento de habilidades práticas, além de contribuir para a formação técnica e profissional. Com foco no aprendizado contínuo, os estagiários têm a chance de
                        trabalhar em projetos relevantes, sendo orientados por profissionais qualificados. O SENAI incentiva a inovação e a excelência, preparando jovens para o mercado de trabalho.
                    </p>

                    <h2 className={styles.title}>Efetivação</h2>
                    <img src="./efetivo.png" className={styles.image} />
                    <p className={styles.text}>A efetivação no SENAI representa o reconhecimento do desempenho e dedicação de profissionais que demonstram excelência em suas funções.
                        Esse processo valoriza colaboradores que se destacam por seu comprometimento com a qualidade do ensino e com o desenvolvimento de competências técnicas dos alunos.
                        A efetivação garante estabilidade e continuidade na prestação de serviços, fortalecendo o crescimento do mercado de trabalho.</p>
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

                        <div className={styles.dragger}>
                            <Dragger {...props}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Selecione ou arraste o curriculo para esta área.</p>
                                <p className="ant-upload-hint">
                                    Suporte somente para arquivos do tipo PDF
                                </p>
                            </Dragger>

                        </div>

                        <div>
                            <button className={styles.registerEnviar} >
                                <p className={styles.buttonEnviar}>Enviar</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Candidato;