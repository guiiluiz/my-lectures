import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export async function validateLogin(setIsLoged) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return setIsLoged(false);
  const result = await fetch('http://localhost:3001/user', {
    method: 'GET',
    headers: { authorization: user.token },
  }).then(res => res.json());
  if (!result || result.message === 'jwt expired') {
    setIsLoged(false);
    return false;
  }
  setIsLoged(true);
  return true;
}

export async function sendData(event, data, url, setIsLoged) {
  // event.preventDefault();
  const result = await fetch(`http://localhost:3001/${url}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => res.json());
  if (result.message) return alert('Dados Inválidos! Tente Novamente');
  localStorage.setItem('user', JSON.stringify(result));
  setIsLoged(true);
}

export function userLogout() {
  return localStorage.removeItem('user');
}

export const usingStyle = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {`Copyright © MyLectures ${new Date().getFullYear()}.`}
    </Typography>
  );
}
