import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { validateLogin, sendData, usingStyle, Copyright } from '../service';

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

const emailRegex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const textFieldMail = (email, setEmail) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      error={!emailRegex.test(email)}
      helperText={emailRegex.test(email) ? '' : 'Email Inválido!'}
      type="email"
      id="email"
      name="email"
      onChange={(e) => setEmail(e.target.value)}
      fullWidth
      label="Email"
      autoComplete="email"
      color="secondary"
      autoFocus
    />
  );
}

const textFieldPassword = (password, setPassword) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      error={!password}
      type="password"
      onChange={(e) => setPassword(e.target.value)}
      fullWidth
      color="secondary"
      name="password"
      label="Password"
      id="password"
    />
  );
}

const btnEntrar = (classes) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="secondary"
      className={classes.submit}
    >
      Entrar
    </Button>
  );
}

const registerLink = (setShouldRedirect) => {
  return (
    <Grid container justify="center">
      <Grid item>
        <Link
          href="/register"
          variant="body2"
          onClick={() => setShouldRedirect(true)}
        >
          <br />
          {"Ainda não tem uma conta? Cadastre-se"}
        </Link>
      </Grid>
    </Grid>
  );
}

function Login() {
  const [isLoged, setIsLoged] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = usingStyle();

  useEffect(() => {
    validateLogin(setIsLoged);
  }, []);

  if (isLoged) return <Redirect to='/events' />;
  if (shouldRedirect) return <Redirect to='/register' />;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => sendData(e, { email, password }, 'login', setIsLoged)}>
          {textFieldMail(email, setEmail)}
          {textFieldPassword(password, setPassword)}
          {btnEntrar(classes)}
          {registerLink(setShouldRedirect)}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Login;
