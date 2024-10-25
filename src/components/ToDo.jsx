import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const ToDo = () => {
  const [text, setText] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const TODO_STORAGE_KEY = "toDoList";

  useEffect(() => {
    const toDos = localStorage.getItem(TODO_STORAGE_KEY);
    if (toDos) setTodoList(JSON.parse(toDos));
  }, []);

  const handleAddOrEditItem = () => {
    if (isEditMode) {
      const updatedList = todoList.map((item) =>
        item.id === itemToEdit.id ? { ...itemToEdit, text } : item
      );
      setTodoList(updatedList);
      localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(updatedList));
      setIsEditMode(false);
      setItemToEdit(null);
    } else {
      const newItem = { id: uuidv4(), text, isCompleted: false };
      const updatedList = [...todoList, newItem];
      setTodoList(updatedList);
      localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(updatedList));
    }
    setText("");
  };

  const handleEdit = (item) => {
    setText(item.text);
    setItemToEdit(item);
    setIsEditMode(true);
  };

  const handleCheck = (itemId) => {
    const updatedList = todoList.map((item) =>
      item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodoList(updatedList);
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(updatedList));
  };

  const handleDelete = (itemId) => {
    const updatedList = todoList.filter((item) => item.id !== itemId);
    setTodoList(updatedList);
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(updatedList));
  };

  return (
    <div>
      <h2>TODO APP</h2>
      <TodoInput
        text={text}
        setText={setText}
        isEditMode={isEditMode}
        onAddOrEdit={handleAddOrEditItem}
      />
      <TodoList
        todoList={todoList}
        onCheck={handleCheck}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ToDo;
