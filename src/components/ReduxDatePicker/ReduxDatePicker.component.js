/**
 * Created by charnjeetelectrovese@gmail.com on 2/7/2020.
 */

import React, {Component} from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import DateFnsUtils from "@date-io/date-fns";

class ReduxDatePicker extends Component {
    constructor(props) {
        super(props);
        this._handleOnChange = this._handleOnChange.bind(this);
    }

    _handleOnChange(e, d) {
        // const tempDate  = new Date(e);
        // const formattedDate = tempDate.getDate() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getFullYear();

        this.props.onChange(e);
    }

    render() {
        const {value, label, minDate} = this.props;
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    margin="dense"
                    variant="inline"
                    id="time-picker"
                    fullWidth
                    label={label}
                    value={value ? value : (new Date())}
                    onChange={this._handleOnChange}
                    inputVariant={'outlined'}
                    format={
                        "dd-MM-yyyy"
                    }
                    minDate={minDate}
                    // KeyboardButtonProps={{
                    //     'aria-label': 'change time',
                    // }}
                />
            </LocalizationProvider>
        );
    }

}

export default ReduxDatePicker;
