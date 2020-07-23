import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
// import "../src/index.css";

/**
 * Статус таймера
 * 'pomodoro' - идет помидор
 * 'break' - идет перерыв
 */

const TIMER_STATS = {
  pomodoro: 'pomodor',
  break: 'break',
}

class Wrapper extends React.Component {

  /**
   * State
   */

  state = {
    pomodoro: 0.1, // длина помидора (мин)
    round: 0, // количество помидоров
    break: {
      short: 0.1, // Длина короткого перерыва (мин)
      long: 0.1, // Длина длинного перерыва (мин)
    },
    longBreakPerPomodoro: 2, // Количество помидоров через которые будет длинный перерыв
    status: TIMER_STATS.pomodoro,
    // Сам таймер
    timerId: null, // id таймера setInterval
    timerValue: 0, // текущее значение таймера (сек)
    pause: false,

    // Old code

    /*
    timer: null,
    value: "",
    minutes: 0,
    remSeconds: 0
    */
  }

  /**
   * Methods
   */

  // Запускает таймер
  play = () => {
    const { round } = this.state
    
    window.clearInterval(this.state.timerId);

    this.setState((state) => ({
      timerId: window.setInterval(this.tick, 1000),
      timerValue: !state.round && !state.timerValue ? state.pomodoro * 60 : state.timerValue,
      pause: false,
    }))
  }

  // Ставит таймер на паузу
  pause = () => {
    window.clearInterval(this.state.timerId);
    this.setState({
      pause: true,
    });
  }

  // Сбрасывает таймер
  stop = () => {
    window.clearInterval(this.state.timerId);
    this.setState({
      timerId: null,
      timerValue: 0,
      status: TIMER_STATS.pomodoro,
    })
  }

  // Меняет значение и статус таймера
  tick = () => {
    const { timerValue, status } = this.state

    // Если таймер подошел к концу
    if (timerValue <= 0) {

      // Проверяю текущий статус
      switch (status) {
        case TIMER_STATS.pomodoro:

          // Проверяю какой это был помидор, и если он кратен {state.longBreakPerPomodoro} то сделать большой перерыв, иначе делать маленький перерыв
          this.setState((state) => ({
            status: TIMER_STATS.break,
            round: state.round + 1,
            timerValue: state.round && state.round % state.longBreakPerPomodoro === 0 ?
              state.break.long * 60 :
              state.break.short * 60,
          }));

          break;
        case TIMER_STATS.break:
          
          this.setState((state) => ({ status: TIMER_STATS.pomodoro, timerValue: state.pomodoro * 60 }))

          break;
        default:
          console.log('Неизвестный статус');
          break;
      }
    } else { // Если таймер еще не закаончился

      // Уменьшаю таймер на 1 сек
      this.setState((state) => ({
        timerValue: state.timerValue - 1
      }))
    }
  }

  // Old

  /*
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    let sec = this.state.value;
    this.setState({ sec: sec });
    event.preventDefault();
  }

  startTime = () => {
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

  playAudio = () => {
    const audioEl = document.getElementsByClassName("audio-element")[0];
    audioEl.play();
  }

  Timer = () => {
    clearInterval(this.state.timer);
    let timer = setInterval(this.startTime, 1000);
    this.setState({ timer: timer });
    return timer
  }

  restTimer = () => {
    let value = this.state.sec;
    this.setState({ value: value });
    return this.Timer();
  }

  pauseTimer = () => {
    clearInterval(this.state.timer);
  }
  stopTimer = () => {
    clearInterval(this.state.timer);
    let sec = this.state.sec;
    let minutes = Math.floor(sec / 60);
    let remSeconds = sec % 60;
    this.setState({ value: sec, minutes: minutes, remSeconds: remSeconds });
  }
  */

  render() {
    const { timerValue, round, pause, timerId } = this.state

    const min = Math.floor(timerValue / 60)
    const sec = timerValue % 60

    return (
      <div className="my-5 text-center">
        <h1 className="title">Pomodoro Timer</h1>

        {/* Timer values */}

        <h2>{min < 10 && '0'}{min} : {sec < 10 && '0'}{sec}</h2>

        {/* Timer controls */}
        
        <div className="button-group">

          {/* Start timer */}

          {(pause || timerId === null) && (
            <button className="btn-lg mr-5" onClick={this.play}>
              Play
            </button>
          )}


          {(!pause && timerId !== null) && (
            <>
          
              {/* Pause timer */}
              <button className="btn-lg mr-5" onClick={this.pause}>
                Pause
              </button>
    
              {/* Stop timer */}

              <button className="btn-lg" onClick={this.stop}>
                Stop
              </button>

            </>
          )}
          
        </div>

        {/* <form onSubmit={this.handleSubmit}>
          <label>
            Set your Time:
            <input
              type="number"
              className="worktime mx-4"
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form> */}

        {/* <audio className="audio-element" preload="auto">
          <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"></source>
        </audio> */}
      </div>
    );
  }
}

ReactDOM.render(<Wrapper />, document.getElementById("root"));

serviceWorker.unregister();
