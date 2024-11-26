"use client"
import styles from "./cadastrovagas.module.css";
import Header from "../components/Header/Header";
import Vagas from "../components/Vagas/Vagas";

import { DatePicker } from 'antd';
import { message, Space, Modal, Button } from 'antd';
import { useState, useEffect, useCallback } from "react";
import Candidacies from "../components/Candidacies/Candidacies";

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

    // Fetch Duplicate Candidacies Function
    const fetchDuplicateCandidacies = async (vacancyId) => {
        try {
            const response = await fetch(`http://localhost:4000/manage-candidates/${vacancyId}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar candidaturas duplicadas');
            }

            const data = await response.json();

            // If duplicate candidacies exist, open the management modal
            if (data.success && data.duplicates && data.duplicates.length > 0) {
                setDuplicateCandidacies(data.duplicates);
                setSelectedVacancyForManagement(vacancyId);
                setIsManageCandidatesModalOpen(true);
            } else {
                message.info('Não foram encontradas candidaturas duplicadas.');
            }
        } catch (err) {
            console.error(err);
            error(err.message);
        }
    };

    // Manage Candidates Function
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

    // Fetch Candidacies on Component Mount
    useEffect(() => {
        fetchCandidacies();
    }, []);


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
        setCreationTime(formattedDate);
    };

    const onChangeExpiration = (date, dateString) => {
        const formattedDate = dateString.split('-').reverse().join('-');
        setExpirationTime(formattedDate);
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
        setCreationTime("");
        setExpirationTime("");
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
                    creation_time: creationTime,
                    expiration_time: expirationTime,
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
                        <>
                            <p><strong>Descrição:</strong> {selectedCandidacy.description}</p>
                            <p><strong>Data de Criação:</strong> {selectedCandidacy.creation_time}</p>
                            <p><strong>Data de Expiração:</strong> {selectedCandidacy.expiration_time}</p>
                            <p><strong>Tipo:</strong> {selectedCandidacy.type}</p>
                        </>
                    ) : (
                        <p>Carregando...</p>
                    )}
                </Modal>
                <Modal
                    title="Candidaturas Duplicadas"
                    open={isManageCandidatesModalOpen}
                    onCancel={() => setIsManageCandidatesModalOpen(false)}
                    footer={null}
                    className={styles.modal}
                >
                    {duplicateCandidacies.length > 0 ? (
                        <div>
                            <p>Foram encontradas candidaturas duplicadas para esta vaga. Escolha um grupo de candidaturas para gerenciar:</p>
                            {duplicateCandidacies.map((duplicateGroup, groupIndex) => (
                                <div key={groupIndex} className={styles.duplicateGroup}>
                                    <p><strong>Descrição:</strong> {duplicateGroup.description}</p>
                                    <p><strong>Vaga:</strong> {duplicateGroup.vacancy_name}</p>
                                    <p><strong>Número de Duplicatas:</strong> {duplicateGroup.duplicate_count}</p>
                                    <ul className={styles.duplicateCandidacyList}>
                                        {duplicateGroup.candidacies.map((candidacy, index) => (
                                            <li key={index} className={styles.duplicateCandidacy}>
                                                <span>
                                                    {candidacy.student_name}
                                                    (ID: {candidacy.student_id})
                                                    - Criado em: {new Date(candidacy.creation_time).toLocaleString()}
                                                </span>
                                                <Button
                                                    type="primary"
                                                    onClick={() => manageCandidates(
                                                        candidacy.student_id,
                                                        selectedVacancyForManagement
                                                    )}
                                                >
                                                    Selecionar
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Nenhuma candidatura duplicada encontrada.</p>
                    )}
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
                            className={styles.datePicker}
                            onChange={onChangeCreation} // Update here
                            placeholder="Selecionar data de Criação"
                        />
                    </div>

                    <div className={styles.inputarea}>
                        <DatePicker
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
                    <h3 className={styles.h3}>Candidaturas</h3>
                    <div className={styles.vagaitem}>
                        <div className={styles.vaga}>
                            {
                                candidacies.length === 0 ? (
                                    <p className={styles.text}>Nenhuma vaga cadastrada</p>
                                ) : (
                                    // Remover duplicatas com base no atributo id_vacancy
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
                                                        creation_time={candidacy.creation_time}
                                                        description={candidacy.description ? candidacy.creation_time : "Sem comentário"}
                                                    />
                                                    <Button
                                                        type="link"
                                                        onClick={() => fetchDuplicateCandidacies(candidacy.id_vacancy)}
                                                    >
                                                        Gerenciar Candidaturas Duplicadas
                                                    </Button>
                                                </div>
                                            );
                                        })
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default cadastrovagas