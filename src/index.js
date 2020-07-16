import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 1500,
      time: null,
      minutes:null,
  
    };
  }
  render() {
    const StartTimer = () => {
      let minutes = Math.floor(this.state.seconds / 60),
        remSeconds = this.state.seconds % 60;
       
 if (remSeconds === 0) {
        minutes = minutes - 1;
        remSeconds = 60;
      } ;
      let timer = setInterval(() => {
        remSeconds = remSeconds - 1;       
      }, 1000)

      return (
        <h2>
          Осталось {minutes} минут {remSeconds} секунд
        </h2>
      );
}        
    


    const Button = () => {
      return (
        <div>
          <button className="btn-lg mr-5" onClick={StartTimer}>
            Start
          </button>
          <button className="btn-lg mr-5">Pause </button>
          <button className="btn-lg">Stop </button>
        </div>
      );
    };

    return (
      <div className="my-5 text-center">
        <h1 className="my-5">Time to do your job</h1>
        <Button />
        <StartTimer />
      </div>
    );
  }
}

ReactDOM.render(<Wrapper />, document.getElementById("root"));

serviceWorker.unregister();
