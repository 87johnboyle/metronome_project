import React, { Component } from 'react';
import click from '../click.wav';
import clack from '../clack.wav'

class Metronome extends Component {

  // set default variables. BPM and begin play state. Variables or constructors?

  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4,
    };

    this.click = new Audio(click);
    this.clack = new Audio(clack);
  }
// Need functions for Bpm slider change. Play/Pause.

  handleBpmChange = event => {
    const bpm = event.target.value;
    if(this.state.playing){
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60/bpm) * 1000);
      this.setState({
        count: 0,
        bpm
      });
    } else {
    this.setState({bpm});
  }
};

  playClickClack = () => {
    const { count, beatsPerMeasure } = this.state;

    // Click first
    if (count % beatsPerMeasure === 0) {
      this.click.play();
    } else {
      this.clack.play();
    }

    // Track the beat
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  };

// Will have to be able to take the bpm and setInterval based on it.
  startStop = () => {
    if (this.state.playing) {
      // Stop
      clearInterval(this.timer);
      this.setState({
        playing:false
      });
    } else {
      // Starting timer based on Bpm
      this.timer = setInterval(
        this.playClickClack,
        (60 / this.state.bpm) * 1000
      );
      this.setState(
        {
          count:0,
          playing: true
        },
        this.playClickClack
      );
    }
  };

  render() {

    const { playing, bpm } = this.state;

    return (
      // UI. Will need a slider to adjust BPM and a dynamic play/pause button.
      <div className="metronome">
      <div className = "slider">
      <div> {bpm} BPM </div>
      <input
      type= "range"
      min = "60"
      max = "240"
      value = {bpm}
      onChange = {this.handleBpmChange} />
      </div>
      <button onClick={this.startStop}>{playing ? 'Stop' : 'Start'}</button>
      </div>
    );
    }
  }

  export default Metronome;
