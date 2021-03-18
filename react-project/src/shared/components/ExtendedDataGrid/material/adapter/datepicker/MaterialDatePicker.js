// @flow
// FIXME: Add correct types where FlowFixMe's have been used

import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import DateUtils from "@date-io/moment";
import { InlineDatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";

// import Toolbar from "@material-ui/core/Toolbar";
// const toolbar = <Toolbar />; //needed to import toolbar dor date picker

type ColorType = "primary" | "contrast";

type Props = {
  color: ColorType,
  classes: Object,
  label: string,
  selectedDate?: Date,
  onDateChange: (date: Date) => any,
};

const styles = (theme) => ({
  contrastScheme: {
    margin: 10,
    "& label": {
      color: `${theme.palette.primary.contrastText} !important`,
    },
    "& div": {
      color: `${theme.palette.primary.contrastText}`,
    },
    "& div:hover:not(.MuiInput-disabled):not(.MuiInput-focused):not(.MuiInput-error):before": {
      borderBottomColor: `${theme.palette.primary.contrastText}`,
    },
    "& div:before": {
      borderBottomColor: `${theme.palette.primary.contrastText}`,
    },
    "& div:after": {
      borderBottomColor: `${theme.palette.primary.contrastText}`,
    },
  },
  primaryScheme: {
    margin: 10,
    "& label": {
      color: `${theme.palette.primary.main} !important`,
    },
    "& div": {
      color: `${theme.palette.primary.main}`,
    },
    "& div:hover:not(.MuiInput-disabled):not(.MuiInput-focused):not(.MuiInput-error):before": {
      borderBottomColor: `${theme.palette.primary.main}`,
    },
    "& div:before": {
      borderBottomColor: `${theme.palette.primary.main}`,
    },
    "& div:after": {
      borderBottomColor: `${theme.palette.primary.main}`,
    },
  },
});

class MaterialDatePicker extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selectedDate,
      changed: false,
    };
  }

  static defaultProps = {
    color: "primary",
    format: "MM/DD/YYYY",
    selectedDate: new Date(),
  };

  handleOnChange = (date) => {
    const { selected } = this.state;

    if (selected.toDateString() === date.toDateString()) {
      return;
    }

    const { onDateChange } = this.props;

    if (onDateChange) {
      onDateChange(date);
    }

    this.setState({
      selected: date,
      changed: true,
    });
  };

  static getDerivedStateFromProps = (newProps, prevState) => {
    const { selected, changed } = prevState;
    const { selectedDate } = newProps;

    if (selected !== selectedDate) {
      const stateObj = { changed: false };

      if (!changed) {
        stateObj.selected = selectedDate;
      }

      return stateObj;
    }

    return null;
  };

  render = () => {
    const { classes, color, label, ...more } = this.props;
    const { selected } = this.state;

    return (
      <MuiPickersUtilsProvider utils={DateUtils}>
        <InlineDatePicker
          className={classNames({
            [classes.primaryScheme]: color === "primary",
            [classes.contrastScheme]: color === "contrast",
          })}
          color="primary"
          label={label}
          value={selected}
          onChange={(w) => this.handleOnChange(w.toDate())}
          {...more}
        />
      </MuiPickersUtilsProvider>
    );
  };
}

export default withStyles(styles)(MaterialDatePicker);
