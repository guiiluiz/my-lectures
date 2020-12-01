import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ViewListSharpIcon from '@material-ui/icons/ViewListSharp';
import LocalBarSharpIcon from '@material-ui/icons/LocalBarSharp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { userLogout, validateLogin } from '../service';

const user = JSON.parse(localStorage.getItem('user')) || '';

const listIcon = [
  <LocalBarSharpIcon />,
  <ViewListSharpIcon />,
  <AccountCircleIcon />,
  <ExitToAppTwoToneIcon />,
];

const mock = [
  ['Explorar Eventos', 'events'],
  ['Meus Eventos', 'confirmed'],
  ['Meu Perfil', 'profile'],
  ['Sair', 'login'],
];


if (user.manager) {
  mock.unshift(['Cadastrar Evento', 'create']);
  listIcon.unshift(<AddCircleIcon />);
  mock.unshift(['Relatórios', 'reports']);
  listIcon.unshift(<AssessmentIcon />);
}

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#f50057',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    backgroundColor: '#f50057',
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    paddingTop: theme.spacing(3),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  link: {
    textDecoration: 'none',
    display: 'flex',
    color: 'gray',
  },
}));

function tableItens(list, classes) {
  return list.map((text, index) => {
    return (
      text[0] && (
        <Link to={`/${text[1]}`} key={text[0]} className={classes.link}>
          <ListItem
            button
            onClick={() => {
              if (text[1] === 'login') userLogout();
            }}>
            <ListItemIcon>{listIcon[index]}</ListItemIcon>
            <ListItemText primary={text[0]} />
          </ListItem>
        </Link>
      )
    );
  });
}

function iconDrawer(classes, handleDrawerClose, theme) {
  return (
    <div className={classes.drawerHeader}>
      <IconButton onClick={handleDrawerClose}>
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </div>
  );
}

function appBarSlider(classes, handleDrawerOpen, title, open) {
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

function SideBar({ children, title = 'My Lectures' }) {
  const [isLoged, setIsLoged] = useState(true);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    validateLogin(setIsLoged);
  }, []);

  if (!isLoged || !user) return <Redirect to='/login' />;
  return (
    <div className={classes.root}>
      <CssBaseline />
      {appBarSlider(classes, handleDrawerOpen, title, open)}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}>
        {iconDrawer(classes, handleDrawerClose, theme)}
        <List>{tableItens(mock, classes)}</List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
}

export default SideBar;
