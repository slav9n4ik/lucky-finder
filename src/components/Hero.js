import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {Checkbox, FormControlLabel, MenuItem, TextField} from "@material-ui/core";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

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

const sex = [
    {
        value: 1,
        label: 'Женщина',
    },
    {
        value: 0,
        label: 'Мужчина',
    }
];

const sort = [
    {
        value: 0,
        label: 'По популярности',
    },
    {
        value: 1,
        label: 'По дате регистрации',
    }
];

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
        console.log("currentFilter: ", currentFilter)
        setCurrentFilter(newFilters);
    }

    return(
        currentFilter !== null ? <div className={classes.heroContent}>
            <Container maxWidth="xl">
                <Grid container spacing={2} className={classes.initFiltersBlock}>
                    <Grid item>
                        <form className={classes.forms} noValidate autoComplete="off">
                            <div>
                                <TextField
                                    id="sex"
                                    name="sex"
                                    select
                                    label="Пол"
                                    value={currentFilter.sex}
                                    variant="outlined"
                                    onChange={(event) => filterHandler(event)}
                                >
                                    {sex.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="birthDay"
                                    name="birthDay"
                                    label="День рождения"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={currentFilter.birthDay}
                                    variant="outlined"
                                    onChange={(event) => filterHandler(event)}
                                />
                                <TextField
                                    id="birthDay"
                                    name="birthDay"
                                    label="Месяц рождения"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={currentFilter.birthMonth}
                                    variant="outlined"
                                    onChange={(event) => filterHandler(event)}
                                />
                                <TextField
                                    id="sort"
                                    name="sort"
                                    select
                                    label="Сортировка"
                                    value={currentFilter.sort}
                                    variant="outlined"
                                    onChange={(event) => filterHandler(event)}
                                >
                                    {sort.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="count"
                                    name="count"
                                    label="Шаг запроса"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={currentFilter.count}
                                    variant="outlined"
                                    onChange={(event) => filterHandler(event)}
                                />
                            </div>
                        </form>
                    </Grid>
                    <Grid item>
                        <Button className={classes.heroButton}
                            variant="contained"
                            color="primary"
                            onClick={() => initSearchHandler(currentFilter)}
                        >
                            Загрузить данные
                        </Button>
                    </Grid>
                    <Grid item>
                        <CircularProgressWithLabel value={progress} />
                    </Grid>
                </Grid>

                <Grid container spacing={2} className={classes.initFiltersBlock}>
                    <Grid item>
                        <form className={classes.forms} noValidate autoComplete="off">
                            <div>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={currentFilter.instagram}
                                            onChange={(event) => filterCheckedHandler(event)}
                                            name="instagram"
                                            color="primary"
                                        />
                                    }
                                    label="Указан инстаграм"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={currentFilter.instagram}
                                            onChange={(event) => filterCheckedHandler(event)}
                                            name="instagram"
                                            color="primary"
                                        />
                                    }
                                    label="Больше 20 фото"
                                />
                            </div>
                        </form>
                    </Grid>
                    <Grid item>
                        <Button className={classes.heroButton}
                                variant="contained"
                                color="primary"
                                onClick={() => searchHandler(currentFilter)}
                        >
                            Поиск
                        </Button>
                    </Grid>
                    <Grid item>
                        <CircularProgressWithLabel value={progress} />
                    </Grid>
                </Grid>
            </Container>
        </div> : <div/>
    );
}