import React from "react";

// svg icons
import { ReactComponent as PinIcon } from "../assets/pin.svg";
import { ReactComponent as ArchiveIcon } from "../assets/archive.svg";
import { ReactComponent as DeleteIcon } from "../assets/delete.svg";

class Note extends React.Component {
  render() {
    const {
      note,
      toggleArchived,
      togglePinned,
    } = this.props;
    let { title, body } = note;
    body = body.length > 200 ? body.substr(0, 150) + "..." : body;
    return (
      <div
        id="note"
        className="note note-card"
        style={{ backgroundColor: `${note.favcolor}` }}
        data-id={note.id}
      >
        <div
          id="noteContent"
          className="note-content"
          onClick={(e) => {
            console.log(e.target.parentNode);
          }}
        >
          <div className="title">{title}</div>
          <div id="body" className="body">
            {body}
          </div>
        </div>
        <div
          className="icon pin-icon"
          onClick={() => {
            togglePinned(note.id);
          }}
        >
          <PinIcon />
        </div>
        <div className="settings">
          <div
            className="icon archive"
            onClick={() => {
              toggleArchived(note.id);
            }}
          >
            <ArchiveIcon />
          </div>

          {/* <div className="icon colors">
            <ColorPaletteIcon
              onClick={() => {
                console.log(note.id);
                let parent = document.querySelector(`[data-id='${note.id}']`);
                parent.classList.toggle("active");
                console.log(parent);
                let colors = parent.querySelectorAll(".color-choice");
                colors.forEach((color) => {
                  color.classList.toggle("on");
                });
              }}
            />
            <div className="colors-container">
              <div
                className="color-choice one"
                style={{ backgroundColor: "#eee" }}
                data-color="#eee"
                onClick={(e) => {
                  setFavColor(note.id, e.target.dataset.color);
                  let parent = document.querySelector(`[data-id='${note.id}']`);
                  console.log("parent from color paletter: ", parent);
                  parent.classList.toggle("active");
                  let colors = parent.querySelectorAll(".color-choice");
                  colors.forEach((color) => {
                    color.classList.toggle("on");
                  });
                }}
              ></div>
              <div
                className="color-choice two"
                style={{ backgroundColor: "#1abc9c" }}
                data-color="#1abc9c"
                onClick={(e) => {
                  setFavColor(note.id, e.target.dataset.color);
                  let parent = document.querySelector(`[data-id='${note.id}']`);
                  console.log("parent from color paletter: ", parent);
                  parent.classList.toggle("active");
                  let colors = parent.querySelectorAll(".color-choice");
                  colors.forEach((color) => {
                    color.classList.toggle("on");
                  });
                }}
              ></div>
              <div
                className="color-choice three"
                style={{ backgroundColor: "#3498db" }}
                data-color="#3498db"
                onClick={(e) => {
                  setFavColor(note.id, e.target.dataset.color);
                  let parent = document.querySelector(`[data-id='${note.id}']`);
                  console.log("parent from color paletter: ", parent);
                  parent.classList.toggle("active");
                  let colors = parent.querySelectorAll(".color-choice");
                  colors.forEach((color) => {
                    color.classList.toggle("on");
                  });
                }}
              ></div>
              <div
                className="color-choice four"
                style={{ backgroundColor: "#9b59b6" }}
                data-color="#9b59b6"
                onClick={(e) => {
                  setFavColor(note.id, e.target.dataset.color);
                  let parent = document.querySelector(`[data-id='${note.id}']`);
                  console.log("parent from color paletter: ", parent);
                  parent.classList.toggle("active");
                  let colors = parent.querySelectorAll(".color-choice");
                  colors.forEach((color) => {
                    color.classList.toggle("on");
                  });
                }}
              ></div>
              <div
                className="color-choice five"
                style={{ backgroundColor: "#f1c40f" }}
                data-color="#f1c40f"
                onClick={(e) => {
                  setFavColor(note.id, e.target.dataset.color);
                  let parent = document.querySelector(`[data-id='${note.id}']`);
                  console.log("parent from color paletter: ", parent);
                  parent.classList.toggle("active");
                  let colors = parent.querySelectorAll(".color-choice");
                  colors.forEach((color) => {
                    color.classList.toggle("on");
                  });
                }}
              ></div>
              <div
                className="color-choice six"
                style={{ backgroundColor: "#e74c3c" }}
                data-color="#e74c3c"
                onClick={(e) => {
                  setFavColor(note.id, e.target.dataset.color);
                  let parent = document.querySelector(`[data-id='${note.id}']`);
                  console.log("parent from color paletter: ", parent);
                  parent.classList.toggle("active");
                  let colors = parent.querySelectorAll(".color-choice");
                  colors.forEach((color) => {
                    color.classList.toggle("on");
                  });
                }}
              ></div>
            </div>
          </div>
          <div className="icon reminder">
            <ReminderIcon />
          </div> */}

          <div className="icon delete">
            <DeleteIcon />
          </div>
        </div>
      </div>
    );
  }
}

export default Note;
