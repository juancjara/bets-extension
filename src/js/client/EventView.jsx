import React from 'react';

let EventView = React.createClass({

  render() {
    let event = this.props;
    let ths = event.teamsOdds.map((item, i) => {
      return <th>{item.team}</th>
    });
    let tds = event.teamsOdds.map((item, i) => {
      return <td>{item.odds}</td>
    });

    return (
      <div className = 'event'>
        <div>
          {event.categoryName}
        </div>
        <div>
          {event.name} {event.periodName}
        </div>
        <div>
          {event.subCategoryName} {event.gameResults}
        </div>
        <table>
          <thead><tr>{ths}</tr></thead>
          <tbody><tr>{tds}</tr></tbody>
        </table>
      </div>
    );
  }
});

export default EventView;