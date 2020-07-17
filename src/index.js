import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

class Wrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: 10,
      timer: false,
    };
    this.StartTime = this.StartTime.bind(this);
    this.Timer = this.Timer.bind(this);
  }
  StartTime() {
    let minutes = Math.floor(this.state.seconds / 60);
    let remSeconds = this.state.seconds % 60;
    if (remSeconds === -1 && minutes >= 0) {
      minutes = minutes - 1;
      remSeconds = 59;
    }
if(minutes < 0) {
  clearInterval(this.state.timer)
}
    this.setState((prevState, props) => {
      return {
        minutes: minutes,
        remSeconds: remSeconds,git
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

  render() {
    return (
      <div className="my-5 text-center">
        <h1>
          Осталось {this.state.minutes} минут {this.state.remSeconds} секунд
        </h1>

        <button className="btn-lg mr-5" onClick={() => this.Timer()}>
          Start
        </button>
        <button className="btn-lg mr-5" onClick={() => this.RestTimer()}>
          Rest{" "}
        </button>
        <button className="btn-lg">Stop </button>
      </div>
    );
  }
}

ReactDOM.render(<Wrapper />, document.getElementById("root"));

serviceWorker.unregister();
