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

async function getUserCreatedEvents(user, setCreatedEvents) {
  const url = 'http://localhost:3001/event/user';
  await fetch(url, {
    method: 'POST',
      headers: {
        authorization: user.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: user.email }),
  }).then((res) => res.json()).then((result) => setCreatedEvents(result));
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

function ConfirmedEvents() {
  const [data, setData] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const classes = useStyles();

  useEffect(() => {
    user && getUserEvents(user, setData);
    user.manager && getUserCreatedEvents(user, setCreatedEvents);
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
        {user.manager === 1 && <h2>Eventos Cadastrados:</h2>}
        {user.manager === 1 && <div className={classes.container}>
          {createdEvents.length === 0 && 'Nada por aqui!'}
          {createdEvents.map((event) =>
            <EventCard
              key={event.event_id}
              event={event}
            />
          )}
        </div>}
      </div>
    } />
  );
}

export default ConfirmedEvents;
