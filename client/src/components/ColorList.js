import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [adding, setAdding] = useState(false);
  const [colorToAdd, setColorToAdd] = useState({
    color: "",
    code: { hex: "" }
  });

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        const newColorsList = colors.map(item => {
          return item.id !== res.data.id ? item : colorToEdit;
        });
        updateColors(newColorsList);

        setEditing(false);
      })
      .catch(err => console.log(err.message));
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        const newColorsList = colors.filter(item => {
          return item.id !== color.id;
        });
        updateColors(newColorsList);
      })
      .catch(err => console.log(err.message));
  };

  const addColor = e => {
    e.preventDefault();
    console.log(colorToAdd);
    axiosWithAuth()
      .post(`http://localhost:5000/api/colors/`, colorToAdd)
      .then(res => {
        const newColorsList = res.data;
        updateColors(newColorsList);
        setAdding(false);
      })
      .catch(err => err.message);
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.length
          ? colors.map(color => (
              <li key={color.color} onClick={() => editColor(color)}>
                <span>
                  <span
                    className="delete"
                    onClick={e => {
                      e.stopPropagation();
                      deleteColor(color);
                    }}
                  >
                    x
                  </span>{" "}
                  {color.color}
                </span>
                <div
                  className="color-box"
                  style={{ backgroundColor: color.code.hex }}
                />
              </li>
            ))
          : null}
      </ul>
      <button
        onClick={e => {
          e.preventDefault();
          setAdding(true);
        }}
      >
        Add Color
      </button>
      {adding && (
        <form onSubmit={addColor}>
          <legend>add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToAdd({ ...colorToAdd, code: { hex: e.target.value } })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">add</button>
            <button
              onClick={() => {
                setAdding(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      {editing && (
        <form id="add-form" onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
