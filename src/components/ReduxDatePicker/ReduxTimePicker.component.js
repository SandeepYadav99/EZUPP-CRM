/**
 * Created by charnjeetelectrovese@gmail.com on 1/27/2020.
 */
import React, {Component} from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {TimePicker} from "@mui/x-date-pickers";
// import DateFnsUtils from "@date-io/date-fns";

class ReduxDatePicker extends Component {
    constructor(props) {
        super(props);
        this._handleOnChange = this._handleOnChange.bind(this);
    }

    _handleOnChange(e, d) {
        const hours = e.getHours();
        const minutes = e.getMinutes();


        this.props.onChange(e);
    }

    render() {
        const {value, label, ampm, minDate} = this.props;
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                    margin="dense"
                    variant="inline"
                    id="time-picker"
                    fullWidth
                    label={label}
                    ampm={ampm}
                    minDate={new Date()}
                    value={value ? value : (new Date())}
                    onChange={this._handleOnChange}
                    inputVariant={'outlined'}
                    minutesStep={5}
                    format={
                        "HH:mm"
                    }
                    // KeyboardButtonProps={{
                    //     'aria-label': 'change time',
                    // }}
                />
            </LocalizationProvider>
        );
    }

}

export default ReduxDatePicker;
