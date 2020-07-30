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
const COLORS = {
  work:
    "linear-gradient(90deg, #F78CA0 0%, #F9748F 20.31%, #FD868C 66.67%, #FE9A8B 100%)",
  rest: "linear-gradient(gi180deg, #48C6EF 0%, #6F86D6 100%)",
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
    color: COLORS.work, //цвет фона изначальный
    dashOffset: 364.24, // значение длины окружности, вычисляемое по формуле P=2πR, R-радиус окружности
    status: TIMER_STATS.pomodoro,
    timerId: null, //id таймера setInterval
    timerValue: 0, //текущее значение таймера (сек)
    pause: false,
  };
  /**methods */
  //Запускает таймер
  play = () => {
    window.clearInterval(this.state.timerId);
    this.setState((state) => ({
      color: COLORS.work,
      timerId: window.setInterval(this.tick, 1000),
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
      timerId: null,
      timerValue: 0,
      dashOffset: 364.24,
      status: TIMER_STATS.pomodoro,
    });
  };
  //меняет значение и статус таймера
  tick = () => {
    const { timerValue, status, dashOffset, pomodor } = this.state;
    //если таймер подошёл к концу
    if (timerValue <= 0) {
      //проверяю текущий статус
      switch (status) {
        case TIMER_STATS.pomodoro:
          // если помидор кратен 4 сделать большой перерыв,если нет-маленький
          this.setState((state) => ({
            status: TIMER_STATS.break,
            color: COLORS.rest,
            dashOffset: 364.24,
            round: state.round + 1,
            timerValue:
              state.round && state.round % this.state.cicle === 0
                ? state.break.long * 60
                : state.break.short * 60,
          }));
          break;
        case TIMER_STATS.break:
          this.setState((state) => ({
            color: COLORS.work,
            dashOffset: 364.24,
            status: TIMER_STATS.pomodoro,
            timerValue: pomodor * 60,
          }));
          break;
        default:
          console.log("неизвестный статус");
          break;
      }
    } else {
      // если таймер  ещё не закончился
      // уменьшаю таймер на 1 сек
      //уменьшаю значение длины окружности на равный промежуток
      this.setState((state) => ({
        dashOffset: state.dashOffset - dashOffset / timerValue,
        timerValue: state.timerValue - 1,
      }));
    }
  };
  render() {
    const { timerValue, pause, timerId, color } = this.state;
    const min = Math.floor(timerValue / 60);
    const sec = timerValue % 60;
    return (
      <div style={{ background: color }} className="wrap text-center">
        {/* Добавляем svg */}
        <svg
          id="svg"
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          viewBox="0 0 120 120"
        >
          {/* Создаем круг */}
          <circle
            cx="60"
            cy="60"
            r="58"
            fill="transparent"
            stroke="rgba(224,224,224 ,0.2)"
            strokeWidth="4"
            strokeDashoffset="364.24 364.24"
          />
          {/* Создаем круг,длину окружности которого будем уменьшать,создавая эффект анимации*/}
          <circle
            id="circle"
            cx="60"
            cy="60"
            r="58"
            fill="transparent"
            strokeDashoffset={this.state.dashOffset}
            strokeDasharray="364.24"
            stroke="white"
            strokeWidth="4"
            transform="rotate (270 60 60)"
            style={{ transition: "all 1s" }}
          >
            {/* Анимация круга */}
          </circle>
          {/* Отображение значений таймера внутри круга */}
          <text id="count" x="50%" y="53%" fill="white" textAnchor="middle">
            {/* Значения таймера */}
            {min < 10 && "0"}
            {min} : {sec < 10 && "0"}
            {sec}
          </text>
        </svg>

        {/* Timer Controls */}
        <div className="button-group">
          {/* Start timer*/}
          {(pause || timerId === null) && (
            <button id="play" className="btn-lg" onClick={this.play}>
              Play
            </button>
          )}
          {!pause && timerId !== null && (
            <>
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
