import React from "react";
import Grid from "@material-ui/core/Grid";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SortStyles from "./SortStyles";
import {useSelector} from "react-redux";

export default function MainSortLine({currentFilter, filterCheckedHandler, searchHandler}) {
    const classes = SortStyles();
    const currentProfiles = useSelector(state => state.currentProfiles);

    return(
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
                                    checked={currentFilter.relation}
                                    onChange={(event) => filterCheckedHandler(event)}
                                    name="relation"
                                    color="primary"
                                />
                            }
                            label="Указана ссылка о семейном положении"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={currentFilter.relatives}
                                    onChange={(event) => filterCheckedHandler(event)}
                                    name="relatives"
                                    color="primary"
                                />
                            }
                            label="Указаны родственники"
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
                <label>
                    Найдено: {currentProfiles.data.total}
                </label>
            </Grid>
        </Grid>
    );
}