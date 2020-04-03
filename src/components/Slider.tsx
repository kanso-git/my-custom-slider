import React, { useState, useEffect, useRef, useContext } from "react";
import SliderContent from "./SliderContent";
import Slide from "./Slide";
import { SliderContext, DispatchContext } from "../context/slider.context";
import { ISlide, EMediaType, EActionType } from "../actions";

const getWidth = () => window.innerWidth;

const Slider = () => {
  const slides = useContext(SliderContext);
  const dispatch = useContext(DispatchContext);

  const firstSlide = slides[0];
  const secondSlide = slides[1];
  const lastSlide = slides[slides.length - 1];

  const [timeoutId, setTimeoutId] = useState<string>();
  const [state, setState] = useState({
    activeSlide: 0,
    translate: getWidth(),
    transition: 0.45,
    _slides: [lastSlide, firstSlide, secondSlide]
  });

  //console.log(state);
  const { activeSlide, translate, _slides, transition } = state;

  const autoPlayRef = useRef<any>();
  const transitionRef = useRef<any>();
  const resizeRef = useRef<any>();

  // runs each time we set the state
  useEffect(() => {
    autoPlayRef.current = nextSlide;
    transitionRef.current = smoothTransition;
    resizeRef.current = handleResize;
  });

  useEffect(() => {
    /*
    // old way we playing video 
    const play = () => {
      autoPlayRef.current();
    };
   */
    const smooth = (e: any) => {
      if (e.target.className.includes("SliderContent")) {
        transitionRef.current();
      }
    };

    const resize = () => {
      resizeRef.current();
    };

    const transitionEnd: any = window.addEventListener("transitionend", smooth);
    const onResize: any = window.addEventListener("resize", resize);

    //let interval: any;

    /*
    if (props.autoPlay) {
      //alert(state.activeSlide);
      //interval = setInterval(play, 5000);
    }*/

    return () => {
      window.removeEventListener("transitionend", transitionEnd);
      window.removeEventListener("resize", onResize);

      /*
      if (props.autoPlay) {
        clearInterval(interval);
      }*/
    };
  }, []);

  // see the original video https://www.youtube.com/watch?time_continue=17&v=0lPOnnOdP-s&feature=emb_logo
  useEffect(() => {
    if (transition === 0) setState({ ...state, transition: 0.75 }); // was 0.45 before
  }, [transition, state]);

  const handleResize = () => {
    setState({ ...state, translate: getWidth(), transition: 0 });
  };

  const smoothTransition = () => {
    let _slides: ISlide[] = [];

    // We're at the last slide.
    if (activeSlide === slides.length - 1)
      _slides = [slides[slides.length - 2], lastSlide, firstSlide];
    // We're back at the first slide. Just reset to how it was on initial render
    else if (activeSlide === 0) _slides = [lastSlide, firstSlide, secondSlide];
    // Create an array of the previous last slide, and the next two slides that follow it.
    else _slides = slides.slice(activeSlide - 1, activeSlide + 2);

    setState({
      ...state,
      _slides,
      transition: 0,
      translate: getWidth()
    });
  };

  const nextSlide = () => {
    setState({
      ...state,
      translate: translate + getWidth(),
      activeSlide: activeSlide === slides.length - 1 ? 0 : activeSlide + 1
    });
  };

  useEffect(() => {
    const { displayDuration, mediaType, id, playing, ended } = slides[
      state.activeSlide
    ];
    console.log(
      `Current Active Slide[${id}] 
     Type[${mediaType}] 
     Playing[${playing}]
     Ended[${ended}]
     duration in sec:[${displayDuration}]`
    );
    if (displayDuration) {
      if (mediaType === EMediaType.IMAGE) {
        if (!timeoutId || timeoutId !== id) {
          console.log("Set timeout image ............");
          setTimeout(() => {
            console.log("Consume timeout image ............");
            // play the next slide
            autoPlayRef.current();
          }, displayDuration * 1000);
          setTimeoutId(id);
        }
      } else if (mediaType === EMediaType.VEDIO) {
        // request the video play
        if (!timeoutId || timeoutId !== id) {
          setTimeoutId(id);
          dispatch({
            type: EActionType.UPDATE_SLIDE,
            payload: {
              id,
              data: {
                playing: true,
                ended: false
              }
            }
          });
        } else {
          if (!playing && ended) {
            autoPlayRef.current();
          }
        }
      }
    }
  }, [state.activeSlide, slides, dispatch, timeoutId]);

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        margin: "0 auto",
        overflow: "hidden",
        whiteSpace: "nowrap"
      }}
    >
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth() * _slides.length}
      >
        {_slides.map((_slide, i) => (
          <Slide width={getWidth()} key={_slide.src + i} {..._slide} />
        ))}
      </SliderContent>
    </div>
  );
};

export default Slider;
