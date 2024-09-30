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
              Uma vaga de Jovem Aprendiz é uma oportunidade de trabalho
              destinada a jovens entre 14 e 24 anos, criada pelo governo
              brasileiro para facilitar a entrada no mercado de trabalho e
              promover a formação profissional. O programa combina a
              aprendizagem prática na empresa com a teórica em instituições de
              ensino, permitindo que o jovem adquira experiência profissional
              enquanto continua seus estudos. As empresas de médio e grande
              porte são obrigadas a contratar de 5% a 15% de seus funcionários
              como aprendizes. O contrato pode durar até dois anos, e ao final,
              o jovem recebe um certificado de qualificação profissional.
            </p>

            <p className={styles.subtitle}>Vagas CLT</p>

            <p className={styles.text}>
              Uma vaga CLT refere-se a uma oportunidade de emprego sob o regime
              da Consolidação das Leis do Trabalho (CLT), que é a legislação
              trabalhista brasileira. Nesse modelo, o trabalhador tem um vínculo
              empregatício formal com a empresa, o que garante uma série de
              direitos e benefícios, como férias remuneradas, 13º salário, Fundo
              de Garantia do Tempo de Serviço (FGTS), seguro-desemprego, jornada
              de trabalho regulamentada (geralmente 44 horas semanais) e repouso
              semanal remunerado. Esse tipo de contrato oferece maior
              estabilidade e segurança para o trabalhador, pois todos os
              direitos e deveres são bem definidos pela legislação.
            </p>

            <p className={styles.subtitle}>Estágio</p>

            <p className={styles.text}>
              As vagas de estágio são oportunidades para estudantes aplicarem na
              prática os conhecimentos teóricos adquiridos em sala de aula. Elas
              servem como uma ponte entre a educação formal e o mercado de
              trabalho, permitindo o desenvolvimento de habilidades específicas
              e a familiarização com o ambiente profissional. Os estágios podem
              ser obrigatórios, quando fazem parte da grade curricular, ou não
              obrigatórios, realizados por iniciativa do estudante. Estagiários
              geralmente recebem uma bolsa-auxílio e benefícios como
              vale-transporte e seguro contra acidentes pessoais.
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
