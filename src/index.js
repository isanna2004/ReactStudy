import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "../src/index.css";

class Wrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: 10,
    };
    this.StartTime = this.StartTime.bind(this);
    this.Timer = this.Timer.bind(this);
    this.RestTimer = this.RestTimer.bind(this);
    this.PauseTimer = this.PauseTimer.bind(this);
    this.StopTimer = this.StopTimer.bind(this);
  }
  StartTime() {
    let minutes = Math.floor(this.state.seconds / 60);
    let remSeconds = this.state.seconds % 60;
    if (remSeconds < 0 && minutes >= 0) {
      minutes = minutes - 1;
      remSeconds = 59;
    }
    if (minutes < 0) {
      clearInterval(this.state.timer);
      minutes = 0;
      remSeconds = 0;
      return this.RestTimer();
    }
    this.setState((prevState, props) => {
      return {
        minutes: minutes,
        remSeconds: remSeconds,
        seconds: prevState.seconds - 1,
      };
    });
  }

  Timer() {
    let timer = setInterval(this.StartTime, 1000);
    this.setState({ timer: timer });
    return timer;
  }

  RestTimer() {
    this.setState({ seconds: this.state.seconds / 5 });
    return this.Timer();
  }
  PauseTimer() {
    clearInterval(this.state.timer);
  }
  StopTimer() {
    clearInterval(this.state.timer);

    console.log(this.state.timer);
  }

  render() {
    return (
      <div className="my-5 text-center">
        <h1 className="title">Pomodoro Timer</h1>
        <h2>
          Осталось {this.state.minutes} минут {this.state.remSeconds} секунд
        </h2>
        <div className="button-group">
          <button className="btn-lg mr-5" onClick={this.Timer}>
            Start
          </button>
          <button className="btn-lg mr-5" onClick={this.PauseTimer}>
            Pause
          </button>
          <button className="btn-lg" onClick={this.StopTimer}>
            Stop
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Wrapper />, document.getElementById("root"));

serviceWorker.unregister();
