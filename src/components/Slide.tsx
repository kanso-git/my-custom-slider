import "./slide.css";
import React, { useRef, useContext } from "react";
// import { findDOMNode } from "react-dom";
// import * as screenfull from "screenfull";
import * as ReactPlayer from "react-player";
import { ISlide, EMediaType, EActionType } from "../actions";
import { DispatchContext } from "../context/slider.context";

interface SlideProps extends ISlide {
  width: number;
}

const Slide = (props: SlideProps) => {
  const dispatch = useContext(DispatchContext);
  let player = useRef(null) as any;

  const renderImageSlide = ({ src, width }: SlideProps) => (
    <div
      style={{
        height: "100%",
        width: `${width}px`,
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}
    />
  );

  const renderVideoSlide = ({ src, width }: SlideProps) => (
    <div
      id="player-wrapper"
      className="player-wrapper"
      style={{
        height: "100%",
        width: `${width}px`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}
    >
      <ReactPlayer.default
        ref={player}
        id="react-player"
        className="react-player"
        url={src}
        playing={props.playing}
        volume={props.volume}
        muted={props.playing ? false : true}
        onDuration={handleDuration}
        onEnded={handleEnded}
        onError={e => console.log("onError", e)}
      />
    </div>
  );

  const handleDuration = (duration: number) => {
    if (duration && !props.displayDuration) {
      console.log("set Video duration", duration);
      dispatch({
        type: EActionType.UPDATE_SLIDE,
        payload: {
          id: props.id,
          data: {
            displayDuration: duration
          }
        }
      });
    }
  };
  const handleEnded = () => {
    //setState({ playing: state.loop });
    if (props.playing) {
      console.log("Video stopped... ");
      dispatch({
        type: EActionType.UPDATE_SLIDE,
        payload: {
          id: props.id,
          data: {
            playing: false
          }
        }
      });
    }
  };
  /*
  useEffect(() => {
    if (props.playing && player) {
      const el = document.getElementById("react-player");
      if (el) {
        // el.removeAttribute("style");
        //document.getElementsByTagName("video")[0].webkitEnterFullscreen();
      }
    }
    return () => {
      if (props.mediaType === EMediaType.VEDIO && props.playing) {
        console.log("set playing is off when existing ............");
        dispatch({
          type: EActionType.UPDATE_SLIDE,
          payload: {
            id: props.id,
            data: {
              playing: false
            }
          }
        });
      }
    };
  }, [props.mediaType, props.playing, dispatch]);
  */

  switch (props.mediaType) {
    case EMediaType.IMAGE:
      return renderImageSlide(props);
    case EMediaType.VEDIO:
      return renderVideoSlide(props);
    default:
      return null;
  }
};

export default Slide;
