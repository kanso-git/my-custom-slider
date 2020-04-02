import React from "react";
import Slider from "./components/Slider";
import { SliderProvider } from "./context/slider.context";

function App() {
  return (
    <SliderProvider>
      <Slider />
    </SliderProvider>
  );
}

export default App;
