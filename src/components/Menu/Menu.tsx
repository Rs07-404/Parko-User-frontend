import React, { Dispatch, SetStateAction, useEffect } from "react";
import QRCode from "../QRCode/QRCode";
import "./Menu.css";
import { Box } from "@mui/material";
import { useAppContext } from "../../context/AppContext";

const Menu = () =>{
    const {screenWidth} = useAppContext()
    const classname = screenWidth>760?"Menu": "Menularge";
    return (
        <Box className={classname}>
            <div className="qrcodeArea"><QRCode /></div>
            <div className="profileButton">Profile</div>
        </Box>

    )
}

export default Menu