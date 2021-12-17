export class VTTFile {
  Cues: Cue[];
  duration: number;

  constructor() {
    this.Cues = [];
    this.duration = 0;
  }
  AddCue(cue: any) {
    this.Cues.push(cue);
    this.duration = Math.max(cue.End, this.duration);
  }
  GetCueForTime(milliseconds: number) {
    if (milliseconds > this.duration) {
      return null;
      //return { EOF: true };
    }
    const cue = this.Cues.find((c) => {
      return c.Start! <= milliseconds && c.End! >= milliseconds;
    });
    return cue;
  }
  GetAllCuesUpTo(milliseconds: number): Cue[] {
    const result = this.Cues.filter((c) => c.Start! <= milliseconds); // && c.End >= milliseconds);
    // console.log(result);
    // console.log("GetAllCuesUpTo ", milliseconds, result.length);
    return result;
  }
}
class Cue {
  public Start?: number;
  public End?: number;
  public Text?: string;
  match: any;
}
export class VTTParser {
  constructor() {
    this.Get = this.Get.bind(this);
  }
  parseText(text: string) {
    let captionRegex = /(?:<v((?:[.](?:[\S]+))*)(.*) [/]*>)(.*)/gi;
    const result = captionRegex.exec(text);
    return result
      ? {
          classes: result[1].trim().split("."),
          speaker: result[2].trim(),
          text: result[3].trim(),
          speakerName: result[2].trim().split("-")[0],
        }
      : {
          classes: "",
          speaker: "",
          text: text.trim(),
          speakerName: "",
        };
  }
  Get(captionFileUrl: string) {
    let closure = this;
    if (!captionFileUrl) {
      return Promise.reject(new Error("No URL supplied to VTT Parser"));
    }
    return window
      .fetch(captionFileUrl)
      .then((response) => {
        if (response.status !== 200) {
          console.error("not found ....");
          return "";
        } else {
          return response.text();
        }
      })
      .then((theFile) => {
        //parse the file
        let lines = theFile.split("\n");
        const file = new VTTFile();
        //parse header

        let inBlock = false;
        let currentBlock = null;

        for (let i = 1; i < lines.length; i++) {
          //debugger;
          let line = lines[i];
          if (!inBlock) {
            //look for timing
            const timerMarkerIndex = line.indexOf("-->");
            if (timerMarkerIndex > -1) {
              inBlock = true;
              if (currentBlock) {
                currentBlock.match = closure.parseText(currentBlock.Text!);
              }
              const times = closure.ParseVTTTime(line);
              currentBlock = new Cue();
              currentBlock.Start = times.start;
              currentBlock.End = times.end;
              currentBlock.Text = "";

              //currentBlock.Start = i;
              //currentBlock.End = i;
              file.AddCue(currentBlock);
            } else {
              //move on
              continue;
            }
          } else {
            //in block
            // console.dir(line);
            if (line === "\n" || line === "\r" || line === "\r\n" || line === "") {
              inBlock = false;
              continue;
            }
            currentBlock!.Text += line + "\n";
          }
          //       console.log(line);
        }

        // lines.forEach(function(line){
        //    console.log(line);
        // },this);

        if (currentBlock) {
          currentBlock.match = closure.parseText(currentBlock.Text!);
        }

        return file;
        // debugger;
        // console.log(file);
      });
  }
  ParseVTTTime(timeString: string) {
    //debugger;
    const parts = timeString.split("-->");
    const part1 = parts[0].trim();
    const part2 = parts[1].trim();
    let result = {
      start: this.ConvertTime(part1),
      end: this.ConvertTime(part2),
    };
    return result;
  }

  ConvertTime(time: string) {
    //time = time.replace(".",":");
    time = time.replace(",", ".");
    //debugger;
    const parts = time.split(":");
    const hours = parseFloat(parts[0]);
    const minutes = parseFloat(parts[1]);
    const seconds = parseFloat(parts[2]);

    return hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
  }
}

// export let vttParser = new VTTParser();
