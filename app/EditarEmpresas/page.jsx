"use client"
import styles from "./editarempresas.module.css";
import { FaRegUser, FaPencilAlt } from "react-icons/fa";
import { MdOutlineEmail, MdDelete } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { FiArrowLeft } from "react-icons/fi";
import { CiPhone } from "react-icons/ci";
import { message, Space } from 'antd';
import { useState, useEffect } from "react";



const EditarEmpresas = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [phone, setPhone] = useState("");
    const [companies, setCompanies] = useState([]);
    const [response, setResponse] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const [company, setCompany] = useState([])

    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        // buscar as empresas cadastradas
        const fetchEmpresas = async () => {
            try {
                const response = await fetch(`http://10.88.200.155:4000/companies`, {
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

                if (responseData.companies.length === 0) {
                    setResponse("Não há empresas disponíveis no momento.");
                } else {
                    setCompanies(responseData.companies);
                }

            } catch (err) {
                console.error(err);
                error(err.message);
            }
        };
        fetchEmpresas();
    }, [companies]);



    const fillInputs = async (id) => {
        try {
            const response = await fetch(`http://10.88.200.155:4000/companies/${id}`, {
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
            console.log(responseData);


            setCompany(responseData.companies);
            setEditMode(true);
            setEditId(company.id);
            setName(company.name);
            setEmail(company.email);
            setCnpj(company.cnpj);
            setPhone(company.phone);
        }

             catch (err) {
        console.error(err);
        error(err.message);
    }
};

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

const handleDelete = async (id) => {
    try {
        const response = await fetch(`http://10.88.200.155:4000/companies/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error("Erro ao excluir a empresa.");
        }
        success("Empresa excluída com sucesso!");
        const updatedCompanies = await fetch(`http://10.88.200.155:4000/companies`).then(res => res.json());
        setCompanies(updatedCompanies);
    } catch (err) {
        error(err.message);
    }
};

const handleSubmit = async () => {
    if (name === "" || email === "" || cnpj === "" || phone === "") {
        error("Preencha todos os campos!");
    } else {
        try {
            const response = await fetch(`http://10.88.200.155:4000/companies/${id}`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                }),
                body: JSON.stringify({
                    name: name,
                    email: email,
                    cnpj: cnpj,
                    phone: phone,
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
            clearInputs();
            success(responseData.message);
        } catch (err) {
            console.error(err);
            error(err.message);
        }
    }

};

const postCompany = async () => {
    try {
        const response = await fetch(`http://10.88.200.155:4000/companies`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420",
            }),
            body: JSON.stringify({
                name: name,
                cnpj: cnpj,
                email: email,
                phone: phone
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
        clearInputs();
        success(responseData.message);
        return responseData;
    } catch (err) {
        console.error(err);
        error(err.message);
        return null;
    }
};


return (
    <>
        <div className={styles.cadastro}>
            {contextHolder}
            <div className={styles.card}>
                <a href="/CadastroVagas">
                    <FiArrowLeft className={styles.arrow} />
                </a>

                <div className={styles.forms}>
                    <h1 className={styles.title}> Editar Empresas</h1>
                    <p className={styles.text}>Por favor, Preencha o campo de nome e atualize os outros dados</p>
                    <div className={styles.campos}>
                        <FaRegUser className={styles.icone} />
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            type="text"
                            placeholder="Nome da Empresa"
                            required
                            className={styles.inputs}
                        />
                    </div>

                    <div className={styles.campos}>
                        <MdOutlineEmail className={styles.icone} />
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            placeholder="E-mail"
                            required
                            className={styles.inputs}
                        />
                    </div>

                    <div className={styles.campos}>
                        <IoLockClosedOutline className={styles.icone} />
                        <input
                            value={cnpj}
                            onChange={e => setCnpj(e.target.value)}
                            type="number"
                            placeholder="CNPJ"
                            required
                            className={styles.inputs}
                        />
                    </div>

                    <div className={styles.campos}>
                        <CiPhone className={styles.icone} />
                        <input
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            type="number"
                            placeholder="Telefone"
                            required
                            className={styles.inputs}
                        />
                    </div>

                    <Space>
                        <button className={styles.button} onClick={postCompany}>
                            Atualizar
                        </button>
                    </Space>


                    {/* Lista de empresas */}
                    <div className={styles.listaEmpresas}>
                        <h2>Empresas Cadastradas</h2>
                        <ul className={styles.empresas}>
                            {
                                companies.length === 0 ? (
                                    <p>{response}</p>
                                ) : (
                                    companies.map((company) => (
                                        <li key={company.id} className={styles.empresaItem}>
                                            <p>{company.name}</p>
                                            <div className={styles.acoes}>
                                                <FaPencilAlt onClick={() => fillInputs(company.id)}
                                                    className={styles.iconeAcao} />
                                                <MdDelete onClick={() => handleDelete(company.id)}
                                                    className={styles.iconeAcao} />
                                            </div>
                                        </li>
                                    )))}
                        </ul>
                    </div>


                </div>
            </div>
        </div>
    </>
);
}

export default EditarEmpresas;
