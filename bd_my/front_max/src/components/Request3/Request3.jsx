import { Table } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Arrow from "../../assets/back-arrow.png";
import { useState } from "react";
import axios from "axios";

export const Request3 = () => {
  const [saleFrom, setSaleFrom] = useState("");
  const [saleTo, setSaleTo] = useState("");
  const [elements, setElements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const rows = elements.map((element) => (
    <tr key={element.id}>
      <td>{element.name_object}</td>
      <td>{element.cost_object}</td>
      <td>{element.type_of_insurance_id[0].type_of_insurance}</td>
    </tr>
  ));
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `http://localhost:8000/api/objects_sum?insurance_sum=${saleFrom}`
      )
      .then((response) => {
        setElements(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="req">
      <img
        src={Arrow}
        className="arrow"
        alt="arrow"
        onClick={() => navigate(-1)}
      />
      <h2 style={{ textAlign: "center" }}>Объекты, застрахованные на заданную сумму</h2>
      <div className="wrapper">
        <div className="req-flex">
          {isLoading ? (
            <form className="form-body" onSubmit={(e) => handleSubmit(e)}>
              <input
                className="input"
                placeholder="Введите минимальную сумму"
                value={saleFrom}
                onChange={(e) => setSaleFrom(e.target.value)}
              />
              <button className="form-button">Создать</button>
            </form>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Наименование объекта</th>
                  <th>Стоимость объекта страхования</th>
                  <th>Вид страховки</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};
