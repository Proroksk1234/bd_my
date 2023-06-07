import { Link } from "react-router-dom";
import Arrow from "../assets/back-arrow.png";
import { useNavigate } from "react-router-dom";

export const Reposts = () => {
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
        <div className="reports-left">
          <Link className="report-link" to="/reports/request1">
            Клиенты, застраховавшие свою жизнь за последний месяц
          </Link>
          <Link className="report-link" to="/reports/request2">
            Полученные/выплаченные суммы страховок
          </Link>
          <Link className="report-link" to="/reports/request3">
            Объекты, застрахованные на заданную сумму
          </Link>
        </div>
        <div className="reports-right">
          <Link className="report-link" to="/reports/request4">
            Динамика заключения страховых договоров
          </Link>
          <Link className="report-link" to="/reports/request5">
            Общий список клиентов и агентов
          </Link>
        </div>
      </div>
    </>
  );
};
