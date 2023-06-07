import { useState, useEffect } from "react";
import { Table } from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Arrow from "../../assets/back-arrow.png";

export const Request1 = () => {
  const navigate = useNavigate();
  const [elements, setElements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const rows = elements.map((element) => {
    return (
      <tr key={element.id} id={`row-${element.id}`}>
        <td>{element.name}</td>
        <td>{element.surname}</td>
        <td>{element.patronymic}</td>
        <td>{element.email}</td>
        <td>{element.address}</td>
        <td>{element.number_phone}</td>
      </tr>
    );
  });

  const getRealEstateObjects = () => {
    axios
      .get("http://localhost:8000/api/all_peoples_db_life")
      .then((response) => {
        setElements(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getRealEstateObjects();
  }, []);
  return (
    <div className="req">
      <img
        src={Arrow}
        className="arrow"
        alt="arrow"
        onClick={() => navigate(-1)}
      />
      <div className="wrapper">
        <h2 style={{ textAlign: "center" }}>
            Клиенты, застраховавшие свою жизнь за последний месяц
        </h2>
        {isLoading ? (
          <></>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Отчество</th>
                <th>E-mail</th>
                <th>Адрес</th>
                <th>Номер телефона</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        )}
      </div>
    </div>
  );
};
