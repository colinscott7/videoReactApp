import React, { useMemo } from "react";
import classNames from "classnames";
import { action, makeAutoObservable, runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import * as bs from "reactstrap";
import * as cpx from "../../components";
import * as hook from "../../hooks";
import { MediaPlayerState } from "../../stores/MediaPlayerState";
import { MediaPlayerProps } from "../../interfaces/MediaPlayerProps";
import { VTTFile, VTTParser } from "../vtt/VTTParser";

interface AudioPlayerProps extends MediaPlayerProps {}

export const AudioPlayer = observer((props: AudioPlayerProps) => {
  const state = useMemo<MediaPlayerState>(() => new MediaPlayerState(), []);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const isPlaying = React.useRef<boolean>();
  const [vttFile, setVTTFile] = React.useState<VTTFile>();

  /** Handlers */
  const handlePlayPause = action(async () => {
    if (state.paused) {
      play();
      isPlaying.current = true;
    } else {
      pause();
      isPlaying.current = false;
    }
  });
  const handleEnded = action((evt: any) => {
    state.completed = true;
    handlePlayPause();
  });
  const handleTimeUpdate = action((evt: any) => {
    runInAction(() => {
      state.currentTimeInSeconds = audioRef.current!.currentTime;
    });
  });
  const handleDurationUpdate = action((evt: any) => {
    state.duration = audioRef.current!.duration;
  });
  const handleToggleCaptions = action((evt: any) => {
    state.enableCaptions = !state.enableCaptions;
  });
  const handleToggleTranscript = action((evt: any) => {
    state.enableTranscript = !state.enableTranscript;
  });

  /** Utilities */
  const pause = action(() => {
    if (audioRef.current && isPlaying.current) {
      audioRef.current.pause();
      state.paused = true;
    }
  });
  const play = async () => {
    if (audioRef.current) {
      await audioRef.current.play();
      runInAction(() => (state.paused = false));
    }
  };

  const resumeAt = (percentage: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = audioRef.current.duration * (percentage / 100);
      if (isPlaying.current) {
        play();
      }
    }
  };

  const loadCaptions = async () => {
    var parser = new VTTParser();
    if (props.captions) {
      const file = await parser.Get(props.captions);
      setVTTFile(file);
    }
  };

  /** Constants  */
  const currentTimeInSeconds = hook.formatMediaTime(state.currentTimeInSeconds);
  const duration = hook.formatMediaTime(state.duration);
  const playPauseButtonLabel = state.paused ? "Play" : "Pause";
  const ccButtonLabel = state.paused ? "Closed Captions On" : "Closed Captions Off";
  const transcriptButtonLabel = state.paused ? "Transcript Enabled" : "Transcript Disabled";
  const currentPercent = (state.currentTimeInSeconds / state.duration) * 100;

  /** Effects  */
  React.useEffect(() => {
    loadCaptions();
    audioRef.current!.addEventListener("ended", handleEnded);
    audioRef.current!.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current!.addEventListener("durationchange", handleDurationUpdate);

    if (props.autoPlay && state.paused) {
      handlePlayPause();
    }
  }, []);

  /** UI Views */
  const playPauseButton = (
    <bs.Button color={props.color} onClick={handlePlayPause} className="media-player-playpause-btn">
      {state.paused ? (
        <cpx.LineAwesome icon="las la-play" />
      ) : (
        <cpx.LineAwesome icon="las la-pause" />
      )}
      <span className="sr-only">{playPauseButtonLabel}</span>
    </bs.Button>
  );
  const captionsButton = props.captions && (
    <bs.Button
      color={props.color}
      onClick={handleToggleCaptions}
      className="media-player-captions-btn"
    >
      {state.enableCaptions ? (
        <cpx.LineAwesome icon="las la-closed-captioning text-secondary" />
      ) : (
        <cpx.LineAwesome icon="las la-closed-captioning" />
      )}
      <span className="sr-only">{ccButtonLabel}</span>
    </bs.Button>
  );
  const transcriptButton = props.captions && (
    <bs.Button
      color={props.color}
      onClick={handleToggleTranscript}
      className="media-player-transcript-btn"
    >
      {state.enableTranscript ? (
        <cpx.LineAwesome icon="las la-file-alt text-secondary" />
      ) : (
        <cpx.LineAwesome icon="las la-file-alt" />
      )}
      <span className="sr-only">{transcriptButtonLabel}</span>
    </bs.Button>
  );
  const timeDisplay = (
    <div className="media-player-time mr-auto">
      {currentTimeInSeconds} / {duration}
    </div>
  );

  const audioPlayerView = (
    <div className="media-player audio-player">
      {state.enableCaptions && props.captions && (
        <div className="media-player-subtitles">
          <cpx.VTTPlayer src={props.captions} currentTimeInSeconds={state.currentTimeInSeconds} />
        </div>
      )}
      <cpx.Scrubber currentPercent={currentPercent} onEndScrub={resumeAt} onStartScrub={pause} />
      <div className={`media-player-controls bg-${props.color}`}>
        <bs.ButtonGroup>
          {playPauseButton}
          {timeDisplay}
        </bs.ButtonGroup>
        <bs.ButtonGroup>
          {captionsButton}
          {transcriptButton}
        </bs.ButtonGroup>
      </div>
      {state.enableTranscript && (
        <div className="media-player-transcript">
          <cpx.Transcript vttFile={vttFile} color={props.color} htmlRef={audioRef} />
        </div>
      )}
    </div>
  );

  return (
    <>
      {audioPlayerView}
      <audio
        src={props.src}
        ref={audioRef}
        loop={props.loop}
        muted={props.muted}
        autoPlay={props.autoPlay}
        className="d-none"
      />
    </>
  );
});
