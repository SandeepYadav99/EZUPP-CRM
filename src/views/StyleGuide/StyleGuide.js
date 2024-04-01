import React from 'react';
import PageBoxComponent from "../../components/PageBox/PageBox.component";
import {
    ActionButton, ArrowActionButton,
    ArrowOutlineButton,
    ArrowPrimaryButton,
    OutlineButton,
    PrimaryButton
} from "../../components/Buttons/PrimaryButton";
import styles from './Style.module.css';
import {Typography} from "@mui/material";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import StatusPill from "../../components/Status/StatusPill.component";

const StyleGuide = ({}) => {
    return (
        <PageBoxComponent>
            <div className={'formFlex'}>
                <div className={styles.sideMargin}>
                    <div><Typography variant={'h5'}>Normal</Typography></div>
                    <div className={styles.boxCont}>
                        <PrimaryButton>
                            Normal
                        </PrimaryButton>
                    </div>
                    <div className={styles.boxCont}>
                        <PrimaryButton disabled={true}>
                            Normal
                        </PrimaryButton>
                    </div>
                </div>
                <div className={styles.sideMargin}>
                    <div><Typography variant={'h5'}>Outline</Typography></div>
                    <div className={styles.boxCont}>
                        <OutlineButton>
                            Normal
                        </OutlineButton>
                    </div>
                    <div className={styles.boxCont}>
                        <OutlineButton disabled={true}>
                            Normal
                        </OutlineButton>
                    </div>
                </div>

                <div className={styles.sideMargin}>
                    <div><Typography variant={'h5'}>Action</Typography></div>
                    <div className={styles.boxCont}>
                        <ActionButton>
                            Normal
                        </ActionButton>
                    </div>
                    <div className={styles.boxCont}>
                        <ActionButton disabled={true}>
                            Normal
                        </ActionButton>
                    </div>
                </div>
                <div className={styles.sideMargin}>
                    <div><Typography variant={'h5'}>Small</Typography></div>
                    <div className={styles.boxCont}>
                        <PrimaryButton size={'small'}>
                            Normal
                        </PrimaryButton>
                    </div>
                    <div className={styles.boxCont}>
                        <PrimaryButton disabled={true} size={'small'}>
                            Normal
                        </PrimaryButton>
                    </div>
                </div>

            </div>

            <br/>
            <br/>
            <div className={'formFlex'}>
                <div className={styles.sideMargin}>
                    <div><Typography variant={'h5'}>Arrow Normal</Typography></div>
                    <div className={styles.boxCont}>
                        <ArrowPrimaryButton>
                            Normal
                        </ArrowPrimaryButton>
                    </div>
                    <div className={styles.boxCont}>
                        <ArrowPrimaryButton disabled={true}>
                            Normal
                        </ArrowPrimaryButton>
                    </div>
                </div>
                <div className={styles.sideMargin}>
                    <div><Typography variant={'h5'}>Outline</Typography></div>
                    <div className={styles.boxCont}>
                        <ArrowOutlineButton>
                            Normal
                        </ArrowOutlineButton>
                    </div>
                    <div className={styles.boxCont}>
                        <ArrowOutlineButton disabled={true}>
                            Normal
                        </ArrowOutlineButton>
                    </div>
                </div>

                <div className={styles.sideMargin}>
                    <div><Typography variant={'h5'}>Action</Typography></div>
                    <div className={styles.boxCont}>
                        <ArrowActionButton>
                            Normal
                        </ArrowActionButton>
                    </div>
                    <div className={styles.boxCont}>
                        <ArrowActionButton disabled={true}>
                            Normal
                        </ArrowActionButton>
                    </div>
                </div>

            </div>

            <br/>
            <br/>
            <div className={''}>
                <div className={styles.sideMargin}>
                    <div><Typography variant={'h5'}>Text</Typography></div>
                    <div className={styles.boxCont}>
                        <CustomTextField label={'Name'}/>
                        <br/>
                        <br/>
                        <CustomTextField label={'Name'} isError={true}/>

                        <br/>
                        <br/>
                        <CustomTextField label={'Name'} value={'Electrovese'}/>
                    </div>
                </div>
            </div>
            <div className={''}>
                <div className={styles.sideMargin}>
                    <div><Typography variant={'h5'}>Status</Typography></div>
                    <div className={styles.boxCont}>
                        <StatusPill status={'High'} color={'high'} /> &nbsp;
                        <StatusPill status={'Medium'} color={'medium'} /> &nbsp;
                        <StatusPill status={'Low'} color={'low'} />
                    </div>
                </div>
            </div>


        </PageBoxComponent>
)
};


export default StyleGuide;
