import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const ToDo = () => {
  const [text, setText] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const TODO_STORAGE_KEY = "toDoList";

  const handleChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    console.log(todoList);
  }, [todoList]);

  const handleCheckTodoItem = (itemId) => {
    const itemToCheckIndex = todoList.findIndex((item) => item.id === itemId);
    const todoListCopy = [...todoList];
    todoListCopy[itemToCheckIndex].isCompleted = true;

    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todoListCopy));
    setTodoList(todoListCopy);
  };
  const onDelete= (item) => {
    const todoListCopy = [...todoList];
    const itemToDeleteIndex = todoListCopy.findIndex((item) => item.id === item.id);

    todoListCopy.splice(itemToDeleteIndex,1);
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todoListCopy));
    setTodoList(todoListCopy);

  }
  const onEdit = (item) => {
    setText(item.text);
    setItemToEdit(item);
    setIsEditMode(true);
  };
  const addOrEditItem = () => {
    let newItem;
    if (isEditMode) {
      newItem = {
        ...itemToEdit,
        text: text,
      };
      const itemToEditIndex = todoList.findIndex(
        (item) => item.id === newItem.id
      );
      const todoListCopy = [...todoList];

      todoListCopy[itemToEditIndex] = newItem;
      localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todoListCopy));
      setTodoList(todoListCopy);
      setIsEditMode(false);
      setItemToEdit(null);
      
    } else {
      newItem = {
        id: uuidv4(),
        text: text,
        isCompleted: false,
      };
      setTodoList((prevState) => {
        localStorage.setItem(
          TODO_STORAGE_KEY,
          JSON.stringify([...prevState, newItem])
        );
        return [...prevState, newItem];
      });
    }

    setText("");
  };

  useEffect(() => {
    console.log("prvo ucitavanje");
    const toDos = localStorage.getItem(TODO_STORAGE_KEY);
    if (toDos) {
      setTodoList(JSON.parse(toDos));
    }
  }, []);

  return (
    <div>
      <h2> TODO APP </h2>
      <div className="input-wrapper">
        <input
          type="text"
          className="input"
          onChange={handleChange}
          value={text}
        />
        <button className="add-button" onClick={addOrEditItem} disabled={!text}>
          {isEditMode ? 'Update': 'Add' }
        </button>
      </div>
      <div>
        {todoList.map((todoItem) => (
          <div key={todoItem.id} className={`todo-item-wrapper`}>
            <h3 className={`${todoItem.isCompleted ? "line-through" : ""}`}>
              {" "}
              {todoItem.text}
            </h3>
            <div>
              <button onClick={() => handleCheckTodoItem(todoItem.id)}>
                Check
              </button>
              <button class="edit-button" onClick={() => onEdit(todoItem)}>
                Edit
              </button>
              <button disabled={!todoItem.isCompleted} class="edit-button" onClick={() => onDelete(todoItem)}>
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDo;
