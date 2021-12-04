import React, { useState } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import "./UpdateSlide.css";

function UpdateSlide() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const close = () => {
        setAnchorEl(null);
    };
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    return (
        <div>
            <div className="dots">
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreHorizIcon fontSize="large" style={{ color: "#333" }} />
                </IconButton>

                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={close}
                    PaperProps={{
                        style: {
                            marginLeft: "1%",
                            marginTop: "4.6%",
                            maxHeight: 48 * 4.5,
                            width: "20ch",
                            display: "flex",
                            flexDirection: "column",
                        },
                    }}
                >
                    <MenuItem onClick={close}>
                        <div className="UP_Menu_Item">
                            <MenuItem onClick={handleShow}>edit</MenuItem>
                            <MenuItem>Delete</MenuItem>
                        </div>
                    </MenuItem>
                </Menu>
            </div>
            {show ? <Repost handleClose={handleClose} /> : null}
        </div>
    );
}

export default UpdateSlide;

const Repost = ({ handleClose }) => {
    return (
        <>
            {/* S ==== Slide */}
            <div className="form-UP-popup">
                <div className="form-UP-container">
                    <button
                        type="button"
                        className="close btn-close"
                        onClick={handleClose}
                    />
                    <div className="UP-field">
                        <input
                            type="file"
                            placeholder="image"
                            name="img"
                            accept="image/png, image/jpeg "
                        />
                    </div>
                    <button className="UP-button">Edit Slide</button>
                </div>
            </div>
        </>
    );
};
