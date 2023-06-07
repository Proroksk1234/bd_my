import Arrow from "../assets/back-arrow.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Input, Select } from "@mantine/core";
import axios from "axios";
export const Table6 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [elements, setElements] = useState([]);

  const rows = elements.map((element) => {
    return (
      <tr key={element.name} id={`row-${element.id}`}>
        <td>{element.insurance_activity_id[0].contract_number}</td>
        <td>{element.payments}</td>
        <td>{element.received}</td>
      </tr>
    );
  });
  const getRealEstateObjects = () => {
    axios
      .get("http://localhost:8000/api/get_all_payments_under_the_contract")
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
    <div className="tables">
      <div className="wrapper">
        <img
          src={Arrow}
          className="arrow"
          alt="arrow"
          onClick={() => navigate(-1)}
        />
        <h2 style={{ textAlign: "center" }}>Сделки</h2>
        <div className="gap">
          {isLoading ? (
            <></>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Номер контракта</th>
                  <th>Полученная сумма</th>
                  <th>Выплаченная сумма</th>
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
