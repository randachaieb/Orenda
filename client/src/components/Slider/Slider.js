import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'
import { items } from './SliderImgs';

function SliderShow(props)
{
    return (
        <Carousel
        
        next={ (next, active) => console.log(`we left ${active}, and are now at ${next}`)}
        prev={ (prev, active) => console.log(`we left ${active}, and are now at ${prev}`) }
        >   
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    const ImgStyle = {
        width : "50rem",
        marginLeft : "70%",
        marginTop : "2%"
    }
    return (
        <Paper>
            {/* <h2>{props.item.name}</h2> */}
            {/* <p>{props.item.description}</p> */}
            <Button className="CheckButton">
            <img src={props.item.src} alt='ee' style={ImgStyle} />
1
            </Button>
        </Paper>
    )
}

export default SliderShow