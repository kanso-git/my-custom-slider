import React from "react";

const SliderContent = (props: any) => (
  <div
    className="SliderContent"
    style={{
      transform: `translateX(-${props.translate}px)`,
      transition: `transform ease-out ${props.transition}s`,
      height: "100%",
      width: `${props.width}px`,
      display: "flex"
    }}
  >
    {props.children}
  </div>
);

export default SliderContent;
