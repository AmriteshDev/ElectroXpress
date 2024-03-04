import React, { Fragment, useState, useEffect } from 'react';
import "./UpdateProfile.css";
import profile from "../../images/Profile.png";
import Loader from '../layout/Loader/Loader';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();


    const { user } = useSelector(state => state.user);
    const { error, loading, isUpdated } = useSelector(state => state.profile)

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(profile);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myform = new FormData();
        myform.set("name", name);
        myform.set("email", email);
        myform.set("avatar", avatar);
        dispatch(updateProfile(myform));
    }

    const updateProfileDataChange = (e) => {

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);

    }

    useEffect(() => {

        if (user) {
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url)
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors)
        }
        if (isUpdated) {
            alert.success("Profile Update Successfully");
            dispatch(loadUser())
            navigate("/account")
            dispatch({
                type: UPDATE_PROFILE_RESET
            });
        }
    }, [dispatch, error, alert, navigate, user, isUpdated])



    return (
        <Fragment>
            {
                loading ? (<Loader />) : (
                    <Fragment>
                        <MetaData title="Update Profile" />
                        <div className="updateProfileContainer">
                            <div className='updateProfileBox'>
                                <h2 className='updateProfileHeading'> Update Profile</h2>
                                <form className='updateProfileForm' encType="multipart/form-data" onSubmit={updateProfileSubmit}>
                                    <div className='updateProfileName'>
                                        <FaceIcon />
                                        <input
                                            type='text'
                                            placeholder='Name'
                                            required
                                            name='name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className='updateProfileEmail'>
                                        <MailOutlineIcon />
                                        <input
                                            type='email'
                                            placeholder='Email'
                                            required
                                            name='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div id='updateProfileImage'>
                                        <img src={avatarPreview} alt='Avatar Preview' />
                                        <input
                                            type='file'

                                            accept='image/*'
                                            name='avatar'
                                            onChange={updateProfileDataChange}
                                        />
                                    </div>
                                    <input type='submit' value="Update" className='updateProfileBtn' />
                                </form>
                            </div>

                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default UpdateProfile