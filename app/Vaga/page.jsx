import styles from "./vaga.module.css"
import Vagas from "../components/Vagas/Vagas"
import Header from "../components/Header/Header"


const Vaga = () => {
    return(
        <>
        <Header />
         <div className={styles.vagacontainer}>
                <h2>Vagas</h2>
                <div className={styles.vagaitem}>

             <div className={styles.vaga}>
                <Vagas imageURL="./cadastro.svg" text="Descrição da Vaga" />

                <Vagas imageURL="./cadastro.svg" text="Descrição da Vaga" />

                <Vagas imageURL="./cadastro.svg" text="Descrição da Vaga" />
            </div>

            <div className={styles.vaga}>
                <Vagas imageURL="./cadastro.svg" text="Descrição da Vaga" />

                <Vagas imageURL="./cadastro.svg" text="Descrição da Vaga" />

                <Vagas imageURL="./cadastro.svg" text="Descrição da Vaga" />
            </div>

            <div className={styles.vaga}>
                <Vagas imageURL="./cadastro.svg" text="Descrição da Vaga" />

                <Vagas imageURL="./cadastro.svg" text="Descrição da Vaga" />

                <Vagas imageURL="./cadastro.svg" text="Descrição da Vaga" />
            </div>


                
                </div>
            </div>
        </>
    )
}

export default Vaga;