import { useState } from "react";
import * as bs from "reactstrap";
import * as cpx from "../../components";
import * as hook from "../../hooks";

interface TranscriptProps {
  htmlRef?: any;
  color?: string;
  vttFile: any;
}
export const Transcript = (props: TranscriptProps) => {
  const handleCueClick = (cue: any) => (evt: any) => {
    evt.preventDefault();
    props.htmlRef.current!.currentTime = cue / 1000;
  };

  return (
    <>
      <bs.Card color={props.color}>
        <div className="card-header">
          <bs.Button color={props.color} className="media-player-download-transcript-btn">
            <cpx.LineAwesome icon="las la-download" />
            <span className="sr-only">Download text version</span>
          </bs.Button>
          <h3 className="card-title h6 mb-0">Transcript</h3>
        </div>
        <bs.CardBody>
          <ul className="list-group list-group-flush">
            {props.vttFile &&
              props.vttFile.Cues.map((cuePoint: any, index: number) => {
                return (
                  <>
                    <li className="list-group-item" key={`cues___${index}`}>
                      <bs.Button
                        color={props.color}
                        tabIndex={0}
                        onClick={handleCueClick(cuePoint.Start)}
                        aria-labelledby={`timestamp_${index}`}
                      >
                        <span className="mr-2">{hook.formatMediaTime(cuePoint.Start / 1000)}</span>
                        <span id={`timestamp_${index}`}>{cuePoint.match.text}</span>
                      </bs.Button>
                    </li>
                  </>
                );
              })}
          </ul>
        </bs.CardBody>
      </bs.Card>
    </>
  );
};
