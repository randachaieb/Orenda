import { Flex, IconButton, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react";
import { useState,useEffect } from "react";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa"

export function CarouselSlider(){
    const [step,setStep] = useState(0)
    const handleDecrement = () =>{
        if(step ===0) setStep(300);else setStep(step-100)
    }
    const handleIncrement = () =>{
        if(step ===300) setStep(0);else setStep(step+100)
    }
    const autoIncrement = () =>{
                if(step ===300) setStep(0);else setStep(step+100)
            }
    useEffect(() => {
        const interval = setInterval(()=>{
            autoIncrement()
        },3000)
        return () => {
            clearInterval(interval)
        }
    }, [step])
    return(
        <Flex alignItems="center" w="100%">
            <IconButton aria-label="Left" variant="transparent" icon={<FaChevronLeft />} onClick={handleDecrement}/>
            <Slider defaultValue={0} min={0} value={step} max={300} step={100} mx={1}>
                <SliderTrack>
                    <SliderFilledTrack bg="primary" />
                </SliderTrack>
            </Slider>
            <IconButton aria-label="Right" variant="transparent" icon={<FaChevronRight />}onClick={handleIncrement}/>
        </Flex>
    )    
}