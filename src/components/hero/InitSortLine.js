import React from "react";
import Grid from "@material-ui/core/Grid";
import {MenuItem, TextField} from "@material-ui/core";
import {sex} from "../utils/sexItems";
import {sort} from "../utils/sortItems";
import Button from "@material-ui/core/Button";
import CircularProgressWithLabel from "../common/CircularProgressWithLabel";
import SortStyles from "./SortStyles";

export default function InitSortLine({currentFilter, filterHandler, initSearchHandler, progress}) {
    const classes = SortStyles();

    return(
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
                            id="birthMonth"
                            name="birthMonth"
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
    );
}