
import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';


class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      title: this.props.note.title,
      text: '',
      x: this.props.note.x,
      y: this.props.note.y,
      zIndex: this.props.note.zIndex,
      isEdit: false,
      color: this.props.note.color,
      prevNote: null,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onTrashClick = this.onTrashClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onUndoClick = this.onUndoClick.bind(this);
    this.onStartDrag = this.onStartDrag.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onStopDrag = this.onStopDrag.bind(this);
  }
  onInputChange(event) {
    this.setState({ text: event.target.value });
  }
  onTrashClick(event) {
    this.props.deleteNote(this.state.id);
  }
  onEditClick(event) {
    if (this.state.isEdit) {
      this.setState({ isEdit: false });
      this.props.writeNote(this.state.id, this.state, false);
    } else {
      this.setState({
        isEdit: true,
        prevNote: this.state,
      });
      this.props.writeNote(this.state.id, this.state, false);
    }
  }

  onStartDrag() {
    this.setState({ zIndex: this.props.zIndexCount + 1 });
    this.props.writeNote(this.state.id, this.state, true);
  }

  onDrag(e, ui) {
    const newState = {
      x: ui.x,
      y: ui.y,
    };
    this.setState(newState);
  }

  onStopDrag() {
    this.props.writeNote(this.state.id, this.state, false);
  }

  onUndoClick() {
    if (this.state.prevNote != null) {
      this.setState(this.state.prevNote);
      this.props.writeNote(this.state.id, this.state, false);
    }
  }

  renderText() {
    if (this.state.isEdit) {
      return <textarea className="text-box" onChange={this.onInputChange} value={this.state.text} />;
    } else {
      return <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.state.text) }} />;
    }
  }

  renderEdit() {
    if (this.state.isEdit) {
      return <i className="fa fa-check" aria-hidden="true" onClick={this.onEditClick}></i>;
    } else {
      return <i className="fa fa-pencil" aria-hidden="true" onClick={this.onEditClick}></i>;
    }
  }

  render() {
    return (
      <Draggable
        handle=".note-mover"
        grid={[75, 75]}
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
      >
        <div className="note-box" style={{ backgroundColor: this.state.color, zIndex: this.state.zIndex }} >
          <nav className="nav-container">
            <div className="nav-item">
              {this.state.title}
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
