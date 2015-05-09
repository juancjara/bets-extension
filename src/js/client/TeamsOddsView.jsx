import React from 'react';

let TeamsOddsView = React.createClass({
  render() {

    let ths = this.props.teamsOdds.map((item, i) => {
      return <th key = {i}>{item.team}</th>
    });

    let tds = this.props.teamsOdds.map((item, i) => {
      return <td key = {i}>{item.odds}</td>
    });

    return (
      <table>
        <thead><tr>{ths}</tr></thead>
        <tbody><tr>{tds}</tr></tbody>
      </table>
    )
    
  }
});

export default TeamsOddsView;