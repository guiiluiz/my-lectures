import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { validateLogin, sendData, Copyright, usingStyle } from '../service';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SideBar from '../components/SideBar';

const registerEvent = async (e, data, setShouldRedirect, user) => {
  e.preventDefault();
  const url = 'http://localhost:3001/event';
  await fetch(url, {
    method: 'POST',
    headers: {
      authorization: user.token,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, manager: user.manager }),
  }).then(res => res.json()).then((result) => {
    if (!result.message) {
      alert('Evento Cadastrado com sucesso!');
      setShouldRedirect(true);
    }
  });
}

const nameRegex = /^[a-zA-Z\s]{8,50}$/;

const textFieldName = (name, setName) => {
  return (
  <Grid item xs={12} >
    <TextField
      type="text"
      id="name"
      name="name"
      error={!nameRegex.test(name)}
      helperText={nameRegex.test(name) ? '' : 'Nome muito curto!'}
      pattern="^[a-zA-Z\s]{8,40}$"
      onChange={(e) => setName(e.target.value)}
      autoComplete="fname"
      variant="outlined"
      required
      fullWidth
      label="Nome"
      color="secondary"
      autoFocus
    />
  </Grid>
  );
}

const textFieldDateTime = (datetime, setDatetime) => {
  return (
    <Grid item xs={12}>
      <TextField
        variant="outlined"
        required
        error={!datetime}
        type="datetime-local"
        defaultValue="2020-10-30T10:30:00"
        onChange={(e) => setDatetime(e.target.value)}
        label="Data e Hora"
        id="datetime-local"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Grid>
  );
}

const textFieldStreet = (street, setStreet) => {
  return (
    <Grid item xs={8}>
      <TextField
        variant="outlined"
        required
        error={!street}
        type="text"
        onChange={(e) => setStreet(e.target.value)}
        fullWidth
        name="street"
        label="Rua"
        id="street"
        color="secondary"
      />
    </Grid>
  );
}

const textFieldNumber = (number, setNumber) => {
  return (
    <Grid item xs={4}>
      <TextField
        variant="outlined"
        required
        error={!number}
        type="number"
        onChange={(e) => setNumber(e.target.value)}
        fullWidth
        name="number"
        label="Número"
        id="number"
        color="secondary"
      />
    </Grid>
  );
}

const textFieldCity = (city, setCity) => {
  return (
    <Grid item xs={12}>
      <TextField
        variant="outlined"
        required
        error={!city}
        type="text"
        onChange={(e) => setCity(e.target.value)}
        fullWidth
        name="city"
        label="Cidade"
        id="city"
        color="secondary"
      />
    </Grid>
  );
}

const textFieldDescription = (description, setDescription) => {
  return (
    <Grid item xs={12}>
      <TextField
        variant="outlined"
        required
        error={!description}
        id="outlined-multiline-static"
        multiline
        rows={3}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        name="description"
        label="Descrição"
        color="secondary"
      />
    </Grid>
  );
}

function CreateEvent() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const classes = usingStyle();

  if (shouldRedirect || !user.manager) return <Redirect to='/events'/>;
  return (
    <SideBar title="Cadastro de Evento" children={
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={(e) => registerEvent(e, { name, date: datetime, street, number, city, description }, setShouldRedirect, user)}>
            <Grid container spacing={3}>
              {textFieldName(name, setName)}
              {textFieldDateTime(datetime, setDatetime)}
              {textFieldStreet(street, setStreet)}
              {textFieldNumber(number, setNumber)}
              {textFieldCity(city, setCity)}
              {textFieldDescription(description, setDescription)}
            </Grid>
            <br />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={!name || !datetime || !street || !number || !city}
              className={classes.submit}
            >
              Cadastrar Evento
            </Button>
          </form>
        </div>
        <Box mt={5}><Copyright /></Box>
      </Container>
    } />
  );
}

export default CreateEvent;
