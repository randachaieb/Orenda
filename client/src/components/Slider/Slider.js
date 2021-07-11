import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@material-ui/core";
import { items } from "./SliderImgs";
import "./Slider.css";
import SliderPopup from "./SliderPopup";
import UpdateSlide from "./UpdateSlide";

const SliderShow = () => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <UpdateSlide />

            <div className="carousel">
                <Carousel
                    next={(next, active) =>
                        console.log(`we left ${active}, and are now at ${next}`)
                    }
                    prev={(prev, active) =>
                        console.log(`we left ${active}, and are now at ${prev}`)
                    }
                >
                    {items.map((item, i) => (
                        <Item key={i} item={item} />
                    ))}
                </Carousel>
            </div>

            <div className="SliBtn">
                <button className="add_btn" onClick={handleShow}>
                    {" "}
                    Add Slide{" "}
                </button>

                {show ? <SliderPopup handleClose={handleClose} /> : null}
            </div>
        </>
    );
};

function Item(props) {
    const ImgStyle = {
        width: "100%",
    };
    const ContainerStyle = {
        width: "50rem",
        display: "flex",
        justifyContent: "center",
    };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            {/* <Points /> */}
            <Paper style={ContainerStyle}>
                <Button className="CheckButton">
                    <img src={props.item.src} alt="ee" style={ImgStyle} />
                </Button>
            </Paper>
        </div>
    );
}

export default SliderShow;
