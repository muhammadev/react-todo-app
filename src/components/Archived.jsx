import React, { Component } from "react";
import Note from "./Note";
import placeItems from "../layout";

class Archived extends Component {
  componentDidMount() {
    setTimeout(() => {
      let parents = document.querySelectorAll(".notes");
      parents.forEach(parent => {
        placeItems(parent);
      })
    }, 150)
  }

  render() {
    let { notes, removeNote, toggleOpen, toggleArchived, togglePinned } = this.props;
    let archivedNotes = notes.filter((note) => note.archived);
    return (
      <div className="notes">
        {archivedNotes.length ? (
          archivedNotes.map((note, index) => (
            <Note key={index} note={note} isArchived={true} toggleArchived={toggleArchived} togglePinned={togglePinned}/>
          ))
         ) : (
          <p
            style={{
              textAlign: "center",
            }}
          >
            Nothing Archived!
          </p>
        )}
      </div>
    );
  }
}

export default Archived;
