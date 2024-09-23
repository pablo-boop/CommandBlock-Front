import styles from './styles.module.css'
import senaiLogo from '../../../public/senai.png'
import Image from 'next/image'

const Header = () => {
    return (
        <div className={styles.container}>
            <Image src={senaiLogo} alt="logo" className={styles.logo}/>
            <div className={styles.buttons}>
                <button className={styles.buttonRegister} >
                    <p className={styles.buttonTxt}>Cadastrar-se</p>
                </button>
                <button className={styles.buttonLogin}>
                    <p className={styles.buttonTxt}>Login</p>
                </button>
            </div>
        </div>
    )
}

export default Header;