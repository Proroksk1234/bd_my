import { useNavigate } from "react-router-dom";
import Arrow from "../../assets/back-arrow.png";
import { useState, useEffect } from "react";
import { Select } from "@mantine/core";
import axios from "axios";

export const Form5 = () => {
  const navigate = useNavigate();
  const [elements, setElements] = useState([]);
  const [elements2, setElements2] = useState([]);
  const [elements3, setElements3] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [objType, setObjType] = useState("");
  const [area, setArea] = useState("");
  const [adres, setAdres] = useState("");
  const [number, setNumber] = useState("");
  const [summ, setSumm] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      client_id: area,
      agent_id: objType,
      objects_of_insurance_id: adres,
      contract_number: number,
      summ_activity: Number(summ),
      date: date,
    };
    axios
      .post("http://localhost:8000/api/post_insurance_activity", data)
      .then((response) => {
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getRealEstateObjects = () => {
    axios
      .get("http://localhost:8000/api/get_all_clients")
      .then((response) => {
        const res = response.data.map((e) => ({
          value: e.id,
          label: `${e.name} ${e.surname}`,
        }));
        setElements(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getRealEstateObjects2 = () => {
    axios
      .get("http://localhost:8000/api/get_all_agents")
      .then((response) => {
        const res = response.data.map((e) => ({
          value: e.id,
          label: `${e.name} ${e.surname}`,
        }));
        setElements2(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getRealEstateObjects3 = () => {
    axios
      .get("http://localhost:8000/api/get_all_objects_of_insurance")
      .then((response) => {
        const res = response.data.map((e) => ({
          value: e.id,
          label: e.name_object,
        }));
        setElements3(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getRealEstateObjects();
    getRealEstateObjects2();
    getRealEstateObjects3();
  }, []);
  return (
    <div className="form-page">
      <img
        src={Arrow}
        className="arrow"
        alt="arrow"
        onClick={() => navigate(-1)}
      />
      <h2>Объекты недвижимости</h2>
      <div className="form">
        {isLoading ? (
          <></>
        ) : (
          <form className="form-body" onSubmit={handleSubmit}>
            <Select
              placeholder="клиент"
              value={area}
              onChange={setArea}
              data={elements}
            />
            <Select
              placeholder="агент"
              value={objType}
              onChange={setObjType}
              data={elements2}
            />
            <Select
              placeholder="страховой объект"
              value={adres}
              onChange={setAdres}
              data={elements3}
            />
            <input
              className="input"
              placeholder="номер"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <input
              className="input"
              placeholder="стоимость"
              value={summ}
              onChange={(e) => setSumm(e.target.value)}
            />
            <input
              className="input"
              placeholder="Дата"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button className="form-button">Создать</button>
          </form>
        )}
      </div>
    </div>
  );
};
