export enum EActionType {
  UPDATE_SLIDE = "UPDATE_SLIDE",
  MUTE_VIDEO = "MUTE_VIDEO",
  SET_VOLUME = "SET_VOLUME",
  TOGGLE_PLAY_VIDEO = "TOGGLE_PLAY_VIDEO"
}
export interface IAction {
  type: EActionType;
  payload: any;
}

export enum EMediaType {
  IMAGE = "IMAGE",
  VEDIO = "VEDIO",
  AUDIO = "AUDIO"
}

export interface ISlide {
  id: string;
  src: string;
  displayDuration?: number;
  mediaType: EMediaType;
  volume?: number;
  playing?: boolean;
}

export type IState = ISlide[];
