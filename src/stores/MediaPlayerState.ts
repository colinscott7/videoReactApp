import { makeAutoObservable } from "mobx";

export class MediaPlayerState {
  paused: boolean = true;
  duration: number = 0;
  enableCaptions: boolean = true;
  enableFullscreen: boolean = false;
  enableAudio: boolean = true;
  enableTranscript: boolean = false;
  currentTimeInSeconds: number = 0;
  completed: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }
}
