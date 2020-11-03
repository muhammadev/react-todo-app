import React, { Component } from "react";
import Note from "./Note";
import placeItems from "../layout";

class Notes extends Component {
  componentDidMount() {
    // console.log('MOUNT AGAIN');
    let parents = document.querySelectorAll(".notes");
    parents.forEach((parent) => {
      if (parent.childNodes.length > 0) {
        placeItems(parent);
      }
    });
    setTimeout(() => {
      let parents = document.querySelectorAll(".notes");
      parents.forEach((parent) => {
        if (parent.childNodes.length > 0) {
          placeItems(parent);
        }
      });
    }, 150);
  }
  render() {
    let { notes, toggleArchived, toggleOpen, togglePinned, setFavColor } = this.props;
    let active = notes.filter(
      (note) => !note.completed && !note.archived && !note.pinned
    );
    let pinned = notes.filter(
      (note) => note.pinned && !note.completed && !note.archived
    );
    let notesTitleStyle = {
      textAlign: "start",
      marginBottom: "10px",
      paddingLeft: "3px",
    };
    return notes.length ? (
      <React.Fragment>
        {pinned.length > 0 ? (
          <React.Fragment>
            <h1 style={{
              textAlign: "start",
              paddingBottom: 0,
              marginLeft: "2%"
              }}>Pinned</h1>
            <div className="notes pinned">
              {pinned.map((note, index) => (
                <Note
                  key={index}
                  note={note}
                  toggleArchived={toggleArchived}
                  togglePinned={togglePinned}
                  setFavColor={setFavColor}
                />
              ))}
            </div>
          </React.Fragment>
        ) : null}
        {active.length > 0 ? (
          <React.Fragment>
            {/* <h1>Notes</h1> */}
            <div className="notes">
              {active.map((note, index) => (
                <Note
                  key={index}
                  note={note}
                  toggleArchived={toggleArchived}
                  togglePinned={togglePinned}
                  setFavColor={setFavColor}
                />
              ))}
            </div>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    ) : (
      <p>"Note Number One: Add Note Number One"</p>
    );
  }
}

export default Notes;
