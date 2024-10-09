import styles from "./page.module.css";
import Header from "./components/Header/Header";

export default function Home() {
  return (
    <div>
      <Header/>
      <div className={styles.container}>
      <h2 className={styles.titulo}>Tipos de Vagas</h2>
      <img src="./equipe.jpg" className={styles.image} />
      <h2 className={styles.subtitulo}>Jovem Aprendiz</h2>
      <p className={styles.texto}>O SENAI está oferecendo oportunidades de trabalho para aqueles que buscam estabilidade e desejam integrar uma instituição respeitada, 
      dedicada à formação de profissionais e ao desenvolvimento da indústria brasileira. Estamos contratando para diversas áreas com vagas 
      efetivas, proporcionando não apenas um emprego, mas também uma chance de crescimento em um ambiente que valoriza a inovação, a 
      educação de qualidade e o desenvolvimento contínuo.</p>

      </div>
    </div>
  );
} 