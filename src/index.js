import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "../src/index.css";

class Wrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: null,
      value: "",
    };

    this.startTime = this.startTime.bind(this);
    this.Timer = this.Timer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    let sec = this.state.value;
    this.setState({ sec: sec });
    event.preventDefault();
  }

  startTime() {
    let value = this.state.value;
    let minutes = Math.floor(value / 60);
    let remSeconds = value % 60;
    if (remSeconds < 0 && minutes >= 0) {
      minutes = minutes - 1;
      remSeconds = 59;
    }
    if (minutes < 0) {
      this.playAudio();
      clearInterval(this.state.timer);
      value = this.state.sec;
      this.setState({ value: parseInt(value / 3) });
      return this.Timer();
    }
    this.setState((prevState, props) => {
      return {
        minutes: minutes,
        remSeconds: remSeconds,
        value: prevState.value - 1,
      };
    });
  }

  playAudio() {
    const audioEl = document.getElementsByClassName("audio-element")[0];
    audioEl.play();
  }
  Timer() {
    clearInterval(this.state.timer);
    let timer = setInterval(this.startTime, 1000);
    this.setState({ timer: timer });
    return timer
  }
  restTimer() {
    let value = this.state.sec;
    this.setState({ value: value });
    return this.Timer();
  }

  pauseTimer() {
    clearInterval(this.state.timer);
  }
  stopTimer() {
    clearInterval(this.state.timer);
    let sec = this.state.sec;
    let minutes = Math.floor(sec / 60);
    let remSeconds = sec % 60;
    this.setState({ value: sec, minutes: minutes, remSeconds: remSeconds });
  }

  render() {
    return (
      <div className="my-5 text-center">
        <h1 className="title">Pomodoro Timer</h1>
        <h2>
          {" "}
          <span className="text-danger">Время работы</span> <br />
          Осталось {this.state.minutes} минут {this.state.remSeconds} секунд
        </h2>
        <audio className="audio-element" preload="auto">
          <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"></source>
        </audio>
        <div className="button-group">
          <button className="btn-lg mr-5" onClick={this.Timer}>
            Start
          </button>
          <button className="btn-lg mr-5" onClick={this.pauseTimer}>
            Pause
          </button>
          <button className="btn-lg" onClick={this.stopTimer}>
            Stop
          </button>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Set your Time:
            <input
              type="number"
              className="worktime mx-4"
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

ReactDOM.render(<Wrapper />, document.getElementById("root"));

serviceWorker.unregister();
