import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import SideBar from '../components/SideBar';
import { makeStyles } from '@material-ui/core/styles';

async function getUserEvents(user, setData) {
  const url = 'http://localhost:3001/event/user';
  await fetch(url, { headers: { authorization: user.token } })
    .then((res) => res.json())
    .then((result) => setData(result));
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

function ConfirmedEvents() {
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const classes = useStyles();

  useEffect(() => {
    user && getUserEvents(user, setData);
  }, []);

  if (!data || data.message) return <div>Loading...</div>;
  return (    
    <SideBar title="Meus Eventos" children={
      <div>
        <h2>Eventos Confirmados:</h2>
        <div className={classes.container}>
          {data.length === 0 && 'Nada por aqui!'}
          {data.map((event) =>
            <EventCard
              key={event.event_id}
              event={event}
            />
          )}
        </div>
      </div>
    } />
  );
}

export default ConfirmedEvents;
