import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    border: '1px solid black',
    margin: 15,
    textAlign: 'center',
  },
  cardContent: {
    height: '100%',
    minWidth: 260,
    maxWidth: 260,
    minHeight: 200,
    maxHeight: 250,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  eventLocation: {
    paddingTop: 0,
  },
});

function EventCard({ event }) {
  const date = new Date(event.date);
  const eventDate = date.toLocaleString();
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea href={`/events/${event.event_id}`} className={classes.cardContent}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h4">
            {event.name}
          </Typography>
          <Typography color="textSecondary">
            {eventDate}
          </Typography>
        </CardContent>
        <CardContent className={classes.eventLocation}>
          <Typography component="p">
            {`${event.street}, ${event.number}`}
          </Typography>
          <Typography variant="h6" component="p">
            {event.city}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default EventCard;
