import styles from "./page.module.css";
import Header from "./components/Header/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <div className={styles.all}>
        <div className={styles.container}>
          <p className={styles.title}>Tipos de vagas</p>


          <div className={styles.vagasDetalhes}>
            <img src="./equipe.jpg" className={styles.image} />

            <p className={styles.subtitleAprendiz}>Jovem Aprendiz</p>
            <p className={styles.textAprendiz}>
              Uma vaga de Jovem Aprendiz é uma oportunidade de trabalho
              destinada a jovens entre 14 e 24 anos, criada pelo governo
              brasileiro para facilitar a entrada no mercado de trabalho e
              promover a formação profissional. O programa combina a
              aprendizagem prática na empresa com a teórica em instituições de
              ensino, permitindo que o jovem adquira experiência profissional
              enquanto continua seus estudos.
            </p>

            <p className={styles.subtitleCLT}>Vagas CLT</p>
            <img src="./vagasCLT.jpg" className={styles.image} />
            <p className={styles.text}>
              Uma vaga CLT refere-se a uma oportunidade de emprego sob o regime
              da Consolidação das Leis do Trabalho (CLT), que é a legislação
              trabalhista brasileira. Nesse modelo, o trabalhador tem um vínculo
              empregatício formal com a empresa, o que garante uma série de
              direitos e benefícios, como férias remuneradas, 13º salário, Fundo
              de Garantia do Tempo de Serviço (FGTS), seguro-desemprego, jornada
              de trabalho regulamentada (geralmente 44 horas semanais) e repouso
              semanal remunerado.
            </p>

            <p className={styles.subtitleEstagio}>Estágio</p>
            <img src="./estagiariosHome.png" className={styles.image} />
            <p className={styles.text}>
              As vagas de estágio são oportunidades para estudantes aplicarem na
              prática os conhecimentos teóricos adquiridos em sala de aula. Elas
              servem como uma ponte entre a educação formal e o mercado de
              trabalho, permitindo o desenvolvimento de habilidades específicas
              e a familiarização com o ambiente profissional. Os estágios podem
              ser obrigatórios, quando fazem parte da grade curricular, ou não
              obrigatórios, realizados por iniciativa do estudante.
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