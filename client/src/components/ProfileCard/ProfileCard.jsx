import React, { useState } from "react";
import "./ProfileCard.css";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

function ProfileCard({ card }) {
    return (
        <div className="gallerie">
            {card.map((card, index) => {
                return <Card key={index} card={card} />;
            })}
        </div>
    );
}

export default ProfileCard;

const Card = ({ card }) => {
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
            {show ? <Repost handleClose={handleClose} /> : null}
            {card.link === "" ? (
                <div className="cardItems">
                    <div className="only-description" style={{ color: "red" }}>
                        {card.text}
                    </div>
                </div>
            ) : (
                <div className="cardItems">
                    <div className="post-card">
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreHorizIcon
                                fontSize="large"
                                style={{ color: "#fff" }}
                            />
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
                                <div className="Menu_Item">
                                    <MenuItem onClick={handleShow}>
                                        edit
                                    </MenuItem>
                                    <MenuItem>Delete</MenuItem>
                                </div>
                            </MenuItem>
                        </Menu>
                    </div>

                    <img
                        className="img"
                        src={"http://localhost:5000" + card.link}
                        Alt="post"
                    />
                    <div className="description">{card.text}</div>
                </div>
            )}
        </div>
    );
};

const Repost = ({ handleClose }) => {
    return (
        <>
            <div className="form-popup">
                <div className="form-container">
                    <button
                        type="button"
                        class="close btn-close"
                        onClick={handleClose}
                    />
                    <label className="title-label">
                        <b> Edit Post</b>
                    </label>
                    <div className="desc-field">
                        <textarea
                            className="field-description"
                            name="description"
                            placeholder=" Write Here .. "
                        />
                    </div>
                    {/* <div className="field">
                        <input
                            type="file"
                            placeholder="image"
                            name="img"
                            accept="image/png, image/jpeg "
                        />
                    </div> */}
                    <button className="button">Edit</button>
                </div>
            </div>
        </>
    );
};
