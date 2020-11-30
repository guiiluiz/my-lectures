import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    border: '1px solid black',
    margin: 15,
    textAlign: 'center',
  },
  cardContent: {
    height: '100%',
    minWidth: 250,
    maxWidth: 250,
    minHeight: 160,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  participants: {
    paddingTop: 0,
  },
});

async function getConfirmedList(id, user, setConfirmedList) {
  const url = `http://localhost:3001/event/confirmed/${id}`;
  const confirmedList = await fetch(url, { headers: { authorization: user.token } }).then((res) => res.json());
  setConfirmedList(confirmedList.participants);
}

function ReportCard({ event }) {
  const [confirmedList, setConfirmedList] = useState([]);
  const [showParticipants, setShowParticipants] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const classes = useStyles();

  useEffect(() => {
    getConfirmedList(event.event_id, user, setConfirmedList);
  }, []);

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => setShowParticipants(!showParticipants)} className={classes.cardContent}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h4">
            {event.name}
          </Typography>
        </CardContent>
        <CardContent className={classes.participants}>
          <Typography variant="h6" component="p">
            Confirmados: {confirmedList.length}
          </Typography>
          {showParticipants && <Typography component="p" align="left">
            <h4>Lista de Confirmados:</h4>
            {confirmedList.map((email) => <p>• {email}</p>)}
          </Typography>}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ReportCard;
