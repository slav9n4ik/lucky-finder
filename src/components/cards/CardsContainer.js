import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, {Fragment} from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {useSelector} from "react-redux";
import ErrorDialog from "../common/ErrorDialog";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '70.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    }
}));

export default function CardsContainer() {
    const classes = useStyles();
    const currentProfiles = useSelector(state => state.currentProfiles);
    const initData = useSelector(state => state.initData);

    console.log(currentProfiles)
    return(
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
                {currentProfiles && currentProfiles.data.profiles.map((card) => (
                    <Grid item key={card.id} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={card['photo_200_orig']}
                                title={card.first_name + " " + card.last_name}
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {card.first_name + " " + card.last_name}
                                </Typography>
                                {card.instagram && <Typography>
                                    Instagram: {"  "}
                                    <Link rel="noopener"
                                          target="_blank"
                                          href={"https://www.instagram.com/" + card.instagram}>
                                        <b>{card.instagram}</b>
                                    </Link>
                                </Typography>}
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    <Link rel="noopener"
                                          target="_blank"
                                          href={"https://vk.com/id" + card.id}>
                                        В профиль
                                    </Link>
                                </Button>
                                <Button size="small" color="primary">
                                    Cкачать фотки
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <ErrorDialog isError={initData.error === true || currentProfiles === true}/>
        </Container>
    );
}