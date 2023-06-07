import { useNavigate } from "react-router-dom";
import Arrow from "../../assets/back-arrow.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "@mantine/core";

export const Form2 = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [objType, setObjType] = useState("");
  const [elements, setElements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name_object: name,
      cost_object: Number(cost),
      type_of_insurance_id: objType,
    };
    axios
      .post("http://localhost:8000/api/post_objects_of_insurance", data)
      .then((response) => {
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getRealEstateObjects = () => {
    axios
      .get("http://localhost:8000/api/get_all_types_of_insurance")
      .then((response) => {
        const res = response.data.map((e) => ({
          value: e.id,
          label: e.type_of_insurance,
        }));
        setElements(res);
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
    <div className="form-page">
      <img
        src={Arrow}
        className="arrow"
        alt="arrow"
        onClick={() => navigate(-1)}
      />
      <h2>Типы объектов</h2>
      <div className="form">
        {isLoading ? (
          <></>
        ) : (
          <form className="form-body" onSubmit={handleSubmit}>
            <input
              className="input"
              placeholder="название"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="input"
              placeholder="цена"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
            <Select
              placeholder="выбор страховки"
              data={elements}
              value={objType}
              onChange={setObjType}
            />
            <button className="form-button">Создать</button>
          </form>
        )}
      </div>
    </div>
  );
};
