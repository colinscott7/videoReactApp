import { VTTFile, VTTParser } from "./VTTParser";
import classNames from "classnames";
import * as React from "react";

interface VTTPlayerProps {
  src: string;
  currentTimeInSeconds: number;
  classes?: string;
}

export const VTTPlayer = (props: VTTPlayerProps) => {
  const [VTTFile, setVTTFile] = React.useState<VTTFile>();

  /** Effects */
  React.useEffect(() => {
    const loadCaptions = async () => {
      var parser = new VTTParser();
      if (props.src) {
        const file = await parser.Get(props.src);
        setVTTFile(file);
      }
    };
    loadCaptions();
  }, [props.src]);

  /** Constants */
  const currentCuePoint = VTTFile?.GetCueForTime(props.currentTimeInSeconds * 1000);

  /** UI Views */
  return currentCuePoint ? (
    <div className={classNames("media-player-captions", props.classes)}>
      <span dangerouslySetInnerHTML={{ __html: currentCuePoint.match.text }}></span>
    </div>
  ) : null;
};
