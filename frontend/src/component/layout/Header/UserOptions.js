import React, { Fragment, useState } from 'react';
import "./Header.css";
import profile from "../../../images/Profile.png";
import Backdrop from "@material-ui/core/Backdrop";

import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import PersonIcon from "@material-ui/icons/Person";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert';
import { logOut } from '../../../actions/userAction';
import { useDispatch } from "react-redux"


const UserOptions = ({ user }) => {

    const navigate = useNavigate()
    const alert = useAlert();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);


    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ]
    if (user.role === "admin") {
        options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard })
    }
    function dashboard() {
        navigate("/dashboard")
    }
    function account() {
        navigate("/account")
    }
    function orders() {
        navigate("/orders")
    }
    function logoutUser() {
        dispatch(logOut());
        alert.success("Logout Sucessfully")
    }

    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial ariaLabel='SpeedDial tooltip example'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                style={{ zIndex: "11" }}
                direction='down'
                className='speedDial'
                icon={<img className='speedDialIcon' src={user.avatar.url ? user.avatar.url : profile} alt='Profile' />}
            >
                {
                    options.map((item) =>
                        <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} />

                    )
                }
            </SpeedDial>
        </Fragment >
    )
}

export default UserOptions