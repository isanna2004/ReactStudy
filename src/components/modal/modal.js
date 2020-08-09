import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./modal.css";

class Modal extends React.Component {

  
  render() {
      const{defaultValues}= this.props;
    let modal = (
      <div className="modal-window pb-5 ">
        <form className="modal-wrapper" onSubmit={this.props.handleSubmit}>
          <label className="modal-text">Pomodoro:</label>
          <input
            name="pomodoro"
            type="number"
            className="modal-input text-white pl-2"
            value={defaultValues.pomodoro}
            onChange={this.props.handleChange}
          />
          <label className="modal-text">Short Break: </label>
          <input
            name="breakShort"
            type="number"
            className="modal-input text-white pl-2"
            value={defaultValues.breakShort}
            onChange={this.props.handleChange}
          />
          <label className="modal-text">Long Break: </label>
          <input
            name="breakLong"
            type="number"
            className="modal-input text-white pl-2"
            value={defaultValues.breakLong}
            onChange={this.props.handleChange}
          />
          <label className="modal-text">Number of Pomodor between break </label>
          <input
            name="cicle"
            type="number"
            className="modal-input text-white pl-2"
            value={defaultValues.cicle}
            onChange={this.props.handleChange}
          />
          <div className="button-group mt-2 text-right">
            <button className="btn-lg mr-2" onClick={this.props.onClose}>
              Close
            </button>
            <button className="btn-lg" type="submit">
              Save
            </button>
          </div>
          <p className="modal-text mt-4">
            made with <span style={{ color: "red" }}>♥</span> by Isanna{" "}
          </p>
        </form>
      </div>
    );
    if (!this.props.isOpen) {
      modal = null;
    }
    return <div>{modal}</div>;
  }
}

export default Modal;
