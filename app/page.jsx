"use client"

import { useEffect, useState } from 'react';
import { message, Skeleton } from 'antd';
import Link from 'next/link';
import styles from "./page.module.css";
import Header from "./components/Header/Header";
import Vagas from './components/Vagas/Vagas';

export default function Home() {
  const [messageApi, contextHolder] = message.useMessage();
  const [vacancies, setVacancies] = useState([]);
  const [response, setResponse] = useState("");

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const response = await fetch(`http://localhost:4000/vacancies`, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": "69420",
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          let errorMessage = response.statusText;

          try {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.message;
          } catch (e) {
            console.error("Erro ao parsear JSON:", e);
          }

          throw new Error(errorMessage);
        }

        const responseData = await response.json();
        console.log(responseData);

        if (responseData.vacancies.length === 0) {
          setResponse("Não há vagas disponíveis no momento.");
        } else {
          setVacancies(responseData.vacancies.slice(-2));
        }

      } catch (err) {
        console.error(err);
        error(err.message);
      }
    };
    handleSubmit();
  }, []);

  const success = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };

  const error = (msg) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };

  return (
    <div>
      <Header />
      {contextHolder}
      <div className={styles.all}>
        <div className={styles.container}>
          <p className={styles.title}>Tipos de vagas</p>

          <div className={styles.vagasDetalhes}>
            <p className={styles.subtitle}>Jovem Aprendiz</p>
            <img src="./equipe.jpg" className={styles.image} />


            <p className={styles.text}>
              Uma vaga de Jovem Aprendiz é uma oportunidade de trabalho
              destinada a jovens entre 14 e 24 anos, criada pelo governo
              brasileiro para facilitar a entrada no mercado de trabalho e
              promover a formação profissional. O programa combina a
              aprendizagem prática na empresa com a teórica em instituições de
              ensino, permitindo que o jovem adquira experiência profissional
              enquanto continua seus estudos.
            </p>

            <p className={styles.subtitle}>Vagas CLT</p>
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

            <p className={styles.subtitle}>Estágio</p>
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
          {
            vacancies.length === 0 ? (
              <>
                <div className={styles.card1}>
                  <Skeleton className={styles.load} />
                </div>
                <div className={styles.card1}>
                  <Skeleton className={styles.load} />
                </div>
              </>
            ) : (
              vacancies.map((vacancy, index) => (
                <Vagas key={index} id={vacancy.id} title={vacancy.name} type={vacancy.type} creation_time={vacancy.creation_time} expiration_time={vacancy.creation_time}/>
              ))
            )
          }
        </div>
      </div>
    </div>
  );
}