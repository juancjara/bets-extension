import React from 'react';
import EventView from './EventView.jsx';

let Main = React.createClass({
  getDefaultProps() {
    return {
      events: [
        {
          categoryName: 'futbol',
          name: 'Sporting Cristal - Unión Comercio',
          periodName: '1er tiempo',
          subCategoryName: 'Peru Primera División Apertura',
          gameResults: '0-0',
          teamsOdds: [
            {team: 'Sporting Cristal', odds: '1.52'},
            {team: 'Empate', odds: '2.38'},
            {team: 'Unión Comercio', odds: '5.3'}
          ]
        },
        {
          categoryName: 'futbol',
          name: 'A - B',
          periodName: '1er tiempo',
          subCategoryName: 'Peru Primera División Apertura',
          gameResults: '0-0',
          teamsOdds: [
            {team: 'A', odds: '1.52'},
            {team: 'Empate', odds: '2.38'},
            {team: 'B', odds: '5.3'}
          ]
        }
      ]
    };
  },

  render() {
    let events = this.props.events.map((item, i) => {
      return <EventView key = {i} {...item} />
    })

    return (
      <div>
        {events}
      </div>
    );
  }

});

export default Main;