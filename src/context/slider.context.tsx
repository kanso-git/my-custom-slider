import React, { createContext, Dispatch, useReducer } from "react";
import { IState, IAction, EMediaType } from "../actions";
import sliderReducer from "../reducers/slider.reducer";

const defaultSlides: IState = [
  {
    id: "First slide",
    src:
      "https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80",
    displayDuration: 3,
    mediaType: EMediaType.IMAGE
  },
  {
    id: "Second slide",
    src: "http://localhost:4400/assets/videos/magic_kingdom.mp4",
    mediaType: EMediaType.VEDIO,
    volume: 0.01,
    playing: false
  },
  {
    id: "Third slide",
    src:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80",
    displayDuration: 6,
    mediaType: EMediaType.IMAGE
  },
  {
    id: "Fourth slide",
    src:
      "https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80",
    displayDuration: 6,
    mediaType: EMediaType.IMAGE
  },
  {
    id: "Fif slide",
    src:
      "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
    displayDuration: 5,
    mediaType: EMediaType.IMAGE
  },
  {
    id: "Six slide",
    src:
      "http://localhost:4400/assets/videos/eugenia_loli--golden_gate_bridge_timelapse.mp4",
    mediaType: EMediaType.VEDIO,
    volume: 0.1,
    playing: false
  }
];
//export const SliderContext = createContext<Partial<IState>>([]);
export const SliderContext = createContext<IState>(defaultSlides);
export const DispatchContext = createContext({} as Dispatch<IAction>);

export function SliderProvider(props: any) {
  const [state, dispatch] = useReducer(sliderReducer, defaultSlides);
  return (
    <SliderContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </SliderContext.Provider>
  );
}
