import { Link } from "react-router-dom";
import Arrow from "../assets/back-arrow.png";
import { useNavigate } from "react-router-dom";

export const Forms = () => {
  const navigate = useNavigate();
  return (
    <>
      <img
        src={Arrow}
        className="arrow"
        alt="arrow"
        onClick={() => navigate(-1)}
      />
      <div className="forms">
        <div className="forms-left">
          <Link className="home-link" to="/forms/types-of-insurance">
            Виды страхования
          </Link>
          <Link className="home-link" to="/forms/objects_of_insurance">
            Объекты страхования
          </Link>
          <Link className="home-link" to="/forms/clients">
            Клиенты
          </Link>
        </div>
        <div className="forms-right">
          <Link className="home-link" to="/forms/agents">
            Агенты
          </Link>
          <Link className="home-link" to="/forms/insurance-activity">
            Страховая деятельность
          </Link>
        </div>
      </div>
    </>
  );
};
