import Arrow from "../assets/back-arrow.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Input, Select } from "@mantine/core";
import axios from "axios";

export const Table2 = () => {
  const navigate = useNavigate();

  const [elements, setElements] = useState([]);
  const [editingIds, setEditingIds] = useState([]);
  const [select1, setSelect1] = useState([]);
  const [selectedTypeOfInsurance, setSelectedTypeOfInsurance] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
      .delete(`http://localhost:8000/api/delete_objects_of_insurance/${id}`)
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
    const { name_object, cost_object, type_of_insurance_id } = updatedElement;
    const data = {
      name_object,
      cost_object: Number(cost_object),
      type_of_insurance_id: selectedTypeOfInsurance,
    };
    console.log(data);
    axios
      .put(
        `http://localhost:8000/api/update_objects_of_insurance/${id}`,
         data,
      )
      .then(() => {
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
        const selectedObject1 = select1.find(
          (option) => option.value === selectedTypeOfInsurance
        );
        const selectedObjectLabel = selectedObject1
          ? selectedObject1.label
          : "";
        const objTypeOfInsuranceId = [{ type_of_insurance: selectedObjectLabel }];
        editedElement.type_of_insurance_id = objTypeOfInsuranceId;

        updateObj(editedElement.id, editedElement);
      }
    });

    setEditingIds([]);
  };

  const rows = elements.map((element) => {
    const isEditing = editingIds.includes(element.id);

    return (
      <tr key={element.id} id={`row-${element.id}`}>
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
            <Input
              w={"100px"}
              name="name_object"
              defaultValue={element.name_object}
            />
          ) : (
            element.name_object
          )}
        </td>
        <td>
          {isEditing ? (
            <Input
              w={"100px"}
              name="cost_object"
              defaultValue={element.cost_object}
            />
          ) : (
            element.cost_object
          )}
        </td>
        <td>
          {isEditing ? (
            <Select
              w={"100px"}
              name="type_of_insurance_id"
              data={select1}
              value={selectedTypeOfInsurance}
              onChange={setSelectedTypeOfInsurance}
            />
          ) : (
            element.type_of_insurance_id[0].type_of_insurance
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
      .get("http://localhost:8000/api/get_all_objects_of_insurance")
      .then((response) => {
        setElements(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getSelect1 = () => {
    axios
      .get("http://localhost:8000/api/get_all_types_of_insurance")
      .then((response) => {
        const res = response.data.map((e) => ({
          value: e.id,
          label: e.type_of_insurance,
        }));
        setSelect1(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getRealEstateObjects();
    getSelect1();
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
        <h2 style={{ textAlign: "center" }}>Объекты страхования</h2>
        <div className="gap">
          {isLoading ? (
            <></>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th />
                  <th>Название объекта страхования</th>
                  <th>Стоимость объекта страхования</th>
                  <th>Вид страхования</th>
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
