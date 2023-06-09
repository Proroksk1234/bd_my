import { useNavigate } from "react-router-dom";
import Arrow from "../../assets/back-arrow.png";
import { useState } from "react";
import axios from "axios";

export const Form1 = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { type_of_insurance: name, cost: Number(cost) };
    axios
      .post("http://localhost:8000/api/post_types_of_insurance", data)
      .then((response) => {
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
          <button className="form-button">Создать</button>
        </form>
      </div>
    </div>
  );
};
