import React, {useEffect, useState, useRef} from "react";
import './Slideshow.css';
import WindowFocusHandler from "../window-focus-handler/WindowFocusHandler";

const Slideshow = props => {
    const {slides} = props || [];
    const {timeout} = props || 5000;
    const [currentSlide, setCurrentSlide] = useState(0);
    const intervalId = useRef(0);
    const lastSlide = useRef(currentSlide);

    useEffect(() => {
        if (slides && slides.length !== 0) {
            intervalId.current = setInterval(() =>
                setCurrentSlide(prev => {
                    lastSlide.current = prev;
                    return (prev + 1) % slides.length;
                }), timeout);
        }

        return () => {
            clearInterval(intervalId.current);
        }
    }, [slides, timeout]);

    const initSlideshow = () => {
        if (slides && slides.length !== 0) {
            clearInterval(intervalId.current);
            intervalId.current = setInterval(nextSlide, timeout);
        }
    }

    const nextSlide = () => {
        setCurrentSlide(prev => {
            lastSlide.current = prev;
            return (prev + 1) % slides.length;
        });
    }

    const getTransitionEffect = i => {
        if (currentSlide === i)
            return "showing-fade";
        if (lastSlide.current === i)
            return "showing-out";
        return '';
    }

    const getSlides = () => {
        if (!slides || slides.length === 0)
            return
        return slides.map((slide, i) => {
            return <li key={i} className = {`slide ${(getTransitionEffect(i))}`} style={{backgroundImage: `url(${slide})`}}/>;
        })
    }

    const onFocus = () => {
        clearInterval(intervalId.current);
        initSlideshow()
    }

    const onBlur = () => {
        clearInterval(intervalId.current);
    }

    return <>
        <WindowFocusHandler onFocus={onFocus} onBlur={onBlur}  />
        <div className="slideshow-container">
            <ul className="slides">
                {getSlides()}
            </ul>
        </div>
    </>
}
export default Slideshow;