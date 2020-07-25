import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "../src/index.css";
/**
 * статус таймера
 */
const TIMER_STATS = {
  pomodoro: "pomodoro",
  break: "break",
};
class Wrapper extends React.Component {
  /**
   * State
   */
  state = {
    pomodor: 2, //длина таймера
    round: 0, // количество помидоров
    break: {
      short: 1, // короткий перерыв
      long: 3, // длинный перерыв
    },
    cicle: 4, // количество циклов, через которые будет длинный перерыв

    status: TIMER_STATS.pomodoro,
    timerId: null, //id таймера setInterval
    timerValue: 0, //текущее значение таймера (сек)
    pause: false,
  };
  /**methods */
  //Запускает таймер
  play = () => {
    const { round } = this.state;
    window.clearInterval(this.state.timerId);
    this.setState((state) => ({
      timerId: window.setInterval(this.tick, 100),
      timerValue:
        !state.round && !state.timerValue
          ? state.pomodor * 60
          : state.timerValue,
      pause: false,
    }));
  };
  //ставит таймер на паузу
  pause = () => {
    window.clearInterval(this.state.timerId);
    this.setState({
      pause: true,
    });
  };
  //останавливает таймер
  stop = () => {
    window.clearInterval(this.state.timerId);
    this.setState({
      timerId:null,
      timerValue: 0,
      status: TIMER_STATS.pomodoro,
    });
  };
  //меняет значение и статус таймера
  tick = () => {
    const { timerValue, status } = this.state;
    //если таймер подошёл к концу
    if (timerValue <= 0) {
      //проверяю текущий статус
      switch (status) {
        case TIMER_STATS.pomodoro:
          // если помидор кратен 4 сделать большой перерыв,если нет-маленький
          this.setState((state) => ({
            status: TIMER_STATS.break,
            round: state.round + 1,
            timerValue:
              state.round && state.round % state.cicle === 0
                ? state.break.long * 60
                : state.break.short * 60,
          }));
          break;
        case TIMER_STATS.break:
          this.setState((state) => ({
            status: TIMER_STATS.pomodoro,
            timerValue: state.pomodor * 60,
          }));
          break;
        default:
          console.log("неизвестный статус");
          break;
      }
    } else {
      // если таймер  ещё не закончился
      // уменьшаю таймер на 1 сек
      this.setState((state) => ({
        timerValue: state.timerValue - 1,
      }));
    }
  };
  render() {
    const { timerValue, round, pause, timerId } = this.state;
    const min = Math.floor(timerValue / 60);
    const sec = timerValue % 60;
    return (
      <div className="my-5 text-center">
        <h1 className="title">Pomodoro Timer</h1>
        <h2>
          {/* Значения таймера */}
          {min < 10 && "0"}
          {min} : {sec < 10 && "0"}
          {sec}
        </h2>
        {/* Timer Controls */}
        <div className="button-group">
          {/* Start timer*/}
          {(pause || timerId === null) && (
            <button className="btn-lg mr-5" onClick={this.play}>
              Play
            </button>
          )}

          {!pause && timerId !== null && (
            < >
              {/* Pause timer*/}
              <button className="btn-lg mr-5" onClick={this.pause}>
                Pause
              </button>
              {/* Stop timer*/}
              <button className="btn-lg" onClick={this.stop}>
                Stop
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Wrapper />, document.getElementById("root"));

serviceWorker.unregister();
