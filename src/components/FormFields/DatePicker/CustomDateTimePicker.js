/**
 * Created by charnjeetelectrovese@gmail.com on 2/7/2020.
 */

import React, { useMemo} from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useTheme } from '@mui/styles';

// import DateFnsUtils from "@date-io/date-fns";

const CustomDateTimePicker = ({onChange, minDate, isError, maxDate, value, label, clearable, helperText}) => {
    const theme = useTheme();
    const handleOnChange = (e, d) => {
        // const tempDate  = new Date(e);
        // const formattedDate = tempDate.getDate() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getFullYear();
        // console.log(formattedDate);

        onChange && onChange(e);
    }

    const mD = useMemo(() => {
        const d = new Date();
        d.setFullYear(d.getFullYear() + 10);
        return maxDate ? maxDate : d;
    }, [maxDate]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
             helperText={ helperText}
                clearable
                margin="dense"
                variant="inline"
                id="time-picker"
                fullWidth
                sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                    borderColor:isError ? theme.palette.error.main : "",
                    },
                    
                  "& .MuiInputLabel-root": {
                    color: theme.palette.text.primary,
                    marginTop: theme.spacing(-0.5),
                  },
                  "& .MuiInputLabel-shrink": {
                    marginTop:theme.spacing(0.05),
                    },
                   width:1
                }}
                // style={{ textAlign: 'center' }} 
                label={label}
                value={value ? dayjs(value) : null}
                onChange={handleOnChange}
                inputVariant={'outlined'}
             
                
                error={isError ? true : false}
                minDate={minDate && dayjs(minDate)}
                maxDate={mD ? dayjs(mD) : dayjs()}
                showTodayButton
                // KeyboardButtonProps={{
                //     'aria-label': 'change time',
                // }}
            />
        </LocalizationProvider>
    );
}

export default CustomDateTimePicker;
