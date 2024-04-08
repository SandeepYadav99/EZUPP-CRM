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
// import CustomTextField from '../../FormFields/TextField.component';
import ShadowBox from "../../components/ShadowBox/ShadowBox";
import UserCountAvatars, { UserCountAvatarsAnimation, UserCountAvatarsInitials, UserCountAvatarsLabelInitials, UserCountAvatarsLableAvatarGroup, UserCountAvatarsLableAvatarStatusIndicator, UserCountAvatarsShapes, UserCountAvatarsSize, UserCountAvatarsStatusIndicator } from '../../components/AvatarGroup/AvatarGroup';
import { UserCountRadioLables } from '../../components/BasicAndCustomRadio/RadioLables';
import { CustomOptionRadiosWithIcon } from '../../components/BasicAndCustomRadio/CustomOptionRadiosWithIcon';
import ColorPicker from '../../components/ColorPicker/ColorPicker';

const avatars=[
    'A',
    'B',
    'C',
    '2k'
]
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
                        <StatusPill status={'High'} color={'high'}/> &nbsp;
                        <StatusPill status={'Medium'} color={'medium'}/> &nbsp;
                        <StatusPill status={'Low'} color={'low'}/>
                    </div>
                </div>
            </div>

            <div className={''}>
                <div className={styles.sideMargin}>
                    <div><Typography variant={'h5'}>Status</Typography></div>
                    <div className={styles.boxCont}>
                        <ShadowBox>
                            <Typography variant={'h5'} color={'text.secondary'} sx={{mb: 1.5}}>Sales
                                Overview</Typography>
                            <Typography variant={'h4'} color={'secondary'}>42.5K</Typography>
                            <Typography variant={'body2'} color={'text.secondary'}>Total Sales</Typography>
                        </ShadowBox>
                    </div>
                </div>
            </div>


            <div className={''}>
                <div className={styles.sideMargin}>
                    <div><Typography variant={'h5'}>Status</Typography></div>
                    <div className={styles.boxCont}>
                        {
                            (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'caption', 'body1', 'body2', 'subtitle1', 'subtitle2', 'overline',]).map(key => {
                                return (<Typography variant={key}>Here is the text - {key}</Typography>)
                            })
                        }


                        <h5>Color Property</h5>
                        {
                            (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'caption', 'body1', 'body2', 'subtitle1', 'subtitle2', 'overline',]).map(key => {
                                return (<Typography color={'text.secondary'} variant={key}>Here is the text - {key}</Typography>)
                            })
                        }
                    </div>
                </div>
            </div>

           

           <div className={styles.boxContFlex}>
              {/* <UserCountAvatarsSize />
              <UserCountAvatarsInitials/> */}
              <UserCountAvatarsLabelInitials/>
              {/* <UserCountAvatarsShapes/> */}
              <UserCountAvatarsStatusIndicator/>
              <UserCountAvatarsLableAvatarStatusIndicator />
              <UserCountAvatarsLableAvatarGroup avatars={avatars}/>
           </div>
           <br/>
             <div>
              <div >
                
               </div >
            </div>
             <br/>
                <div >
                    <UserCountRadioLables/>
                </div>
         <br/>
               <div>
                 <CustomOptionRadiosWithIcon/>
              </div>
              <br/>
              <div>
               <ColorPicker/>
            </div>
            
        </PageBoxComponent>
    )
};


export default StyleGuide;
