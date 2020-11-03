import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import InputField from "./components/InputField";
import Notes from "./components/Notes";
import Archived from "./components/Archived";
import MenuBar from "./components/MenuBar";
import "./App.scss";
import placeItems from "./layout.js";

class App extends Component {
  localStorage = window.localStorage;
  constructor(props) {
    super(props);

    // binding methods
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.toggleArchived = this.toggleArchived.bind(this);
    this.togglePinned = this.togglePinned.bind(this);
    this.setFavColor = this.setFavColor.bind(this);
  }

  state = {
    notes: [],
  };

  componentDidMount() {
    console.log('MOUNT AGAIN');
    // get notes
    let storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes && storedNotes.length) {
      this.setState({ notes: [...storedNotes] });
    }

    // remember user favourite mode
    let mode = localStorage.getItem("user-mode");
    if (mode && mode === "dark") {
      document.querySelector(".toggle").classList.add("dark");
      document.body.classList.add("dark");
    }

    this.makeTransition();

    // place items on resize
    window.addEventListener("resize", () => {
      let parents = document.querySelectorAll(".notes");
      this.callPlaceItems(parents);
    });

  }

  componentDidUpdate() {

    setTimeout(() => {
      let parents = document.querySelectorAll(".notes");
      this.callPlaceItems(parents);
    }, 150)

  }

  callPlaceItems(parents) {
    setTimeout(() => { // timeout will force function to wait untill items transitioning ends (e.g. adding new note or archiving one, etc)
      parents.forEach((parent) => {
        if (parent.childNodes.length > 0) {
          placeItems(parent);
        }
      });
    }, 100);
  }

  makeTransition() {
    let notes = document.querySelectorAll(".note");
    notes.forEach((note, i) => {
      note.style.transition = " left 0s";
      note.style.left = "-150%";
    });

    setTimeout(function () {
      let notes = document.querySelectorAll(".note");
      let notesLength = notes.length;
      let duration = 1;
      notes.forEach((note, i) => {
        note.style.left = "0";
        note.style.transition =
          i === 0
            ? "left " + (duration / notesLength) * 1 + "s"
            : "left " + (duration / notesLength) * (i + 1) + "s";
      });
    }, 100);
  }

  // Add A Note
  addNote(note) {
    let notes = this.state.notes;
    let newNote = {
      id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
      title: note.title,
      body: note.body,
      isSelected: false,
      archived: false,
      completed: false,
      pinned: false,
    };
    if (localStorage.getItem("notes")) {
      let storedNotes = JSON.parse(localStorage.getItem("notes"));
      localStorage.setItem("notes", JSON.stringify([...storedNotes, newNote]));
    } else {
      localStorage.setItem("notes", JSON.stringify([newNote]));
    }
    this.setState({ notes: [...JSON.parse(localStorage.getItem("notes"))] });
    let parents = document.querySelectorAll(".notes");
    this.callPlaceItems(parents);
  }

  toggleOpen(e) {
    let id = e.target.dataset.id;
    let isOut = e.target.dataset.out;
    let clonedNotes = [...this.state.notes];
    clonedNotes.forEach((note) => {
      if (note.id === Number(id)) {
        if (!note.isSelected) {
          note.isSelected = !note.isSelected;
        }
        if (isOut) {
          note.isSelected = !note.isSelected;
        }
      }
    });
    this.setState({ notes: clonedNotes });
  }

  togglePinned(id) {
    let clonedNotes = [...this.state.notes];
    clonedNotes.forEach((note) => {
      if (note.id === Number(id)) {
        note.archived = false;
        note.pinned = !note.pinned;
      }
    });
    localStorage.setItem("notes", JSON.stringify(clonedNotes));
    this.setState({ notes: clonedNotes });
    setTimeout(() => {
      let parents = document.querySelectorAll(".notes");
      this.callPlaceItems(parents)
    }, 0)
  }

  setFavColor(id, color) {
    let clonedNotes = [...this.state.notes];
    clonedNotes.forEach(note => {
      if (note.id === Number(id)) {
        note.favcolor = color
      }
    });
    localStorage.setItem("notes", JSON.stringify(clonedNotes));
    this.setState({notes: clonedNotes});
  }

  removeNote(e) {
    let filteredNotes = this.state.notes.filter(
      (note) => note.id !== Number(e.target.dataset.id)
    );
    localStorage.setItem("notes", JSON.stringify(filteredNotes));
    this.setState({ notes: filteredNotes });
    console.log("from remove", this.state.notes);
  }

  toggleArchived(id) {
    let clonedNotes = [...this.state.notes];
    clonedNotes.forEach((note) => {
      if (note.id === Number(id)) {
        note.archived = !note.archived;
        note.completed = false;
        // note.pinned = false;
      }
      note.isSelected = false;
    });
    localStorage.setItem("notes", JSON.stringify(clonedNotes));
    this.setState({ notes: clonedNotes });
    console.log("called", clonedNotes);
  }

  render() {
    return (
      <div id="app" className="App">
        <Router>
          <MenuBar />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return (
                  <React.Fragment>
                    <h1>Your Notes</h1>
                    <InputField addNote={this.addNote} />
                    <Notes
                      togglePinned={this.togglePinned}
                      notes={this.state.notes}
                      toggleArchived={this.toggleArchived}
                      toggleOpen={this.toggleOpen}
                      setFavColor={this.setFavColor}
                    />
                  </React.Fragment>
                );
              }}
            ></Route>
            <Route
              exact
              path="/archived-notes"
              render={() => {
                let parents = document.querySelectorAll(".notes");
                parents.forEach((parent) => {
                  if (parent.childNodes.length > 0) {
                    placeItems(parent);
                  }
                });
                return (
                  <React.Fragment>
                    <h1>Archived Notes</h1>
                    {
                      this.state.notes.filter(note => note.archived).length > 0? (                    <Archived
                        notes={this.state.notes}
                        makeTransition={this.makeTransition}
                        removeNote={this.removeNote}
                        toggleOpen={this.toggleOpen}
                        toggleArchived={this.toggleArchived}
                        togglePinned={this.togglePinned}
                        setFavColor={this.setFavColor}
                      />
  
                      ) : (
                        <h3>No Archived Notes Here.</h3>
                      )
                    }
                  </React.Fragment>
                );
              }}
            ></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
