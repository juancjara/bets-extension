import React from 'react';
import Main from './Main.jsx';
import db from '../background/db';

db.getGames(liveEvents => {
  React.render(<Main liveEvents = {liveEvents} />,
               document.getElementById('app'));
})