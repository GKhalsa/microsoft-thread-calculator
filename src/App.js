import React, { Component } from 'react';
import './App.css';
import {runner} from './helper/stream'

class App extends Component {

  state = {
      inputPerMinute:300,
      sla:30,
      threads: 300,
      inputMinute:150,
      inputModulo:10,
      minutesToRun: 60,
      resultText:""
  };

  calculate = () => {
      const {inputPerMinute, sla, threads, inputMinute, inputModulo, minutesToRun} = this.state;
      const result = Math.ceil(runner(minutesToRun,inputPerMinute,inputModulo,inputMinute ,sla,threads));
    debugger
    if (result == this.state.threads) {
      this.setState({resultText: `${result} thread(s) is perfect`})
    } else if (result > this.state.threads){
        this.setState({resultText: `${this.state.threads} is insufficient, you will need ${result} thread(s)`})
    } else if (result < this.state.threads) {
        this.setState({resultText: `${this.state.threads} is more than you would need, you could optimize to only ${result} thread(s)`})
    }
  };

  render() {
    return (
      <div className="App">

        <div className="text__form">


          <div className="app__input">
            <div>Inflow amount per minute</div>
            <input value={this.state.inputPerMinute} onChange={(e) => this.setState({inputPerMinute: e.target.value})} type="number"/>
          </div>

          <div className="app__input">
            <div>SLA</div>
            <input value={this.state.sla} onChange={(e) => this.setState({sla: parseInt(e.target.value)})} type="number"/>
          </div>

          <div className="app__input">
            <div>Threads</div>
            <input value={this.state.threads} onChange={(e) => this.setState({threads: parseInt(e.target.value)})} type="number"/>
          </div>

          <div className="app__input">
            <div>Files</div>
            <input value={this.state.inputMinute} onChange={(e) => this.setState({inputMinute: parseInt(e.target.value)})} type="number"/>
          </div>

          <div>PER</div>

          <div className="app__input">
            <div>Minute(s)</div>
            <input value={this.state.inputModulo} onChange={(e) => this.setState({inputModulo: parseInt(e.target.value)})} type="number"/>
          </div>


          <div className="app__input">
            <div>Duration(min)</div>
            <input value={this.state.minutesToRun} onChange={(e) => this.setState({minutesToRun: parseInt(e.target.value)})} type="number"/>
          </div>

          <button onClick={this.calculate} className="app__input">
            Calculate Threads
          </button>
        </div>

        eg. 300 files per minute input, sla is 30 minutes, 300 threads, with three hundred threads we can handle 150 files per 10 minutes in the case of just splitting stereo and sending that through, and we want it to run for 8 hours.

        <div className="result__box">
            {this.state.resultText}
        </div>

      </div>
    );
  }
}

export default App;
