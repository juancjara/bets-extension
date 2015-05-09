import React from 'react';
import TeamsOddsView from './TeamsOddsView.jsx';

let EventView = React.createClass({

  render() {
    let events = this.props.events.map((event, i) => {
      return (
        <div className = 'event' key = {i}>
          <div>
            {event.categoryName}
          </div>
          <div>
            {event.name} {event.periodName}
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