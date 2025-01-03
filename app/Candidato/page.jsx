"use client"
import Header from '../components/Header/Header';
import styles from './candidato.module.css';
import { FiUser, FiLock, FiMail } from "react-icons/fi";
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from "next/navigation";
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

    //vaga pelo ID
    const [vacancy, setVacancy] = useState(null);
    const [companyId, setCompanyId] = useState(null);

    //Props throw params
    const router = useRouter();
    const searchParams = useSearchParams();
    const vacancyId = searchParams.get('id');
    

    useEffect(() => {
        const handleSubmit = async () => {
            try {
                const vacancyResponse = await fetch(`http://localhost:4000/vacancies/${vacancyId}`, {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        "ngrok-skip-browser-warning": "69420",
                    })
                });

                if (!vacancyResponse.ok) {
                    const errorText = await vacancyResponse.text();
                    let errorMessage = vacancyResponse.statusText;

                    try {
                        const errorJson = JSON.parse(errorText);
                        errorMessage = errorJson.message;
                    } catch (e) {
                        console.error("Erro ao parsear JSON:", e);
                    }

                    throw new Error(errorMessage);
                }

                const vacancyData = await vacancyResponse.json();
                setVacancy(vacancyData.vacancy);
                console.log(vacancyData.vacancy.company_id);
                

                const companyResponse = await fetch(`http://localhost:4000/companies/${vacancyData.vacancy.company_id}`, {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        "ngrok-skip-browser-warning": "69420",
                    })
                });

                if (!companyResponse.ok) {
                    const errorText = await companyResponse.text();
                    let errorMessage = companyResponse.statusText;

                    try {
                        const errorJson = JSON.parse(errorText);
                        errorMessage = errorJson.message;
                    } catch (e) {
                        console.error("Erro ao parsear JSON:", e);
                    }

                    throw new Error(errorMessage);
                }

                const companyData = await companyResponse.json();
                setCompanyId(companyData.company.id);
                console.log(companyData);
                

            } catch (err) {
                console.error(err);
            }
        };
        handleSubmit();
    }, []);

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
            const idLS = localStorage.getItem('id');

            if (!idLS) {
                error("Por favor, faça o login para se candidatar!")
            }

            try {
                const response = await fetch(`http://localhost:4000/candidacies/${idLS}/${vacancyId}/${companyId}`, {
                    method: "POST",
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "69420",
                    })
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    let errorMessage = response.statusText;

                    try {
                        const errorJson = JSON.parse(errorText);
                        errorMessage = errorJson.message;
                        error(errorJson.message)
                    } catch (e) {
                        console.error("Erro ao parsear JSON:", e);
                    }

                    throw new Error(errorMessage);
                }
                const responseData = await response.json();
                clearInputs()
                success(responseData.message);

                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);

            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className={styles.container}>
            {contextHolder}
            <Header />
            {vacancy && (
                <h2 className={styles.tituloVaga}>{vacancy.name}</h2>
            )}
            <div className={styles.container}>
                <div className={styles.allTexto}>
                    <img src="./candidatoImage.png" className={styles.image} />
                    <h2 className={styles.title}>Sobre a vaga</h2>
                    <p className={styles.text}>Para manter a qualidade de seus processos, produtos e garantir o seu crescimento,
                        o SENAI investe constantemente no aprimoramento de seus colaboradores. Por meio de programas
                        de capacitação e qualificação, fortalecemos as competências organizacionais necessárias em um
                        ambiente de mudanças e constantes desafios. O Investimento na formação das lideranças,
                        acreditando em pessoas preparadas é fundamental para qualquer empresa. </p>

                    <h2 className={styles.title}>Estágio</h2>
                    <img src="./estagio.jpg" className={styles.image} />
                    <p className={styles.text}>O estágio no SENAI é uma oportunidade única para os estudantes aplicarem
                        conhecimentos em um ambiente profissional dinâmico e desafiador.
                        Oferece desenvolvimento de habilidades práticas, além de contribuir para a formação técnica e profissional.
                        Com foco no aprendizado contínuo, os estagiários têm a chance de
                        trabalhar em projetos relevantes, sendo orientados por profissionais qualificados.
                        O SENAI incentiva a inovação e a excelência, preparando jovens para o mercado de trabalho.
                    </p>

                    <h2 className={styles.title}>Efetivação</h2>
                    <img src="./efetivo.png" className={styles.image} />
                    <p className={styles.text}>A efetivação no SENAI representa o reconhecimento do desempenho e dedicação de profissionais que demonstram excelência em suas funções.
                        Esse processo valoriza colaboradores que se destacam por seu comprometimento com a qualidade do ensino e com o desenvolvimento de competências técnicas dos alunos.
                        A efetivação garante estabilidade e continuidade na prestação de serviços, fortalecendo o crescimento do mercado de trabalho.</p>

                    <div className={styles.formsContainer}>
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
                                    <button className={styles.registerEnviar} onClick={() => handleSubmit()}>
                                        <p className={styles.buttonEnviar}>Enviar</p>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Candidato;