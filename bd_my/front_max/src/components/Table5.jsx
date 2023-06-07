import Arrow from "../assets/back-arrow.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Input, Select } from "@mantine/core";
import axios from "axios";
export const Table5 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [select2, setSelect2] = useState([]);
  const [selectedObjectType, setSelectedObjectType] = useState("");
  const [label2, setLabel2] = useState("");
  const [select3, setSelect3] = useState([]);
  const [selectedBuyerType, setSelectedBuyerType] = useState("");
  const [label3, setLabel3] = useState("");
  const [select4, setSelect4] = useState([]);
  const [label4, setLabel4] = useState("");
  const [selectedSalesmanType, setSelectedSalesmanType] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [elements, setElements] = useState([]);
  const [editingIds, setEditingIds] = useState([]);

  const startEditing = (id) => {
    if (!editingIds.includes(id)) {
      setEditingIds((prevIds) => [...prevIds, id]);
    }
  };

  const cancelEditing = (id) => {
    setEditingIds((prevIds) => prevIds.filter((editingId) => editingId !== id));
  };
  const deleteObj = (id) => {
    axios
      .delete(`http://localhost:8000/api/delete_insurance_activity/${id}`)
      .then((response) => {
        setElements((prevElements) =>
          prevElements.filter((element) => element.id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    deleteObj(id);
  };
  const updateObj = (id, updatedElement) => {
    const date = updatedElement.date.split("T")[0];
    const { contract_number, summ_activity } = updatedElement;
    const data = {
      client_id: selectedObjectType,
      agent_id: selectedBuyerType,
      objects_of_insurance_id: selectedSalesmanType,
      contract_number: Number(contract_number),
      summ_activity: Number(summ_activity),
      date,
    };
    console.log(data);
    axios
      .put(`http://localhost:8000/api/update_insurance_activity/${id}`, data)
      .then((response) => {
        setElements((prevElements) =>
          prevElements.map((element) =>
            element.id === id ? updatedElement : element
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const saveChanges = () => {
    elements.forEach((element) => {
      const isEditing = editingIds.includes(element.id);

      if (isEditing) {
        const rowInputs = document.querySelectorAll(`#row-${element.id} input`);
        let editedElement = { ...element };

        rowInputs.forEach((input) => {
          editedElement[input.name] = input.value;
        });
        const selectedObj = select2.find(
          (option) => option.value === selectedObjectType
        );
        const selectedBuyer = select3.find(
          (option) => option.value === selectedBuyerType
        );
        const selectedSalesman = select4.find(
          (option) => option.value === selectedSalesmanType
        );
        setLabel2(selectedObj.label);
        setLabel3(selectedBuyer.label);
        setLabel4(selectedSalesman.label);

        const selectedObjectLabel = selectedObj ? selectedObj.label : "";
        const selectedBuyerLabel = selectedBuyer ? selectedBuyer.label : "";
        const selectedSalesmanLabel = selectedSalesman
          ? selectedSalesman.label
          : "";
        const objObjectId = [{ obj_type_id: selectedObjectLabel }];
        const objBuyerId = [{ people_type_id: selectedBuyerLabel }];
        const objSalesmanId = [{ people_type_id: selectedSalesmanLabel }];

        editedElement.real_estate_object_id = objObjectId;
        editedElement.buyer_id = objBuyerId;
        editedElement.salesman_id = objSalesmanId;

        updateObj(editedElement.id, editedElement);

        updateObj(editedElement.id, editedElement);
      }
    });
    setIsSaved(true);
    setEditingIds([]);
  };

  const rows = elements.map((element) => {
    const isEditing = editingIds.includes(element.id);

    return (
      <tr key={element.name} id={`row-${element.id}`}>
        <td>
          {isEditing ? (
            <Button color="green" onClick={() => cancelEditing(element.id)}>
              Отменить
            </Button>
          ) : (
            <Button color="green" onClick={() => startEditing(element.id)}>
              Редактировать
            </Button>
          )}
        </td>
        <td>
          {isEditing ? (
            <Select
              w={"220px"}
              name="object_type"
              data={select2}
              value={selectedObjectType}
              onChange={setSelectedObjectType}
            />
          ) : (
            <div>
              {isSaved ? (
                <>{label2}</>
              ) : (
                <div>
                  {`${element.client_id[0].name}
                  ${element.client_id[0].surname}`}
                </div>
              )}
            </div>
          )}
        </td>
        <td>
          {isEditing ? (
            <Select
              w={"100px"}
              name="buyer"
              data={select3}
              value={selectedBuyerType}
              onChange={setSelectedBuyerType}
            />
          ) : (
            <div>
              {isSaved ? (
                <>{label3}</>
              ) : (
                <>{`${element.agent_id[0].name} ${element.agent_id[0].surname}`}</>
              )}
            </div>
          )}
        </td>
        <td>
          {isEditing ? (
            <Select
              w={"100px"}
              name="salesman"
              data={select4}
              value={selectedSalesmanType}
              onChange={setSelectedSalesmanType}
            />
          ) : (
            <div>
              {isSaved ? (
                <>{label4}</>
              ) : (
                <>{`${element.objects_of_insurance_id[0].name_object} ${element.objects_of_insurance_id[0].type_of_insurance_id[0].type_of_insurance}`}</>
              )}
            </div>
          )}
        </td>
        <td>
          {isEditing ? (
            <Input
              w={"100px"}
              name="contract_number"
              defaultValue={element.contract_number}
            />
          ) : (
            element.contract_number
          )}
        </td>
        <td>
          {isEditing ? (
            <Input
              w={"100px"}
              name="date"
              defaultValue={element.date.split("T")[0]}
            />
          ) : (
            element.date.split("T")[0]
          )}
        </td>
        <td>
          {isEditing ? (
            <Input
              w={"100px"}
              name="summ_activity"
              defaultValue={element.summ_activity}
            />
          ) : (
            element.summ_activity
          )}
        </td>
        <td>
          <Button color="red" onClick={() => handleDelete(element.id)}>
            Удалить
          </Button>
        </td>
      </tr>
    );
  });
  const getRealEstateObjects = () => {
    axios
      .get("http://localhost:8000/api/get_all_insurance_activity")
      .then((response) => {
        setElements(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getSelect2 = () => {
    axios
      .get("http://localhost:8000/api/get_all_clients")
      .then((response) => {
        const res = response.data.map((e) => ({
          value: e.id,
          label: `${e.name} ${e.surname}`,
        }));
        setSelect2(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getSelect3 = () => {
    axios
      .get("http://localhost:8000/api/get_all_agents")
      .then((response) => {
        const res = response.data.map((e) => ({
          value: e.id,
          label: `${e.name} ${e.surname}`,
        }));
        setSelect3(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getSelect4 = () => {
    axios
      .get("http://localhost:8000/api/get_all_objects_of_insurance")
      .then((response) => {
        const res = response.data.map((e) => ({
          value: e.id,
          label: `${e.name_object} ${e.cost_object} ${e.type_of_insurance_id[0].type_of_insurance}`,
        }));
        setSelect4(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getSelect2();
    getSelect3();
    getSelect4();
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
                  <th />
                  <th>Клиент</th>
                  <th>Агент</th>
                  <th>Объект страхования</th>
                  <th>Номер телефона</th>
                  <th>Дата</th>
                  <th>Сумма страхования</th>
                  <th />
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          )}
        </div>

        {editingIds.length > 0 && (
          <div className="actions">
            <Button
              className="save-changes"
              color="orange"
              onClick={saveChanges}
            >
              Сохранить изменения
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
