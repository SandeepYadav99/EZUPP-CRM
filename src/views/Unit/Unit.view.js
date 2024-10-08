/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React, {Component} from 'react';
import {Button, MenuItem, withStyles, FormControlLabel, Switch, IconButton} from '@material-ui/core';
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux';
import {
    renderTextField,
    renderSelectField,
    renderOutlinedTextField,
    renderOutlinedSelectField,
    renderFileField,
    renderOutlinedMultipleSelectField, renderCheckbox
} from '../../libs/redux-material.utils';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import styles from "./Style.module.css";
import {Delete as DeleteIcon} from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import MuiStyle from "../../libs/MuiStyle";
import {serviceTypeCheck} from "../../services/Type.service";
import {serviceUnitCheck} from "../../services/Unit.service";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


let requiredFields = []
const validate = (values) => {
    const errors = {};

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        } else if( values[field] && typeof values[field] == 'string' && !(values[field]).trim()) {
            errors[field] = 'Required'
        }
    });
    if (values.name && !/^[A-Z ]*$/i.test(values.name)) {
        errors.name = 'Only alphabets are allowed';
    }
    return errors
};

let lastValue = '';
let isExists = false;

const asyncValidate = (values, dispatch, props) => {
    return new Promise((resolve, reject) => {
        if (values.name) {
            const value = values.name;
            if (lastValue == value && isExists && false) {
                reject({name: 'Unit Name already Taken'});
            } else {
                const data = props.data;
                serviceUnitCheck({name: value, id: data ? data.id : null }).then((data) => {
                    console.log(data);
                    lastValue = value;
                    if (!data.error) {
                        if (data.data.is_exists) {
                            reject({name: 'Unit Name already Taken'});
                        }
                    }
                    resolve({});
                })
            }
        } else {
            resolve({});
        }
    });
};

const nameNormalize = (value, prevValue) => {
    if ((value.length) > 50) {
        return prevValue
    } else {
        return value
            // ? value.toLowerCase() : value;
    }
}

class CreateContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'INDIVIDUAL',
            is_active: true,
            is_general: false,
            show_confirm: false,
        };
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleActive = this._handleActive.bind(this);
        this._handleDelete = this._handleDelete.bind(this);
        this._handleDialogClose = this._handleDialogClose.bind(this);
        this._suspendItem = this._suspendItem.bind(this);
        this._handleTypeChange = this._handleTypeChange.bind(this);
        this._handleChange = this._handleChange.bind(this);
    }

    componentDidMount() {
        const {data} = this.props;
        if (data) {
            requiredFields=['name']
            Object.keys(data).forEach((val) => {
                if(['status'].indexOf(val) == -1) {
                    const temp = data[val];
                    this.props.change(val, temp);
                }
            });
            this.setState({
                is_active: data.status == 'ACTIVE',
                is_general: data.is_general
            })
        }
        else {
            requiredFields=['name']
        }
    }

    _handleTypeChange(e) {
        this.setState({
            type: e.target.value
        });
    }


    _handleSubmit(tData) {
        //console.log(tData)
        const general = this.state.is_general
        const status = this.state.is_active ? 'ACTIVE' : 'INACTIVE';
        const {data} = this.props;
        if (data) {
            this.props.handleDataSave({ ...tData, status: status,is_general: general, id: data.id }, 'UPDATE')
        } else {
            this.props.handleDataSave({...tData, status: status,is_general: general}, 'CREATE')
        }
    }

    _handleChange(){
        this.setState({
            is_general: !this.state.is_general,
        })
    }

    _renderFeatured() {
        return (
            <Field
                color={'primary'}
                name="is_general"
                component={renderCheckbox}
                label={"Is General"}
                onChange={this._handleChange}
            />
        )
    }

    _convertData(data) {
        const temp = {};
        data.forEach((val) => {
            temp[val.id] = val.name;
        });
        return temp;
    }

    // _handleReject() {
    //     const {data} = this.props;
    //     this.props.changeStatus(data, 'REJECT');
    // }

    _renderReject() {
        if (this.props.data) {
            return (<Button variant={'contained'}
                            className={this.props.classes.btnError}
                            onClick={this._handleReject}
                            type="button">
                Reject
            </Button>);
        }
        return null;
    }

    _renderMenuTypes(){
        return this.props.tour_types.map((val)=>{
            return (
                <MenuItem value={val.id}>{val.name}</MenuItem>
            )
        })
    }

    _handleActive() {
        this.setState({
            is_active: !this.state.is_active,
        });
    }


    _renderStatus(){
        const {data} = this.props;
        // if (data) {
            return (<FormControlLabel
                control={
                    <Switch color={'primary'} checked={this.state.is_active} onChange={this._handleActive.bind(this)}
                            value="is_active"/>
                }
                label="Active ?"
            />);
        // } else {
        //     return null;
        // }
    }

    _suspendItem() {
        const {data} = this.props;
        this.setState({
            show_confirm: false,
        });
        this.props.handleDelete(data.id);
    }

    _handleDialogClose() {
        this.setState({
            show_confirm: false,
        })
    }


    _handleDelete() {
        this.setState({
            show_confirm: true
        });
    }


    _renderDialog() {
        const {classes} = this.props;
        if (this.state.show_confirm) {
            return (<Dialog
                keepMounted
                TransitionComponent={Transition}
                open={this.state.show_confirm}
                onClose={this._handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                classes={{paper: classes.dialog}}
            >
                <DialogTitle id="alert-dialog-title">{"Are You Sure"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to delete the item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this._handleDialogClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={this._suspendItem} color="primary">
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>)
        } return null;
    }



    render() {
        const {handleSubmit, data} = this.props;
        return (
            <div>
                <div className={styles.headerFlex}>
                    <h4 className={styles.infoTitle}>
                        <div className={styles.heading}>Type</div>
                        <Tooltip title="Info" aria-label="info" placement="right">
                            <InfoIcon fontSize={'small'}/>
                        </Tooltip>

                    </h4>
                    {data && <IconButton variant={'contained'} className={this.props.classes.iconBtnError}
                                         onClick={this._handleDelete}
                                         type="button">
                        <DeleteIcon />
                    </IconButton> }
                </div>

                <form onSubmit={handleSubmit(this._handleSubmit)}>

                    <div className={'formFlex'} style={{alignItems:'center'}}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true} name="name" component={renderOutlinedTextField}
                                   margin={'dense'}
                                   normalize={nameNormalize}
                                   label="Unit Name"/>
                        </div>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'} >
                            {this._renderFeatured()}
                        </div>
                        <div className={'formGroup'}>
                            {this._renderStatus()}
                        </div>
                    </div>

                    <div style={{float: 'right'}}>
                        <Button variant={'contained'} color={'primary'} type={'submit'}>
                            Submit
                        </Button>
                    </div>

                </form>
                {this._renderDialog()}
            </div>
        )
    }

}

const useStyle = MuiStyle;


const ReduxForm = reduxForm({
    form: 'createprovider',  // a unique identifier for this form
    validate,
    asyncValidate,
    // asyncBlurField: ['email'],
    enableReinitialize: true,
    // onSubmitFail: errors => {
    //     EventEmitter.dispatch(EventEmitter.THROW_ERROR, 'Rejected');
    // }
})(withStyles(useStyle, {withTheme: true})(CreateContainer));

const mapStateToProps = state => {
    //console.log(user_profile);
    return {}
};

export default connect(mapStateToProps, null)(ReduxForm);
