import React, { Fragment, useState, useEffect } from 'react';
import "./ResetPassword.css";
import Loader from '../layout/Loader/Loader';
import LockIcon from "@material-ui/icons/Lock"
import LockOpenIcon from "@material-ui/icons/LockOpen"
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";



const PasswordReset = () => {
    const dispatch = useDispatch();
    const { token } = useParams();
    const alert = useAlert();
    const navigate = useNavigate();


    const { error, loading, success } = useSelector(state => state.forgotPassword)


    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myform = new FormData();
        myform.set("password", password);
        myform.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(token, myform));
    }


    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors)
        }
        if (success) {
            alert.success("Password Update Successfully");
            navigate("/login")

        }
    }, [dispatch, error, alert, navigate, success])


    return (
        <Fragment>
            {
                loading ? (<Loader />) : (
                    <Fragment>
                        <MetaData title="Reset Password" />
                        <div className="resetPasswordContainer">
                            <div className='resetPasswordBox'>
                                <h2 className='resetPasswordHeading'> Reset Password</h2>
                                <form className='resetPasswordForm' onSubmit={resetPasswordSubmit}>

                                    <div >
                                        <LockOpenIcon />
                                        <input
                                            type='password'
                                            placeholder='New Password'
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div >
                                        <LockIcon />
                                        <input
                                            type='password'
                                            placeholder='Confirm Password'
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>

                                    <input type='submit' value="Update" className='resetPasswordBtn' />
                                </form>
                            </div>

                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default PasswordReset