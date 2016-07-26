// the note component

import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';

class Notes extends Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onTrashClick = this.onTrashClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onUndoClick = this.onUndoClick.bind(this);
    this.onStartDrag = this.onStartDrag.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.render = this.render.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderText = this.renderText.bind(this);
  }
  onInputChange(event) {
    this.props.changeText(this.props.id, event.target.value);
  }

  // delete note
  onTrashClick(event) {
    this.props.removeNote(this.props.id);
  }

  // edit note
  onEditClick(event) {
    if (!this.props.note.isEdit) {
      this.props.changePrev(this.props.id, this.props.note);
    }
    this.props.changeEdit(this.props.id, !this.props.note.isEdit);
  }

  // update zIndex when drag begins
  onStartDrag() {
    this.props.changeZ(this.props.id);
  }

  // update position as drag continues
  onDrag(e, ui) {
    this.props.changePosition(this.props.id, ui.x, ui.y);
  }

  // undo text
  onUndoClick() {
    if (this.props.note.prevNote !== 'end') {
      this.props.undoNote(this.props.id, this.props.note.prevNote.text, this.props.note.prevNote.prevNote);
    }
  }

  // render text box
  renderText() {
    if (this.props.note.isEdit) {
      return <textarea className="text-box" onChange={this.onInputChange} value={this.props.note.text} />;
    } else {
      return <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text) }} />;
    }
  }

  // render edit icon
  renderEdit() {
    if (this.props.note.isEdit) {
      return <i className="fa fa-check" aria-hidden="true" onClick={this.onEditClick}></i>;
    } else {
      return <i className="fa fa-pencil" aria-hidden="true" onClick={this.onEditClick}></i>;
    }
  }

  // render function
  render() {
    return (
      <Draggable
        handle=".note-mover"
        grid={[75, 75]}
        defaultPosition={{ x: this.props.note.x, y: this.props.note.y }}
        position={null}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
      >
        <div className="note-box" style={{ backgroundColor: this.props.note.color, zIndex: this.props.note.zIndex }} >
          <nav className="nav-container">
            <div className="nav-item">
              {this.props.note.title}
            </div>
            <div className="nav-item">
              <i className="fa fa-trash" aria-hidden="true" onClick={this.onTrashClick}></i>
              {this.renderEdit()}
              <i className="fa fa-undo" aria-hidden="true" onClick={this.onUndoClick}></i>
              <i className="fa fa-arrows-alt note-mover" aria-hidden="true"></i>
            </div>
          </nav>
          <div className="main-text">
            {this.renderText()}
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Notes;
