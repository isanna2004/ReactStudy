import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./modal.css";

  
class Modal extends React.Component {

  render() {
    let modal = (
      <form className="modal-wrapper" onSubmit={this.handleSubmit}>
        <label className="modal-text">Pomodoro:</label>
        <input
          type="number"
          className="modal-input text-white pl-2"
          value={this.props.pomodoro}
       
        />
        <label className="modal-text">Short Break: </label>
        <input
          type="number"
          className="modal-input text-white pl-2"
          value={this.props.breakShort}
          onChange={this.handleChange}
        />
        <label className="modal-text">Long Break: </label>
        <input
          type="number"
          className="modal-input text-white pl-2"
          value={this.props.breakLong}
          onChange={this.handleChange}
        />
        <label className="modal-text">Number of Pomodor between break </label>
        <input
          type="number"
          className="modal-input text-white pl-2"
          value={this.props.cicle}
          onChange={this.handleChange}
        />
        <div className="button-group mt-2 text-right">
          <button className="btn-lg mr-2" onClick={this.props.onClose}>
            Close
          </button>
          <button className="btn-lg" type="submit">
            Save
          </button>
        </div>
      </form>
    );
    if (!this.props.isOpen) {
      modal = null;
    }
    return <div>{modal}</div>;
  }
}

export default Modal;
