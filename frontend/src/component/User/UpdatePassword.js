import React, { Fragment, useState, useEffect } from 'react';
import "./UpdatePassword.css";
import Loader from '../layout/Loader/Loader';
import LockIcon from "@material-ui/icons/Lock"
import LockOpenIcon from "@material-ui/icons/LockOpen"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant';


const UpdatePassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();


    const { error, loading, isUpdated } = useSelector(state => state.profile)


    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myform = new FormData();
        myform.set("oldPassword", oldPassword);
        myform.set("newPassword", newPassword);
        myform.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myform));
    }


    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors)
        }
        if (isUpdated) {
            alert.success("Profile Update Successfully");
            navigate("/account")
            dispatch({
                type: UPDATE_PASSWORD_RESET
            });
        }
    }, [dispatch, error, alert, navigate, isUpdated])


    return (
        <Fragment>
            {
                loading ? (<Loader />) : (
                    <Fragment>
                        <MetaData title="Update Password" />
                        <div className="updatePasswordContainer">
                            <div className='updatePasswordBox'>
                                <h2 className='updatePasswordHeading'> Update Password</h2>
                                <form className='updatePasswordForm' onSubmit={updatePasswordSubmit}>
                                    <div className='loginPassword'>
                                        <VpnKeyIcon />
                                        <input
                                            type='password'
                                            placeholder='Old Password'
                                            required
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className='loginPassword'>
                                        <LockOpenIcon />
                                        <input
                                            type='password'
                                            placeholder='New Password'
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className='loginPassword'>
                                        <LockIcon />
                                        <input
                                            type='password'
                                            placeholder='Confirm Password'
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>

                                    <input type='submit' value="Change" className='updatePasswordBtn' />
                                </form>
                            </div>

                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default UpdatePassword