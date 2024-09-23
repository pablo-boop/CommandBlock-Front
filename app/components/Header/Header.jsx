import styles from './styles.module.css'

const Header = () => {
    return (
        <div className={styles.container}>
            <img src="../../../public/senai.png" alt="logo" className={styles.logo} />
        </div>
    )
}

export default Header;