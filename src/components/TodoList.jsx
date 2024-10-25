import TodoItem from "./TodoItem";

const TodoList = ({ todoList, onCheck, onEdit, onDelete }) => {
  return (
    <div>
      {todoList.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          onCheck={onCheck}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
