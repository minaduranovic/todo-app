import { useDebugValue, useState } from "react";
import { useEffect } from "react";

const ToDo = () => {
  const [text, setText] = useState("");
  const handleChange = (event) => {
    setText(event.target.value);
  };
  useEffect(() => {
    console.log(text);
  }, [text]);
  return (
    <div>
      <h2> TODO APP </h2>
      <div className="input-wrapper">
        <input
          type="text"
          className="input"
          onChange={(event) => handleChange(event)}
          value={text}
        />
        <button className="add-button"> +Add</button>
      </div>
    </div>
  );
};
export default ToDo;
