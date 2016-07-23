import React, { Component } from 'react';

// import Welcome from './welcome';
import EntryBar from './entry_bar';
import Notes from './notes';
import Immutable from 'immutable';


// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      notes: Immutable.Map(),
      zIndexCount: 0,
    };

    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.writeNote = this.writeNote.bind(this);
  }

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

  deleteNote(input) {
    const newState = {
      notes: this.state.notes.delete(input),
    };
    this.setState(newState);
  }

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
