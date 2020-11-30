import React, { useState, useEffect } from 'react';
import ReportCard from '../components/ReportCard';
import SideBar from '../components/SideBar';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

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

function Reports() {
  const [createdEvents, setCreatedEvents] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const classes = useStyles();

  useEffect(() => {
    getUserCreatedEvents(user, setCreatedEvents);
  }, []);

  if (!user.manager) return <Redirect to='/events'/>;
  if (!createdEvents) return <div>Loading...</div>;
  return (    
    <SideBar title="Relatórios" children={
      <div>
        <h2>Seus Eventos:</h2>
        <div className={classes.container}>
          {createdEvents.length === 0 && 'Nada por aqui!'}
          {createdEvents.map((event) =>
            <ReportCard
              key={event.event_id}
              event={event}
            />
          )}
        </div>
      </div>
    } />
  );
}

export default Reports;
