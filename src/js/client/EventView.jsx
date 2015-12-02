import React from 'react';
import TeamsOddsView from './TeamsOddsView.jsx';
import db from '../background/db';

let EventView = React.createClass({

  getInitialState: function() {
    return {
      skips: {} 
    };
  },

  componentDidMount() {
    db.getListSkip(skips => {
      this.setState({skips});
    });
  },

  toggleCheckbox(id) {
    let skips = this.state.skips;
    if (id in this.state.skips) {
      delete skips[id];
      db.removeSkipped(id, () => {});
    } else {
      skips[id] = 'gg';
      db.addSkipped(id, ()=>{});
    }
    this.setState({skips});
  },

  render() {
    let events = this.props.events.map((event, i) => {
      var skiped = this.state.skips[event.id] ? true: false;
      return (
        <div className = 'event' key = {i}>
          <div>
            {event.name} {event.periodName}
            <input 
              type = 'checkbox' 
              checked = {skiped}
              onChange = {this.toggleCheckbox.bind(null, event.id)} />
          </div>
          <div>
            {event.subCategoryName} {event.gameResults}
          </div>
          <TeamsOddsView teamsOdds = {event.teamsOdds} />
        </div>
      )
    });

    return (
      <div>
        {events}
      </div>
    );
  }
});

export default EventView;
