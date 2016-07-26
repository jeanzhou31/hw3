import React, { Component } from 'react';

// import Welcome from './welcome';
import EntryBar from './entry_bar';
import Notes from './notes';
import Immutable from 'immutable';
import firebase from '../firebase';

class App extends Component {
  constructor(props) {
    super(props);

    // init component state
    this.state = {
      notes: Immutable.Map(),
      zIndexCount: 0,
    };
    this.changeZ = this.changeZ.bind(this);
    this.addNote = this.addNote.bind(this);
  }

  componentDidMount() {
    firebase.fetchNotes((snapshot) => {
      if (snapshot.val() && this.state.zIndexCount === 0) {
        // get max zindex
        firebase.fetchZIndex((Zsnapshot) => {
          this.setState({
            zIndexCount: Zsnapshot.val().id,
          });
        });
      }
      // get notes
      this.setState({
        notes: Immutable.Map(snapshot.val()),
      });
    });
  }

  // create a new note
  addNote(input) {
    this.setState({
      zIndexCount: this.state.zIndexCount + 1,
    });
    const colorList = ['white', 'aqua', 'olive', 'fuchsia', 'gray', 'orange'];
    const index = Math.floor(Math.random() * 6);
    const randomColor = colorList[index];
    const newNote =
      {
        title: input,
        text: '',
        x: 200,
        y: 100,
        zIndex: this.state.zIndexCount,
        isEdit: false,
        color: randomColor,
        prevNote: 'end',
      };
    firebase.updateZIndex(this.state.zIndexCount);
    firebase.addNote(newNote);
  }

  // delete the note
  removeNote(id) {
    firebase.removeNote(id);
  }

  // update the position
  changePosition(id, x, y) {
    firebase.changePosition(id, x, y);
  }

  // update the edit status
  changeEdit(id, isEdit) {
    firebase.changeEdit(id, isEdit);
  }

  // update the text
  changeText(id, text) {
    firebase.changeText(id, text);
  }

  // update zindex
  changeZ(id) {
    firebase.changeZ(id, this.state.zIndexCount + 1);
    firebase.updateZIndex(this.state.zIndexCount + 1);
    this.setState({ zIndexCount: this.state.zIndexCount + 1 });
  }

  // update previous note
  changePrev(id, prevNote) {
    firebase.changePrev(id, prevNote);
  }

  // undo note text
  undoNote(id, text, prevNote) {
    firebase.changeText(id, text);
    firebase.changePrev(id, prevNote);
  }

  // render function
  render() {
    const notesList = this.state.notes.entrySeq().map(([id, note]) => {
      return (
        <Notes
          id={id}
          key={id}
          note={note}
          zIndex={this.state.zIndexCount}
          removeNote={this.removeNote}
          changePosition={this.changePosition}
          changeEdit={this.changeEdit}
          changeText={this.changeText}
          changeZ={this.changeZ}
          changePrev={this.changePrev}
          undoNote={this.undoNote}
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
