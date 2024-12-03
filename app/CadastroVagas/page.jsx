"use client"
import styles from "./cadastrovagas.module.css";
import Header from "../components/Header/Header";
import Vagas from "../components/Vagas/Vagas";
import Candidacies from "../components/Candidacies/Candidacies";

import { DatePicker } from 'antd';
import { message, Space, Modal, Button, Tag, Steps } from 'antd';
import { useState, useEffect, useCallback } from "react";

const cadastrovagas = () => {
    //candidacies properties
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [creationTime, setCreationTime] = useState("");
    const [expirationTime, setExpirationTime] = useState("");
    const [type, setType] = useState("");
    //Companies properties
    const [companyName, setCompanyName] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [companyCnpj, setCompanyCnpj] = useState("");
    const [companyPhone, setCompanyPhone] = useState("");
    const [companyOptions, setCompanyOptions] = useState([]);

    //Fetch Vacancies
    const [vacancies, setVacancies] = useState([])

    //Messages Pop Up
    const [messageApi, contextHolder] = message.useMessage();
    const [candidacies, setCandidacies] = useState([]);

    //Modal Pop Up
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCandidacy, setSelectedCandidacy] = useState(null);

    //Manage candidates
    const [duplicateCandidacies, setDuplicateCandidacies] = useState([]);
    const [isManageCandidatesModalOpen, setIsManageCandidatesModalOpen] = useState(false);
    const [selectedVacancyForManagement, setSelectedVacancyForManagement] = useState(null);
    const [managedCandidacies, setManagedCandidacies] = useState([]);
    const [fullDuplicateCandidacies, setFullDuplicateCandidacies] = useState([]);

    //Filters
    const [selectRender, setSelectRender] = useState("candidacies");
    const [filter, setFilter] = useState("")

    // Success and Error Message Functions
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

    // Fetch Managed Candidacies Function
    const fetchManagedCandidacies = async (vacancyId) => {
        try {
            const response = await fetch(`http://localhost:4000/manage-candidates/${vacancyId}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                })
            });

            const data = await response.json();

            if (data.candidacies) {
                setManagedCandidacies(data.candidacies);
                success("Candidaturas gerenciadas carregadas com sucesso!");
            } else {
                message.info('Nenhuma candidatura gerenciada encontrada.');
            }
        } catch (err) {
            console.error(err);
            error(err.message);
        }
    };

    // Fetch Full Duplicate Candidacies Function
    const fetchFullDuplicateCandidacies = async (vacancyId) => {
        try {
            const response = await fetch(`http://localhost:4000/duplicate-candidates/${vacancyId}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                })
            });

            const data = await response.json();

            if (data.success && data.duplicates.length > 0) {
                setFullDuplicateCandidacies(data.duplicates);
                success("Candidaturas duplicadas carregadas com sucesso!");
            } else {
                message.info('Nenhuma candidatura duplicada encontrada.');
            }
        } catch (err) {
            console.error(err);
            error(err.message);
        }
    };

    // Add this function alongside the other fetch functions
    const fetchDuplicateCandidacies = async (vacancyId) => {
        try {
            const response = await fetch(`http://localhost:4000/duplicate-candidates/${vacancyId}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                })
            });

            const data = await response.json();

            if (data.success && data.duplicates.length > 0) {
                setDuplicateCandidacies(data.duplicates);
                success("Candidaturas duplicadas carregadas com sucesso!");
            } else {
                message.info('Nenhuma candidatura duplicada encontrada.');
            }
        } catch (err) {
            console.error(err);
            error(err.message);
        }
    };

    const manageCandidates = async (selectedStudentId, vacancyId) => {
        try {
            const response = await fetch(`http://localhost:4000/manage-candidates/${vacancyId}`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                }),
                body: JSON.stringify({ selectedStudentId })
            });

            const result = await response.json();

            if (result.success) {
                success(result.message);
                // Refresh candidacies after managing
                fetchCandidacies();
                setIsManageCandidatesModalOpen(false);
            } else {
                error(result.message);
            }
        } catch (err) {
            console.error(err);
            error(err.message);
        }
    };

    const updateCandidacyStatus = async (candidacyId, field) => {
        try {
            const response = await fetch(`http://localhost:4000/candidacies/update-status/${candidacyId}`, {
                method: 'PATCH',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                }),
                body: JSON.stringify({ field })
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
            success(responseData.message);

            // Refresh managed candidacies to update the steps
            if (selectedVacancyForManagement) {
                fetchManagedCandidacies(selectedVacancyForManagement);
            }
        } catch (err) {
            console.error(err);
            error(err.message);
        }
    };

    // Fetch Candidacies Function
    const fetchCandidacies = async () => {
        try {
            const response = await fetch(`http://localhost:4000/candidacies`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                })
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
            setCandidacies(responseData.candidacies);
        } catch (err) {
            console.error(err);
            error(err.message);
        }
    };

    const fetchVacancies = async () => {
        try {
            const response = await fetch(`http://localhost:4000/vacancies?name=${filter}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                })
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
            setVacancies(responseData.vacancies);
        } catch (err) {
            console.error(err);
            error(err.message);
        }
    };

    // Fetch Candidacies on Component Mount
    useEffect(() => {
        fetchCandidacies();
        fetchVacancies();
    }, [candidacies, vacancies]);


    const openModal = (candidacy) => {
        setSelectedCandidacy(candidacy); // Define a vaga selecionada
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        setSelectedCandidacy(null); // Limpa a vaga selecionada
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedCandidacy(null);
    };

    useEffect(() => {
        const fetchCompanies = async (name) => {
            try {
                const response = await fetch(`http://localhost:4000/companies?name=${name}`);
                if (!response.ok) throw new Error('Erro ao buscar empresas');
                const data = await response.json();
                setCompanyOptions(data.companies);
                console.log(companyOptions);

            } catch (error) {
                console.error(error.message);
            }
        };

        if (companyName) {
            fetchCompanies(companyName);
        }
    }, [companyName]);

    const handleCnpjChange = (e) => setCompanyCnpj(sanitizeInput(e.target.value));
    const handlePhoneChange = (e) => setCompanyPhone(sanitizeInput(e.target.value));
    const handleCompanyChange = (e) => setCompanyName(e.target.value);

    const sanitizeInput = (value) => value.replace(/\D/g, '');
    const handleSelectCompany = (company) => {
        setCompanyName(company.name);
        setCompanyEmail(company.email);
        setCompanyCnpj(sanitizeInput(company.cnpj));
        setCompanyPhone(sanitizeInput(company.phone));
        setCompanyOptions([]);
    };

    const onChangeCreation = (date, dateString) => {
        const formattedDate = dateString.split('-').reverse().join('-');
        setCreationTime(date);  // Keep the date object
    };

    const onChangeExpiration = (date, dateString) => {
        const formattedDate = dateString.split('-').reverse().join('-');
        setExpirationTime(date);  // Keep the date object
    };

    //Formatação da data
    const maskDate = (dateString) => {
        const dateParts = dateString.split('-');

        if (dateParts.length !== 3 || !/^\d{4}$/.test(dateParts[2])) {
            return dateString; // Retorna o valor original se não for um formato válido
        }

        const day = dateParts[0].padStart(2, '0');
        const month = dateParts[1].padStart(2, '0');

        return `${day}/${month}/${dateParts[2]}`;
    };

    const clearInputs = () => {
        setName("");
        setDescription("");
        setCreationTime(null);
        setExpirationTime(null);
        setType("");
        setCompanyName("");
        setCompanyCnpj("");
        setCompanyPhone("");
        setCompanyEmail("");
    }

    const postVacancy = useCallback(async (data) => {
        try {
            const response = await fetch(`http://localhost:4000/vacancies`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                }),
                body: JSON.stringify(data)
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
            clearInputs();
            success(responseData.message);
            return responseData;
        } catch (err) {
            console.error(err);
            error(err.message);
            return null;
        }
    }, []);

    const postCompany = useCallback(async (data) => {
        try {
            const response = await fetch(`http://localhost:4000/companies`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                }),
                body: JSON.stringify(data)
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
            clearInputs();
            success(responseData.message);
            return responseData;
        } catch (err) {
            console.error(err);
            error(err.message);
            return null;
        }
    }, []);

    const handleSubmit = async () => {
        if (name && description && creationTime && expirationTime && type && companyName && companyEmail && companyCnpj && companyPhone) {
            try {
                // Modify to use formatted date from creationTime and expirationTime
                const formattedCreationTime = creationTime.format('DD-MM-YYYY');
                const formattedExpirationTime = expirationTime.format('DD-MM-YYYY');

                // First check if company exists by CNPJ
                const response = await fetch(`http://localhost:4000/companies?cnpj=${companyCnpj}`);
                if (!response.ok) {
                    throw new Error('Erro ao verificar empresa');
                }
                const data = await response.json();

                let companyId;

                // If company doesn't exist in the suggestions, create new company first
                if (!data.companies || data.companies.length === 0) {
                    const companyResponse = await postCompany({
                        name: companyName,
                        cnpj: companyCnpj,
                        email: companyEmail,
                        phone: companyPhone
                    });

                    console.log(companyResponse);

                    if (!companyResponse) {
                        throw new Error('Erro ao cadastrar empresa');
                    }

                    // Get the ID from the newly created company
                    companyId = companyResponse.id;
                } else {
                    // Get the ID from the existing company
                    companyId = data.companies[0].id;
                }

                // Create the vacancy with the correct company ID
                await postVacancy({
                    name,
                    description,
                    creation_time: formattedCreationTime,
                    expiration_time: formattedExpirationTime,
                    type,
                    company_id: companyId
                });

            } catch (err) {
                console.error(err);
                error(err.message || 'Erro ao processar requisição');
            }
        } else {
            error("Preencha todos os campos!");
        }
    };

    return (
        <>
            <Header />
            {contextHolder}
            <div className={styles.container}>
                <Modal
                    title={selectedCandidacy?.name || "Detalhes da Candidatura"}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    className={styles.modal}
                >
                    {selectedCandidacy ? (
                        <div className={styles.modalContent}>
                            <p className={styles.modalText}><strong>Descrição:</strong> {selectedCandidacy.description}</p>
                            <p className={styles.modalText}><strong>Data de Criação:</strong> {selectedCandidacy.creation_time}</p>
                            <p className={styles.modalText}><strong>Data de Expiração:</strong> {selectedCandidacy.expiration_time}</p>
                            <p className={styles.modalText}><strong>Tipo:</strong> {selectedCandidacy.type}</p>
                        </div>
                    ) : (
                        <p>Carregando...</p>
                    )}
                </Modal>
                <Modal
                    title="Candidaturas Gerenciadas"
                    open={managedCandidacies.length > 0}
                    onCancel={() => setManagedCandidacies([])}
                    footer={null}
                    className={styles.modal}
                >
                    {managedCandidacies.map((candidacy, index) => {
                        const getCurrentStep = (candidacy) => {
                            if (candidacy.hired) return 3;
                            if (candidacy.done) return 2;
                            if (candidacy.documentsManagement) return 1;
                            if (candidacy.curriculumAvaliation) return 1;
                            return 0;
                        };

                        const steps = [
                            {
                                title: 'Iniciado',
                                description: 'Candidatura Iniciada',
                                field: 'iniciated',
                                isActive: candidacy.iniciated
                            },
                            {
                                title: 'Avaliação',
                                description: 'Avaliação de Currículo',
                                field: 'curriculumAvaliation',
                                isActive: candidacy.curriculumAvaliation
                            },
                            {
                                title: 'Documentos',
                                description: 'Gestão de Documentos',
                                field: 'documentsManagement',
                                isActive: candidacy.documentsManagement
                            },
                            {
                                title: 'Finalizado',
                                description: 'Candidatura Concluída',
                                field: candidacy.hired ? 'hired' : 'done',
                                isActive: candidacy.hired || candidacy.done
                            }
                        ];

                        const handleStepChange = async (stepIndex) => {
                            const selectedStep = steps[stepIndex];
                            await updateCandidacyStatus(candidacy.id, selectedStep.field);
                        };

                        return (
                            <div key={index} className={styles.modal}>
                                <Steps
                                    current={getCurrentStep(candidacy)}
                                    onChange={handleStepChange}
                                    className={styles.modalSteps}
                                    items={steps.map(step => ({
                                        title: step.title,
                                        description: step.description,
                                        status: step.isActive ? 'finish' : 'wait'
                                    }))}
                                />
                                <div className={styles.modalTextContent}>
                                    <p><strong>ID do Estudante:</strong> {candidacy.id_student}</p>
                                    <p><strong>Vaga:</strong> {candidacy.id_vacancy}</p>
                                    <p><strong>Empresa:</strong> {candidacy.id_company}</p>
                                    <p><strong>Descrição:</strong> {candidacy.description || "Sem descrição"}</p>
                                    <Tag color={candidacy.hired ? "green" : "blue"}>
                                        {candidacy.hired ? "Contratado" : "Em Processo"}
                                    </Tag>
                                </div>
                            </div>
                        );
                    })}
                </Modal>

                <form className={styles.forms}>
                    <h3 className={styles.h3}>Cadastrar Nova Vaga</h3>

                    <div className={styles.inputarea}>
                        <input type="text"
                            name="nome da vaga"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nome da Vaga"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputarea}>
                        <input type="text" value={companyName} onChange={handleCompanyChange} placeholder="Empresa" className={styles.input} />
                        {companyOptions.length > 0 && (
                            <ul className={styles.dropdown}>
                                {companyOptions.map((company, index) => (
                                    <li key={index} onClick={() => handleSelectCompany(company)} className={styles.options}>{company.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className={styles.form}>

                        <div className={styles.inputarea}>
                            <label className={styles.label}>
                                <input type="text"
                                    name="cnpj"
                                    value={companyCnpj}
                                    onChange={handleCnpjChange}
                                    placeholder="CNPJ"
                                    className={styles.input2}
                                />
                            </label>
                        </div>

                        <div className={styles.inputarea}>
                            <label className={styles.label}>
                                <input type="text"
                                    name="telefone"
                                    value={companyPhone}
                                    onChange={handlePhoneChange}
                                    placeholder="Telefone"
                                    className={styles.input3}
                                />
                            </label>
                        </div>

                    </div>

                    <div className={styles.inputarea}>
                        <input type="email"
                            name="email"
                            value={companyEmail}
                            onChange={(e) => setCompanyEmail(e.target.value)}
                            placeholder="Email"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputarea}>
                        <DatePicker
                            value={creationTime}
                            className={styles.datePicker}
                            onChange={onChangeCreation} // Update here
                            placeholder="Selecionar data de Criação"
                        />
                    </div>

                    <div className={styles.inputarea}>
                        <DatePicker
                            value={expirationTime}
                            className={styles.datePicker}
                            onChange={onChangeExpiration} // Update here
                            placeholder="Selecionar data de Expiração"
                        />
                    </div>

                    <div className={styles.inputarea}>
                        <input type="text"
                            name="tipoVaga"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            placeholder="Tipo da Vaga"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputarea}>
                        <textarea
                            name="descricao"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descrição da Vaga"
                            className={styles.textarea}
                        />
                    </div>

                    <a href="/EditarEmpresas">
                        <p className={styles.empresas}>* Empresas</p>
                    </a>

                    <div className={styles.inputarea}>
                        <button className={styles.button} type="submit" onClick={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}>Cadastrar</button>
                    </div>

                </form>

                <div className={styles.vagacontainer}>
                    <h3 className={styles.h3}>Candidaturas e Vagas</h3>
                    <div className={styles.vagaitem}>
                        <div>
                            <select
                                value={selectRender}
                                onChange={(e) => setSelectRender(e.target.value)}
                                type="text"
                                placeholder="Tipo de Conta"
                                required
                                className={styles.tipo}
                            >
                                <option value={'candidacies'}>Candidaturas</option>
                                <option value={'vacancies'}>Vagas</option>
                            </select>
                        </div>
                        <input type="text" className={styles.filter} value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Pesquisar vaga por nome" />
                        <div className={styles.vaga}>
                            {
                                selectRender === 'candidacies' ? (
                                    candidacies.length === 0 ? (
                                        <p className={styles.text}>Nenhuma candidatura cadastrada</p>
                                    ) : (
                                        candidacies
                                            .filter((candidacy, index, self) =>
                                                index === self.findIndex((c) => c.id_vacancy === candidacy.id_vacancy)
                                            )
                                            .map((candidacy, index) => {
                                                return (
                                                    <div key={index} className={styles.candidacyWrapper}>
                                                        <Candidacies
                                                            onClick={() => openModal(candidacy)}
                                                            student={candidacy.id_student}
                                                            vacancy={candidacy.id_vacancy}
                                                            company={candidacy.id_company}
                                                            candicacy_id={candidacy.id}
                                                            creation_time={candidacy.creation_time}
                                                            description={candidacy.description ? candidacy.creation_time : "Sem comentário"}
                                                        />
                                                        <div className={styles.candidacyActions}>
                                                            <Button
                                                                type="link"
                                                                onClick={() => fetchDuplicateCandidacies(candidacy.id_vacancy)}
                                                            >
                                                                Gerenciar Candidaturas Duplicadas
                                                            </Button>
                                                            <Button
                                                                type="link"
                                                                onClick={() => fetchManagedCandidacies(candidacy.id_vacancy)}
                                                            >
                                                                Ver Candidaturas Gerenciadas
                                                            </Button>
                                                            <Button
                                                                type="link"
                                                                onClick={() => fetchFullDuplicateCandidacies(candidacy.id_vacancy)}
                                                            >
                                                                Detalhes de Duplicatas
                                                            </Button>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                    )
                                ) : (
                                    vacancies.length === 0 ? (
                                        <p className={styles.text}>Nenhuma Vaga cadastrada</p>
                                    ) : (
                                        vacancies.map((vacancy, index) => (
                                            <Vagas
                                                key={index}
                                                id={vacancy.id}
                                                title={vacancy.name}
                                                type={vacancy.type}
                                                creation_time={vacancy.creation_time}
                                                expiration_time={vacancy.creation_time}
                                            />
                                        ))
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>

                <Modal
                    title="Candidaturas Duplicadas"
                    open={duplicateCandidacies.length > 0}
                    onCancel={() => setDuplicateCandidacies([])}
                    footer={null}
                    className={styles.modal}
                    style={{ width: '80vw', height: '80vh', maxWidth: 'none' }}
                >
                    {duplicateCandidacies.map((duplicateGroup, index) => (
                        <div key={index} className={styles.duplicateGroup}>
                            <h4>Grupo de Duplicatas</h4>
                            <p><strong>Descrição:</strong> {duplicateGroup.description}</p>
                            <p><strong>Vaga:</strong> {duplicateGroup.vacancy_name}</p>
                            <p><strong>Total de Duplicatas:</strong> {duplicateGroup.duplicate_count}</p>

                            <div className={styles.duplicateCandidatesList}>
                                {duplicateGroup.candidacies.map((candidacy, candIndex) => (
                                    <div key={candIndex} className={styles.duplicateCandidate}>
                                        <p>
                                            <strong>Nome:</strong> {candidacy.student_name}
                                            <Tag color="blue" style={{ marginLeft: 10 }}>
                                                ID: {candidacy.student_id}
                                            </Tag>
                                        </p>
                                        <p>
                                            <strong>Data de Criação:</strong>
                                            {new Date(candidacy.creation_time).toLocaleString()}
                                        </p>
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                // Call manageCandidates with the selected student ID and the vacancy ID
                                                manageCandidates(
                                                    candidacy.student_id,
                                                    duplicateGroup.vacancy_id
                                                );
                                                // Close the modal after managing
                                                setDuplicateCandidacies([]);
                                            }}
                                        >
                                            Selecionar para a Vaga
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </Modal>

                {/* New Modal for Full Duplicate Candidacies */}
                <Modal
                    title="Detalhes de Candidaturas Duplicadas"
                    open={fullDuplicateCandidacies.length > 0}
                    onCancel={() => setFullDuplicateCandidacies([])}
                    footer={null}
                    className={styles.modal}
                >
                    {fullDuplicateCandidacies.map((duplicateGroup, index) => (
                        <div key={index} className={styles.duplicateGroup}>
                            <h4>Grupo de Duplicatas</h4>
                            <p><strong>Descrição:</strong> {duplicateGroup.description}</p>
                            <p><strong>Vaga:</strong> {duplicateGroup.vacancy_name}</p>
                            <p><strong>Total de Duplicatas:</strong> {duplicateGroup.duplicate_count}</p>

                            <div className={styles.duplicateCandidatesList}>
                                {duplicateGroup.candidacies.map((candidacy, candIndex) => (
                                    <div key={candIndex} className={styles.duplicateCandidate}>
                                        <p>
                                            <strong>Nome:</strong> {candidacy.student_name}
                                            <Tag color="blue" style={{ marginLeft: 10 }}>
                                                ID: {candidacy.student_id}
                                            </Tag>
                                        </p>
                                        <p>
                                            <strong>Data de Criação:</strong>
                                            {new Date(candidacy.creation_time).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </Modal>
            </div>

        </>
    )
}

export default cadastrovagas