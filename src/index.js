import React from "react";
import ReactDOM from "react-dom";
import Modal from "../src/components/modal/modal";
import * as serviceWorker from "./serviceWorker";
import "../src/index.css";
import icon from  "../src/images/gear.png";


/**
 * статус таймера
 */
const TIMER_STATS = {
  pomodoro: "pomodoro",
  break: "break",
};
const BACKGROUNDS = {
  [TIMER_STATS.pomodoro]:
    "linear-gradient(90deg, #F78CA0 0%, #F9748F 20.31%, #FD868C 66.67%, #FE9A8B 100%)",
  [TIMER_STATS.break]: "linear-gradient(180deg, #48C6EF 0%, #6F86D6 100%)",
};
let radius = 58;
class Wrapper extends React.Component {
  /**
   * State
   */
  state = {

    pomodoro: 2, //длина таймера
    round: 0, // количество помидоров
    break: {
      short: 1, // короткий перерыв
      long: 3, // длинный перерыв
    },
    cicle: 4, // количество циклов, через которые будет длинный перерыв
    dashOffset: 2 * 3.14 * radius, //вычисляем длину окружности, по формуле P=2πR,где R-радиус
    status: TIMER_STATS.pomodoro,
    timerId: null, //id таймера setInterval
    timerValue: 0, //текущее значение таймера (сек)
    pause: false,
    isOpen: false,
  };
  /**methods */

  //Запускает таймер
  play = () => {
    window.clearInterval(this.state.timerId);
    window.clearInterval(this.state.dashOffset);
    this.setState((state) => ({
      timerId: window.setInterval(this.tick, 1000),
      timerValue:
        !state.round && !state.timerValue
          ? state.pomodoro * 60
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
    window.clearInterval(this.state.timerId, this.state.dashOffset);
    this.setState({
      timerId: null,
      timerValue: 0,
      dashOffset: 2 * 3.14 * radius,
      status: TIMER_STATS.pomodoro,
    });
  };
  //меняет значение и статус таймера
  tick = () => {
    const { timerValue, status, dashOffset, pomodoro } = this.state;
    //если таймер подошёл к концу
    if (timerValue <= 0) {
      //проверяю текущий статус
      switch (status) {
        case TIMER_STATS.pomodoro:
          // если помидор кратен 4 сделать большой перерыв,если нет-маленький
          this.setState((state) => ({
            status: TIMER_STATS.break,
            dashOffset: 2 * 3.14 * radius,
            round: state.round + 1,
            timerValue:
              state.round && state.round % this.state.cicle === 0
                ? state.break.long * 60
                : state.break.short * 60,
          }));
          break;
        case TIMER_STATS.break:
          this.setState((state) => ({
           
            status: TIMER_STATS.pomodoro,
            dashOffset: 2 * 3.14 * radius,
            timerValue: pomodoro * 60,
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

  //изменяем значения на пользовательские
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    const { timerValue, pause, timerId,status } = this.state;
    const min = Math.floor(timerValue / 60);
    const sec = timerValue % 60;
    return (
      <div
        style={{
          background:BACKGROUNDS[status],
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="wrap text-center"
      >
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
            r={radius}
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
            r={radius}
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
        <div>
          {/* Добавляем модальное окно */}
          <Modal
            isOpen={this.state.isOpen}
            cicle={this.state.cicle}
            pomodoro={this.state.pomodoro}
            handleChange={this.handleChange}
            breakShort={this.state.break.short}
            breakLong={this.state.break.long}
            onClose={(e) => {
              this.setState({
                isOpen: false,
              });
              this.play();
            }}
          />
          {/* Settings button */}
          <button
            className="settings"
            onClick={(e) => {
              this.setState({
                isOpen: true,
              });
              this.pause();
            }}
          >
            <img src ={icon} className="icon" alt="settings button"/>
          </button>
        </div>
        {/* Timer Controls */}
        <div className="button-group mt-5">
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
