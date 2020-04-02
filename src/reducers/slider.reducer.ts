import { IState, IAction, EActionType } from "../actions";
const reducer = (slides: IState, action: IAction) => {
  console.log(action.type);
  switch (action.type) {
    case EActionType.UPDATE_SLIDE:
      return slides.map(slide =>
        slide.id === action.payload.id
          ? { ...slide, ...action.payload.data }
          : slide
      );
    default:
      return slides;
  }
};
export default reducer;
