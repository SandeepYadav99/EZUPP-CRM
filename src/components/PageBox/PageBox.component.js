/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React from "react";
import classnames from "classnames";
import {
    Paper,
    Typography,
    IconButton
} from '@mui/material';
import {withStyles} from '@mui/styles';

import { MoreVert as MoreIcon } from '@mui/icons-material';

const Widget = ({
                    classes,
                    children,
                    title,
                    noBodyPadding,
                    bodyClass,
                    className,
                    disableWidgetMenu,
                    ...props
                }) => (
    <div class={classes.widgetWrapper}>
        <Paper className={classes.paper} classes={{ root: classes.widgetRoot }}>
            {/*<div className={classes.widgetHeader}>*/}
            {/*    {props.header}*/}
            {/*</div>*/}
            <div
                class={classnames(classes.widgetBody, {
                    [classes.noPadding]: noBodyPadding,
                    [bodyClass]: bodyClass
                })}
            >
                {children}
            </div>
        </Paper>
    </div>
);

const styles = theme => ({
    widgetWrapper: {
        display: "flex",
        minHeight: "100%"
    },
    widgetHeader: {
        padding: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    widgetRoot: {
        boxShadow: theme.customShadows.widget
    },
    widgetBody: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2
    },
    noPadding: {
        padding: 0
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        overflow: "hidden",
        backgroundColor: 'red'
    },
    moreButton: {
        margin: -theme.spacing.unit,
        padding: 0,
        width: 40,
        height: 40,
        color: theme.palette.text.hint,
        "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: "rgba(255, 255, 255, 0.35)"
        }
    }
});

export default withStyles(styles, { withTheme: true })(Widget);
