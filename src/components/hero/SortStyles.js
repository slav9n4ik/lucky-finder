import {makeStyles} from "@material-ui/core/styles";
import {createStyles} from "@material-ui/core";

const SortStyles = (theme) => createStyles({
    initFiltersBlock: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex"
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
});

export default makeStyles(SortStyles);