import React from 'react';
import { Redirect } from 'react-router-dom';
import SideBar from '../components/SideBar';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return <Redirect to='/login'/>;
  const { name, email, manager } = user;
  return (
    <SideBar title="Meu perfil" children={
      <div>
        <label htmlFor="name">Nome: </label>
        <input type="text" value={name} id="name" name="name" readOnly />
        <label htmlFor="email">Email: </label>
        <input type="email" value={email} id="email" name="email" readOnly />
        <label htmlFor="role">Função: </label>
        <input type="text" value={manager ? 'Organizador' : 'Participante'} id="role" name="role" readOnly />
      </div>
    } />
  );
}

export default Profile;
