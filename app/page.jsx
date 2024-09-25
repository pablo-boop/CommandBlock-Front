import styles from "./page.module.css";
import Header from "./components/Header/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <div className={styles.all}>
        <div className={styles.container}>
          <p className={styles.title}>Tipos de vagas</p>

          <img
            src="https://img.freepik.com/fotos-gratis/homem-engracado-de-pele-escura-com-penteado-africano-trabalhando-no-jornal-do-curso-enquanto-esta-sentado-no-cafe-durante-a-pausa-para-o-almoco-segurando-o-smartphone-feliz-por-terminar-seu-trabalho-africano-com-um-sorriso-largo-em-um-cafe_273609-7461.jpg?w=900&t=st=1727264714~exp=1727265314~hmac=452ce46f79c0a3245a71f453638a4cebdb3fdf34c50f4c48c87fadd6bdc1f64b"
            alt="Pessoa estudando feliz"
            width={550}
          />

          <div className={styles.vagasDetalhes}>
            <p className={styles.subtitle}>Jovem Aprendiz</p>

            <p className={styles.text}>
              O SENAI está com oportunidades de trabalho para quem busca
              estabilidade e deseja fazer parte de uma instituição renomada,
              comprometida com a formação de profissionais e o desenvolvimento
              da indústria brasileira. Estamos contratando para diversas áreas
              com vagas efetivas, oferecendo não apenas um emprego, mas uma
              oportunidade de crescimento em um ambiente que valoriza a
              inovação, a educação de qualidade e o desenvolvimento contínuo.
            </p>

            
          </div>
        </div>

        <div className={styles.aside}>
          <p className={styles.titleAside}>Novas Vagas</p>

          <div className={styles.card1} />
          <div className={styles.card1} />
          <div className={styles.card1} />
        </div>
      </div>
    </div>
  );
}
