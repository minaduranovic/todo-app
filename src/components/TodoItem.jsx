const TodoItem = ({ item, onCheck, onEdit, onDelete }) => {
    return (
      <div className="todo-item-wrapper">
        <h3 className={item.isCompleted ? "line-through" : ""}>{item.text}</h3>
        <div>
          <button onClick={() => onCheck(item.id)}>Check</button>
          <button onClick={() => onEdit(item)}>Edit</button>
          <button
            onClick={() => onDelete(item.id)}
            disabled={!item.isCompleted}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };
  
  export default TodoItem;
  