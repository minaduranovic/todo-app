const TodoInput = ({ text, setText, isEditMode, onAddOrEdit }) => {
    const handleChange = (e) => setText(e.target.value);
  
    return (
      <div className="input-wrapper">
        <input
          type="text"
          className="input"
          onChange={handleChange}
          value={text}
        />
        <button className="add-button" onClick={onAddOrEdit} disabled={!text}>
          {isEditMode ? "Update" : "Add"}
        </button>
      </div>
    );
  };
  
  export default TodoInput;
  