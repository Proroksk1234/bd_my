import { Table } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Arrow from "../../assets/back-arrow.png";
import { useState, useEffect } from "react";
import axios from "axios";

export const Request5 = () => {
  const navigate = useNavigate();
  const [elements, setElements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.type_people_id[0].type_people}</td>
      <td>{element.name}</td>
      <td>{element.surname}</td>
      <td>{element.patronymic}</td>
      <td>{element.email}</td>
      <td>{element.address}</td>
      <td>{element.number_phone}</td>
    </tr>
  ));
  const getRealEstateObjects = () => {
    axios
      .get("http://localhost:8000/api/all_clients_and_agents")
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
          Общий список клиентов и агентов
        </h2>
        {isLoading ? (
          <></>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Кем является</th>
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
