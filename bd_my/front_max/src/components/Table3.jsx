import Arrow from "../assets/back-arrow.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Input } from "@mantine/core";
import axios from "axios";

export const Table3 = () => {
  const navigate = useNavigate();

  const [elements, setElements] = useState([]);
  const [editingIds, setEditingIds] = useState([]);
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
      .delete(`http://localhost:8000/api/delete_peoples_db/${id}`)
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
    console.log(updatedElement);
    axios
      .put(`http://localhost:8000/api/update_clients/${id}`, updatedElement)
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
              name="name"
              defaultValue={element.name}
            />
          ) : (
            element.name
          )}
        </td>
        <td>
          {isEditing ? (
            <Input
              w={"100px"}
              name="surname"
              defaultValue={element.surname}
            />
          ) : (
            element.surname
          )}
        </td>
        <td>
          {isEditing ? (
            <Input
              w={"100px"}
              name="patronymic"
              defaultValue={element.patronymic}
            />
          ) : (
            element.patronymic
          )}
        </td>
        <td>
          {isEditing ? (
            <Input
              w={"100px"}
              name="email"
              defaultValue={element.email}
            />
          ) : (
            element.email
          )}
        </td>
        <td>
          {isEditing ? (
            <Input
              w={"100px"}
              name="address"
              defaultValue={element.address}
            />
          ) : (
            element.address
          )}
        </td>
        <td>
          {isEditing ? (
            <Input
              w={"100px"}
              name="number_phone"
              defaultValue={element.number_phone}
            />
          ) : (
            element.number_phone
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
      .get("http://localhost:8000/api/get_all_clients")
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
        <h2 style={{ textAlign: "center" }}>Список клиентов</h2>
        <div className="gap">
          {isLoading ? (
            <></>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th />
                  <th>Имя</th>
                  <th>Фамилия</th>
                  <th>Отчество</th>
                  <th>E-Mail</th>
                  <th>Адрес</th>
                  <th>Номер телефона</th>
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
