"use client"

import { useEffect, useState } from 'react';
import { message } from 'antd';
import styles from "./page.module.css";
import Header from "./components/Header/Header";

export default function Home() {
  const [messageApi, contextHolder] = message.useMessage();
  const [vacancies, setVacancies] = useState([]);
  const [response, setResponse] = useState("");

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const response = await fetch(`https://3a31-201-63-78-210.ngrok-free.app/vacancies`, {
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
          setVacancies(responseData.vacancies);
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
            <img src="./equipe.jpg" className={styles.image} alt="Equipe" />

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
            <img src="./vagasCLT.jpg" className={styles.image} alt="Vagas CLT" />
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
            <img src="./estagiariosHome.png" className={styles.image} alt="Estágio" />
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
              <p>{response}</p>
            ) : (
              vacancies.map((vacancy, index) => (
                <div key={index} className={styles.card1}>
                  <p>{vacancy.name}</p> 
                </div>
              ))
            )
          }
        </div>
      </div>
    </div>
  );
}