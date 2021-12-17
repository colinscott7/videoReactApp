import React from "react";

interface ScrubberProps {
  currentPercent: number;
  onStartScrub?: () => void;
  onEndScrub?: (percentage: number) => void;
}

export const Scrubber = (props: ScrubberProps) => {
  const rangeRef = React.useRef<HTMLDivElement>(null);
  const progressRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrubPercentage = React.useRef<number>(0);
  const [percentage, setPercentage] = React.useState<number>(0);
  const isScrubbing = React.useRef<boolean>(false);

  const calcPercentage = (mouseX: number) => {
    if (rangeRef.current && progressRef.current) {
      const rangeRect = rangeRef.current!.getBoundingClientRect();
      const mousePosition = Math.max(Math.min(mouseX - rangeRect.x, rangeRect.width), 0);
      scrubPercentage.current = (mousePosition / rangeRect.width) * 100;
      setPercentage(scrubPercentage.current);
    }
  };

  React.useLayoutEffect(() => {
    const handleStartScrub = (evt: any) => {
      evt.preventDefault();
      isScrubbing.current = true;
      calcPercentage(evt.clientX);
      props.onStartScrub && props.onStartScrub();
    };

    const handleEndScrub = (evt: any) => {
      evt.preventDefault();
      if (isScrubbing.current) {
        isScrubbing.current = false;
        props.onEndScrub && props.onEndScrub(scrubPercentage.current);
      }
    };

    const handleScrub = (evt: any) => {
      evt.preventDefault();
      if (isScrubbing.current) {
        calcPercentage(evt.clientX);
      }
    };

    containerRef.current!.addEventListener("pointerdown", handleStartScrub);
    document.body.addEventListener("pointermove", handleScrub);
    document.body.addEventListener("pointerup", handleEndScrub);
    return () => {
      document.body.removeEventListener("pointermove", handleScrub);
      document.body.removeEventListener("pointerup", handleEndScrub);
    };
  }, [props]);

  React.useLayoutEffect(() => {
    if (rangeRef.current && progressRef.current) {
      progressRef.current.style.width = `${percentage}%`;
    }
  }, [percentage]);

  React.useEffect(() => {
    if (rangeRef.current && progressRef.current && !isScrubbing.current) {
      setPercentage(props.currentPercent);
    }
  }, [props.currentPercent]);

  return (
    <div className="media-player-scrubber" ref={containerRef}>
      <div className="media-player-scrubber-range" ref={rangeRef}>
        <div className="media-player-scrubber-progress" ref={progressRef}></div>
      </div>
    </div>
  );
};
