import React from 'react';
import EventView from './EventView.jsx';
import db from '../background/db';

let Main = React.createClass({
  getInitialState: function() {
    return {
      liveEvents: [],
      time: ''
    };
  },

  update() {
    db.getGames(data => {
      console.log('aca');
      this.setState({
        liveEvents: data.games,
        time: data.time
      });
    })
  },

  componentDidMount() {
    this.update();
  },

  render() {
    debugger;
    let liveEvents = this.state.liveEvents.map((item, i) => {
      return (
        <div key = {i}>
          <h2>{item.name}</h2>
          <EventView events = {item.events} />          
        </div>
      )
    })

    return (
      <div>
        <h1>{this.state.time}</h1>
        {liveEvents}
      </div>
    );
  }

});

export default Main;