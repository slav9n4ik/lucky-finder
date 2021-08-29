import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                sLav9n4ik Website
            </Link>{' '}
            {2021}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    const classes = useStyles();
    return(
        <footer className={classes.footer}>
            <Copyright />
        </footer>
    );
}