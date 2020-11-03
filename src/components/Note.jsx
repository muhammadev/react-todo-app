import React from "react";

class Note extends React.Component {
  render() {
    const { note, toggleArchived, togglePinned, isArchived, setFavColor } = this.props;
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
          id="nodeContent"
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              id="pin-icon"
              fill="#000"
              d="M17 4a2 2 0 0 0-2-2H9c-1.1 0-2 .9-2 2v7l-2 3v2h6v5l1 1 1-1v-5h6v-2l-2-3V4z"
            />
          </svg>
        </div>
        <div className="settings">
          <div
            className="icon archive"
            onClick={() => {
              toggleArchived(note.id);
            }}
          >
            {isArchived ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#000"
              >
                <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm3-5.5l4-4 4 4-1.41 1.41L13 13.33V17h-2v-3.67l-1.59 1.59L8 13.5z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#000"
              >
                <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z" />
              </svg>
            )}
          </div>

          <div className="icon colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#000"
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
            >
              <path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67A2.5 2.5 0 0 1 12 22zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5a.54.54 0 0 0-.14-.35c-.41-.46-.63-1.05-.63-1.65a2.5 2.5 0 0 1 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z" />
              <circle cx="6.5" cy="11.5" r="1.5" />
              <circle cx="9.5" cy="7.5" r="1.5" />
              <circle cx="14.5" cy="7.5" r="1.5" />
              <circle cx="17.5" cy="11.5" r="1.5" />
            </svg>
            <div className="colors-container">
              <div
                className="color-choice one"
                style={{ backgroundColor: "#eee" }}
                data-color="#eee"
                onClick={(e) => {
                  setFavColor(note.id, e.target.dataset.color)
                }}
              ></div>
              <div
                className="color-choice two"
                style={{ backgroundColor: "#1abc9c" }}
                data-color="#1abc9c"
                onClick={(e) => {
                  setFavColor(note.id, e.target.dataset.color)
                }}
              ></div>
              <div
                className="color-choice three"
                style={{ backgroundColor: "#3498db" }}
                data-color="#3498db"
                onClick={(e) => {
                  setFavColor(note.id, e.target.dataset.color)
                }}
              ></div>
              <div
                className="color-choice four"
                style={{ backgroundColor: "#9b59b6" }}
                data-color="#9b59b6"
                onClick={(e) => {
                  setFavColor(note.id, e.target.dataset.color)
                }}
              ></div>
              <div
                className="color-choice five"
                style={{ backgroundColor: "#f1c40f" }}
                data-color="#f1c40f"
                onClick={(e) => {
                  setFavColor(note.id, e.target.dataset.color)
                }}
              ></div>
              <div
                className="color-choice six"
                style={{ backgroundColor: "#e74c3c" }}
                data-color="#e74c3c"
                onClick={(e) => {
                  setFavColor(note.id, e.target.dataset.color)
                }}
              ></div>
            </div>
          </div>
          <div className="icon reminder">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#000"
            >
              <path d="M13 9h-2v2H9v2h2v2h2v-2h2v-2h-2z" />
              <path d="M18 17v-6c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v6H4v2h16v-2h-2zm-2 0H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6zm-4 5c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z" />
            </svg>
          </div>

          <div className="icon delete">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
              <path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default Note;
