import React, { Fragment, useRef, useState } from 'react';
import "./loginSignUp.css";
import profile from "../../images/Profile.png";
import Loader from '../layout/Loader/Loader';
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";


const LoginSignUp = () => {

    const loginTab = useRef(null);
    const switcherTabs = useRef(null);
    const registerTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(profile);


    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const { name, email, password } = user;
    const loginSubmit = () => {
        console.log("login Form Submited")
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const myform = new FormData();
        myform.set("name", name);
        myform.set("email", email);
        myform.set("password", password);
        myform.set("avatar", avatar);

        console.log("signup Form Submited")
    }

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.file[0]);
        } else {
            setUser({
                ...user,
                [e.target.name]: e.target.value
            })
        }
    }

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTabs.current.classList.add("shiftToNeutral")
            switcherTabs.current.classList.remove("shiftToRight")


            registerTab.current.classList.remove("shiftToNeutralForm")
            loginTab.current.classList.remove("shiftToLeft")
        }
        if (tab === "register") {
            switcherTabs.current.classList.remove("shiftToNeutral")
            switcherTabs.current.classList.add("shiftToRight")


            registerTab.current.classList.add("shiftToNeutralForm")
            loginTab.current.classList.add("shiftToLeft")
        }
    }


    return (
        <Fragment>
            <div className="LoginSignUpContainer">
                <div className='LoginSignUpBox'>
                    <div>
                        <div className='login_signup_toggle'>

                            <p onClick={(e) => { switchTabs(e, "login") }}>LOGIN</p>
                            <p onClick={(e) => { switchTabs(e, "register") }}>REGISTER</p>

                        </div>
                        <button ref={switcherTabs}></button>
                    </div>
                    <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                        <div className='loginEmail'>
                            <MailOutlineIcon />
                            <input
                                type='email'
                                placeholder='Email'
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className='loginPassword'>
                            <LockOpenIcon />
                            <input
                                type='password'
                                placeholder='Password'
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <Link to="/password/forget" >Forget Password ?</Link>
                        <input type='submit' value="Login" className='loginBtn' />
                    </form>
                    <form className='signUpForm' ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>
                        <div className='signUpName'>
                            <FaceIcon />
                            <input
                                type='text'
                                placeholder='Name'
                                required
                                name='name'
                                value={name}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className='signUpEmail'>
                            <MailOutlineIcon />
                            <input
                                type='email'
                                placeholder='Email'
                                required
                                name='email'
                                value={email}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className='signUpPassword'>
                            <LockOpenIcon />
                            <input
                                type='password'
                                placeholder='Password'
                                required
                                value={password}
                                name='password'
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className='registerImage'>
                            <img src={avatarPreview} alt='Avatar Preview' />
                            <input
                                type='file'

                                accept='image/*'
                                name='avatar'
                                onChange={registerDataChange}
                            />
                        </div>
                        <input type='submit' value="Register" className='signUpBtn' />
                    </form>
                </div>

            </div>
        </Fragment>
    )
}

export default LoginSignUp