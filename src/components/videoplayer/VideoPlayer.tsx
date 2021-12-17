import React, { useMemo } from "react";
import { action, runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import * as bs from "reactstrap";
import * as cpx from "../../components";
import * as hook from "../../hooks";
import { MediaPlayerProps } from "../../interfaces/MediaPlayerProps";
import { MediaPlayerState } from "../../stores/MediaPlayerState";
import { VTTFile, VTTParser } from "../vtt/VTTParser";

interface VideoPlayerProps extends MediaPlayerProps {}

export const VideoPlayer = observer((props: VideoPlayerProps) => {
  const state = useMemo<MediaPlayerState>(() => new MediaPlayerState(), []);
  const videoRef = React.useRef<HTMLVideoElement>(null);
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
    props.onComplete && props.onComplete();
    handlePlayPause();
  });
  const handleTimeUpdate = action((evt: any) => {
    runInAction(() => {
      state.currentTimeInSeconds = videoRef.current!.currentTime;
    });
  });
  const handleDurationUpdate = action((evt: any) => {
    state.duration = videoRef.current!.duration;
  });
  const handleToggleCaptions = action((evt: any) => {
    state.enableCaptions = !state.enableCaptions;
  });
  const handleToggleAudio = action((evt: any) => {
    if (state.enableAudio) {
      muteAudio();
      state.enableAudio = false;
    } else {
      unmuteAudio();
      state.enableAudio = true;
    }
  });
  const handleToggleFullscreen = action((evt: any) => {
    evt.preventDefault();
    evt.stopPropagation();
    let el = document.getElementById("videoHolder") as any;

    if (!document.fullscreenElement) {
      el.requestFullscreen().catch((err: any) => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  });

  const handleToggleTranscript = action((evt: any) => {
    state.enableTranscript = !state.enableTranscript;
  });

  /** Utilities */
  const pause = action(() => {
    if (videoRef.current && isPlaying.current) {
      videoRef.current.pause();
      state.paused = true;
    }
  });
  const play = async () => {
    if (videoRef.current) {
      await videoRef.current.play();
      runInAction(() => (state.paused = false));
    }
  };
  const muteAudio = action(() => {
    videoRef.current!.volume = 0;
    state.enableAudio = false;
  });
  const unmuteAudio = action(() => {
    videoRef.current!.volume = 1;
    state.enableAudio = true;
  });
  const resumeAt = (percentage: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = videoRef.current.duration * (percentage / 100);
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
  const audioButtonLabel = state.paused ? "Audio Enabled" : "Audio Disabled";
  const fullscreenButtonLabel = state.paused ? "Fullscreen Mode" : "Exit Fullscreen Mode";
  const transcriptButtonLabel = state.paused ? "Transcript Enabled" : "Transcript Disabled";
  const currentPercent = (state.currentTimeInSeconds / state.duration) * 100;

  /** Effects  */
  React.useEffect(() => {
    loadCaptions();
    videoRef.current!.addEventListener("ended", handleEnded);
    videoRef.current!.addEventListener("timeupdate", handleTimeUpdate);
    videoRef.current!.addEventListener("durationchange", handleDurationUpdate);

    if (props.autoPlay && state.paused) {
      handlePlayPause();
    }
    if (props.muted && state.enableAudio) {
      muteAudio();
    }
    document.addEventListener("fullscreenchange", (event) => {
      document.fullscreenElement
        ? (state.enableFullscreen = true)
        : (state.enableFullscreen = false);
    });
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
  const audioButton = (
    <bs.Button
      color={props.color}
      onClick={handleToggleAudio}
      className="media-player-audio-btn"
      disabled={props.muted}
    >
      {state.enableAudio ? (
        <cpx.LineAwesome icon="las la-volume-up" />
      ) : (
        <cpx.LineAwesome icon="las la-volume-mute text-secondary" />
      )}
      <span className="sr-only">{audioButtonLabel}</span>
    </bs.Button>
  );
  const fullscreenButton = props.allowFullscreen && (
    <bs.Button
      color={props.color}
      onClick={handleToggleFullscreen}
      className="media-player-fullscreen-btn"
    >
      {state.enableFullscreen ? (
        <cpx.LineAwesome icon="las la-compress-arrows-alt text-secondary" />
      ) : (
        <cpx.LineAwesome icon="las la-expand-arrows-alt" />
      )}
      <span className="sr-only">{fullscreenButtonLabel}</span>
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
    <div className="media-player-time mr-auto px-2">
      {currentTimeInSeconds} / {duration}
    </div>
  );

  const videoPlayerView = (
    <div
      id="videoHolder"
      className={`media-player video-player ${state.enableFullscreen ? "fullscreen" : ""}`}
    >
      <div className="ratio ratio-16x9">
        <video
          src={props.src}
          className="media-player-video"
          ref={videoRef}
          loop={props.loop}
          muted={props.muted}
          autoPlay={props.autoPlay}
          poster={props.poster}
        />
        {state.enableCaptions && props.captions && (
          <div className="media-player-subtitles">
            <cpx.VTTPlayer src={props.captions} currentTimeInSeconds={state.currentTimeInSeconds} />
          </div>
        )}
        {state.enableTranscript && (
          <div className="media-player-transcript">
            <cpx.Transcript vttFile={vttFile} color={props.color} htmlRef={videoRef} />
          </div>
        )}
      </div>
      <cpx.Scrubber currentPercent={currentPercent} onEndScrub={resumeAt} onStartScrub={pause} />
      <div className={`media-player-controls bg-${props.color}`}>
        <bs.ButtonGroup>
          {playPauseButton}
          {timeDisplay}
        </bs.ButtonGroup>
        <bs.ButtonGroup>
          {props.captions && captionsButton}
          {audioButton}
          {props.allowFullscreen && fullscreenButton}
          {props.captions && transcriptButton}
        </bs.ButtonGroup>
      </div>
    </div>
  );

  return <>{videoPlayerView}</>;
});
