import React, { Component } from 'react';

// import Welcome from './welcome';
import EntryBar from './entry_bar';
import Notes from './notes';
import Immutable from 'immutable';

class App extends Component {
  constructor(props) {
    super(props);

    // init component state
    this.state = {
      notes: Immutable.Map(),
      zIndexCount: 0,
    };

    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.writeNote = this.writeNote.bind(this);
  }

  // create a new note
  addNote(input) {
    const id = Math.random().toString();
    const colorList = ['white', 'aqua', 'olive', 'fuchsia', 'gray', 'orange'];
    const index = Math.floor(Math.random() * 6);
    const randomColor = colorList[index];
    const newNote =
      {
        title: input,
        text: '',
        x: 200,
        y: 100,
        zIndex: 0,
        color: randomColor,
      };
    const newState = {
      notes: this.state.notes.set(id, newNote),
    };
    this.setState(newState);
  }

  // delete the note
  deleteNote(id) {
    const newState = {
      notes: this.state.notes.delete(id),
    };
    this.setState(newState);
  }

  // update the note in the notes map
  writeNote(id, newNote, updateZIndex) {
    let addZIndex = 0;
    if (updateZIndex) {
      addZIndex = 1;
    }
    const newState = {
      notes: this.state.notes.update(id, (note) => { return Object.assign({}, note, newNote); }),
      zIndexCount: this.state.zIndexCount + addZIndex,
    };
    this.setState(newState);
  }

  // render function
  render() {
    const notesList = this.state.notes.entrySeq().map(([id, note]) => {
      return (
        <Notes
          id={id}
          key={id}
          note={note}
          deleteNote={this.deleteNote}
          writeNote={this.writeNote}
          zIndexCount={this.state.zIndexCount}
        />
      );
    });
    return (
      <div>
        <EntryBar addNote={this.addNote} />
        {notesList}
      </div>
    );
  }
}

export default App;
