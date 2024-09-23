"use client"
import styles from "./cadastro.module.css"

const cadastro = () => {
    return (
        <>
        <div className={styles.cadastro}>
            <div className={styles.card}>

                <div className={styles.imagem}>
                    <img src={'/cadastro.svg'}></img>
                    <div className={styles.placeholder}></div>
                </div>

                <div className={styles.forms}>
                    <h1 className={styles.title}> Seja Bem-Vindo</h1>
                    <p className={styles.text}>Por favor, faça o cadastro antes de continuar</p>

                    <input type="text" placeholder="Nome do Usuário" required className={styles.inputs} />
                    <input type="email" placeholder="E-mail" required className={styles.inputs} />
                    <input type="password" placeholder="Senha" required className={styles.inputs} />

                    <p className={styles.curso}>Qual curso você está atualmente fazendo?</p>

                    <div className={styles.opcoes}>
                    <label className={styles.inputlabel}>
                    <input type="radio" name="curso" value="Desenvolvimento de sistemas" className={styles.input} />
                    Desenvolvimento de sistemas
                    </label>

                    <label className={styles.inputlabel}>
                    <input type="radio" name="curso" value="Técnico de fabricação mecanica" className={styles.input} />
                    Técnico de fabricação mecanica
                    </label>

                    <label className={styles.inputlabel}>
                    <input type="radio" name="curso" value="Técnico de eletroeletronica" className={styles.input} />
                    Técnico de eletroeletronica
                    </label>
                    </div>

                    <p className={styles.logintext}>Já tem um cadastro?  <a href="/Login" className={styles.login}>Faça o Login</a> </p>

                </div>

            </div>
        </div>
        </>
    )
}

export default cadastro;