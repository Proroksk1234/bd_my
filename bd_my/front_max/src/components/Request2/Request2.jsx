import { Table } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Arrow from "../../assets/back-arrow.png";
import axios from "axios";

export const Request2 = () => {
  const navigate = useNavigate();
  const [elements, setElements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const rows = elements.map((element) => (
    <tr key={element.id}>
      <td>{element.insurance_activity_id[0].contract_number}</td>
      <td>{element.payments}</td>
      <td>{element.received}</td>
    </tr>
  ));
  const getRealEstateObjects = () => {
    axios
      .get("http://localhost:8000/api/received_for_clients")
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
        <h2 style={{ textAlign: "center" }}>Полученные/выплаченные суммы по договору</h2>
        {isLoading ? (
          <></>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Номер страхового договора</th>
                <th>Полученная сумма</th>
                <th>Выплаченная сумма</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        )}
      </div>
    </div>
  );
};
