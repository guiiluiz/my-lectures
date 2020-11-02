const express = require('express');
const rescue = require('../rescue');
const Event = require('../models/event');
const verifyJWT = require('../middlewares/verifyJWT');

const router = express.Router();

const createEvent = async (req, res) => {
  const { name, date, city, street, number, description, manager } = req.body;
  if (!manager) return res.status(401).json({ message: 'Usuário sem permissão!' });
  const eventDetails = { name, date, city, street, number, description };
  return Event.create(eventDetails).then(() => res.status(201).json(eventDetails));
};

const confirmedCount = async (req, res) => {
  const eventId = req.params.id;
  const { email } = req.user;
  return Event.confirmedCount(eventId, email).then(({ confirmedCount }) => res.status(200).json(confirmedCount));
};

const confirmUser = async (req, res) => {
  const eventId = req.body.id;
  const { email } = req.user;
  return Event.confirm(eventId, email).then(() => res.status(200).json({ isConfirmed: true }));
};

const disconfirmUser = async (req, res) => {
  const eventId = req.body.id;
  const { email } = req.user;
  return Event.disconfirm(eventId, email).then(() => res.status(200).json({ isConfirmed: false }));
};

const userIsConfirmed = async (req, res) => {
  const eventId = req.params.id;
  const { email } = req.user;
  const result = await Event.isUserConfirmed(eventId, email);
  return res.status(200).json({ isConfirmed: result ? true : false });
};

const userEvents = async (req, res) => {
  const { email } = req.user;
  return Event.getUserEvents(email).then(response => res.status(200).json(response));
};

const allEvents = async (_req, res) => Event.getAll().then(body => res.status(200).json(body));

const eventDetails = async (req, res) => {
  const eventId = req.params.id;
  return Event.getDetails(eventId).then(event => res.status(200).json(event));
};

router.post('/', verifyJWT, rescue(createEvent));

router.get('/confirmed/:id', verifyJWT, rescue(confirmedCount));

router.post('/confirm', verifyJWT, rescue(confirmUser));

router.post('/disconfirm', verifyJWT, rescue(disconfirmUser));

router.get('/confirm/:id', verifyJWT, rescue(userIsConfirmed));

router.get('/user', verifyJWT, rescue(userEvents));

router.get('/', verifyJWT, rescue(allEvents));

router.get('/:id', verifyJWT, rescue(eventDetails));

module.exports = router;
