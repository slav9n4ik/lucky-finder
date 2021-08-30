import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {Checkbox, FormControlLabel, MenuItem, TextField} from "@material-ui/core";
import CircularProgressWithLabel from "../common/CircularProgressWithLabel";
import {useSelector} from "react-redux";
import {sex} from "../utils/sexItems";
import {sort} from "../utils/sortItems";
import InitSortLine from "./InitSortLine";
import MainSortLine from "./MainSortLine";

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6)
    },
    initFiltersBlock: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex"
    },
    heroButtons: {
        marginTop: theme.spacing(4)
    },
    heroButton: {
        padding: "1em 3em"
    },
    forms: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '20ch',
        },
    },
}));

export default function Hero({filters, searchHandler, initSearchHandler, progress}) {
    const classes = useStyles();
    const [currentFilter, setCurrentFilter] = useState(null);

    useEffect(() => {
        setCurrentFilter(filters)
    }, [filters])

    function filterHandler(event) {
        const {name, value} = event.target;
        setFilter(name, value);
    }

    function filterCheckedHandler(event) {
        const {name, checked} = event.target;
        setFilter(name, checked)
    }

    function setFilter(name, value) {
        let newFilters = {...currentFilter};
        newFilters[name] = value;
        setCurrentFilter(newFilters);
    }

    return(
        currentFilter !== null ? <div className={classes.heroContent}>
            <Container maxWidth="xl">
                <InitSortLine currentFilter={currentFilter}
                              filterHandler={(event) => filterHandler(event)}
                              initSearchHandler={(currentFilter) => initSearchHandler(currentFilter)}
                              progress={progress}
                />

                <MainSortLine currentFilter={currentFilter}
                              filterCheckedHandler={(event) => filterCheckedHandler(event)}
                              searchHandler={(currentFilter) => searchHandler(currentFilter)}
                />
            </Container>
        </div> : <div/>
    );
}