import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import SideBar from '../components/SideBar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

async function isUserConfirmed(user, id) {
  const url = `http://localhost:3001/event/confirm/${id}`;

  return fetch(url, { headers: { authorization: user.token } }).then((res) => res.json());
}

async function getConfirmedList(id, user) {
  const url = `http://localhost:3001/event/confirmed/${id}`;

  return fetch(url, { headers: { authorization: user.token } }).then((res) => res.json());
}

async function getEvent(user, id, setData, setConfirmed) {
  const url = `http://localhost:3001/event/${id}`;
  const userConfirmed = await isUserConfirmed(user, id);
  userConfirmed.isConfirmed ? setConfirmed(true) : setConfirmed(false);

  await fetch(url, { headers: { authorization: user.token } })
    .then((res) => res.json())
    .then(async (result) => {
      const confirmedList = await getConfirmedList(id, user);
      return setData({ ...result, confirmedCount: confirmedList.participants.length })
    });
}

async function confirmUserInEvent(user, id, confirmed, setConfirmed) {
  const urlParam = confirmed ? 'disconfirm' : 'confirm';
  const url = `http://localhost:3001/event/${urlParam}`;

  await fetch(url,
    {
      method: 'POST',
      headers: {
        authorization: user.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    }).then((res) => res.json()).then((result) => setConfirmed(result.isConfirmed));
}

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    border: '1px solid black',
    padding: 10,
    minHeight: 100,
    maxWidth: 500,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  subtitle: {
    color: '#f50057',
    margin: 0,
  },
  confirmedCount: {
    marginBottom: 0,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    maxWidth: 600,
  },
}));

function EventDetails(props) {
  const [data, setData] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const id = props.match.params.id;
  const classes = useStyles();

  useEffect(() => {
    user && getEvent(user, id, setData, setConfirmed);
  }, [confirmed]);

  if (data.message || !user) return <Redirect to='/login'/>;
  if (!data) return <div>Loading...</div>;

  const { name, date, city, street, number, description, confirmedCount } = data;
  const eventDate = new Date(date);

  return (
    <SideBar title={`Detalhes - ${name}`} children={
      <div className={classes.content}>
        <h1>Evento {id} - {name} <span className={classes.subtitle}>{confirmed && '(Confirmado)'}</span></h1>
        <h3 className={classes.subtitle}>{eventDate.toLocaleString()}</h3>
        <h3>{street}, {number} - {city}</h3>
        <div className={classes.container}>
          <h4 className={classes.subtitle}>Descrição:</h4>
          <p>{description}</p>
        </div>
        <h2 className={classes.confirmedCount}>Confirmados: <span className={classes.subtitle}>{confirmedCount}</span></h2>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
          onClick={() => confirmUserInEvent(user, id, confirmed, setConfirmed)}
        >
          {confirmed ? 'Desconfirmar presença' : 'Confirmar presença'}
        </Button>
      </div>
    } />
  );
}

export default EventDetails;
