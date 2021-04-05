import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 90
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

const Gender = (props) => {
    const classes = useStyles();
    const [gender, setGender] = useState(props.row.rowPositionInfo.rowData.gender);

    const handleChange = (event) => {
        setGender(event.target.value);
        props.grid.refreshGrid();
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender}
                    onChange={handleChange}
                >
                    <MenuItem name="F" value="F">F</MenuItem>
                    <MenuItem name="M" value="M">M</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default Gender