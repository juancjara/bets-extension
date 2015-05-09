import React from 'react';
import EventView from './EventView.jsx';
import db from '../background/db';

let Main = React.createClass({
  getInitialState: function() {
    return {
      liveEvents: []
    };
  },

  update() {
    /*db.getGames(data => {
      console.log('aca');
      let dataParse = JSON.parse(data);
      console.log('dataParse', dataParse);
      this.setState({liveEvents: dataParse});
    })*/
  },

  componentDidMount() {
    //this.update();
  },

  render() {
    debugger;
    let liveEvents = this.props.liveEvents.map((item, i) => {
      return (
        <div key = {i}>
          <h1>{item.name}</h1>
          <EventView events = {item.events} />          
        </div>
      )
    })

    return (
      <div>
        {liveEvents}
      </div>
    );
  }

});

export default Main;