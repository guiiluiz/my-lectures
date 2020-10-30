import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { validateLogin, sendData, Copyright, usingStyle } from '../service';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const nameRegex = /^[a-zA-Z\s]{8,40}$/;
const emailRegex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

const textFieldMail = (email, setEmail) => {
  return (
    <Grid item xs={12}>
      <TextField
        variant="outlined"
        required
        error={!emailRegex.test(email)}
        helperText={emailRegex.test(email) ? '' : 'Email Inválido!'}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        color="secondary"
      />
    </Grid>
  );
}

const textFieldPass = (password, setPassword) => {
  return (
    <Grid item xs={12}>
      <TextField
        variant="outlined"
        required
        error={!password}
        helperText={password ? '' : 'Senha muito curta!'}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        name="password"
        label="Password"
        id="password"
        color="secondary"
      />
    </Grid>
  );
}

const managerSelect = (setIsManager) => {
  return (
    <Grid item xs={12}>
      <FormControlLabel
        control={<Checkbox value="allowExtraEmails" />}
        label="Quero divulgar meus eventos"
        type="checkbox"
        name="checkbox"
        onClick={(e) => e.target.checked ? setIsManager(1) : setIsManager(0)}
      />
    </Grid>
  );
}

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isManager, setIsManager] = useState(false);
  const [isLoged, setIsLoged] = useState(false);
  const classes = usingStyle();

  useEffect(() => {
    validateLogin(setIsLoged);
  }, []);
  if (isLoged) return <Redirect to='/events' />;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => sendData(e, { email, password, name, manager: isManager }, 'user', setIsLoged)}>
          <Grid container spacing={2}>
            {textFieldName(name, setName)}
            {textFieldMail(email, setEmail)}
            {textFieldPass(password, setPassword)}
            {managerSelect(setIsManager)}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            disabled={!name || !email || !password}
            className={classes.submit}
          >
            Cadastrar-se
          </Button>
          <Grid container justify="center">
            <Grid item >
              <Link href="/login" variant="body2">
                <br />
                Já tem uma conta? Entre aqui
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}><Copyright /></Box>
    </Container>
  );
}

export default Register;
