import styles from "./cadastrovagas.module.css";
import Header from "../components/Header/Header";

const cadastrovagas = () => {
    return (
        <>
          <Header />

          <div className={styles.container}>
            <form className={styles.forms}>
                <h3 className={styles.h3}>Cadastrar Nova Vaga</h3>

                <div className={styles.inputarea}>  
                    <input type="text"
                    name="nome da vaga"
                    placeholder="Nome da Vaga"
                    className={styles.input}
                    />
                </div>

                <div className={styles.inputarea}> 
                    <input type="text"
                    name="empresa"
                    placeholder="Empresa"
                    className={styles.input}
                    />
                </div>

                <div className={styles.form}>

                <div className={styles.inputarea}> 
                <label className={styles.label}>
                    <input type="text"
                    name="cnpj"
                    placeholder="CNPJ"
                    className={styles.input2}
                    />
                </label>
                </div>

                <div className={styles.inputarea}> 
                <label className={styles.label}>
                    <input type="text"
                    name="telefone"
                    placeholder="Telefone"
                    className={styles.input3}
                    />
                </label>
                </div>
                </div>

                <div className={styles.inputarea}> 
                    <input type="email"
                    name="email"
                    placeholder="Email"
                    className={styles.input}
                    />
                </div>

                <div className={styles.inputarea}>     
                    <input type="text"
                    name="tipoVaga"
                    placeholder="Tipo da Vaga"
                    className={styles.input}
                    />
                </div>

                <div className={styles.inputarea}>     
                    <textarea
                    name="descricao"
                    placeholder="Descrição da Vaga"
                    className={styles.textarea}
                    />
                </div>    

                <p className={styles.empresas}>* Empresas</p>

                <div className={styles.inputarea}>
                <button className={styles.button} type="submit">Cadastrar</button>
                </div>

            </form>

            <div className={styles.vagacontainer}>
                <h3>Vagas</h3>
                <div className={styles.vagaitem}></div>
            </div>

          </div>

        </>
    )
}

export default cadastrovagas