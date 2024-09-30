import styles from './styles.module.css';
import senaiLogo from '../../../public/senai.png';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "antd";

const Header = () => {
    return (
        <div className={styles.container}>
            <Image src={senaiLogo} alt="logo" className={styles.logo}/>
            <div className={styles.buttons}>
            
                <Button className={styles.buttonRegister}  variant="primary">
                <Link href='./Cadastro'>
                    <p className={styles.buttonTxt}>Cadastrar-se</p>
                    </Link>
                </Button>
               
                <Link href='./Login' color="danger" variant="outlined">
                <Button className={styles.buttonLogin}>
                    <p className={styles.buttonTxt}>Login</p>
                </Button>
                </Link>
            </div>
        </div>
    )
}

export default Header;