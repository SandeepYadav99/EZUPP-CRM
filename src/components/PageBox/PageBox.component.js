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

const PageBox = ({
                    classes,
                    children,
                    title,
                    noBodyPadding,
                    bodyClass,
                    className,
                    disableWidgetMenu,
                    ...props
                }) => {
    console.log('props', props);
    return (
        <div className={classes.widgetWrapper}>
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
};

const styles = theme => ({
    widgetWrapper: {
        display: "flex",
        minHeight: "100%",
    },
    widgetHeader: {
        padding: theme.spacing(3),
        paddingBottom: theme.spacing(1),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    widgetRoot: {
        boxShadow: theme.customShadows.widget
    },
    widgetBody: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        background:"#F7F7F9"

    },
    noPadding: {
        padding: 0
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        overflow: "hidden",
    },
});

export default withStyles(styles, { withTheme: true })(PageBox);
