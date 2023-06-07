import { Link } from "react-router-dom";
import Arrow from "../assets/back-arrow.png";
import { useNavigate } from "react-router-dom";

export const Tables = () => {
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
          <Link className="home-link" to="/tables/types-of-insurance">
            Виды страхования
          </Link>
          <Link className="home-link" to="/tables/objects-of-insurance">
            Объекты страхования
          </Link>
          <Link className="home-link" to="/tables/clients">
            Клиенты
          </Link>
        </div>
        <div className="forms-right">
          <Link className="home-link" to="/tables/agents">
            Агенты
          </Link>
          <Link className="home-link" to="/tables/insurance-activity">
            Страховая деятельность
          </Link>
          <Link className="home-link" to="/tables/payments-under-the-contract">
            Денежные транзакции
          </Link>
        </div>
      </div>
    </>
  );
};
