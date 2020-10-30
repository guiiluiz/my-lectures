import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import SideBar from '../components/SideBar';
import { makeStyles } from '@material-ui/core/styles';

async function getEvents(user, setData) {
  const url = 'http://localhost:3001/event';

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

function Events() {
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const classes = useStyles();

  useEffect(() => {
    user && getEvents(user, setData);
  }, []);

  if (!data || data.message) return <div>Loading...</div>;
  return (    
    <SideBar title="Eventos" children={
      <div className={classes.container}>
        {data.map((event) =>
          <EventCard
            key={event.event_id}
            event={event}
          />
        )}
      </div>
    } />
  );
}

export default Events;
