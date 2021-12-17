import { StateDocument } from "../interfaces/StateDocument";
import { Context } from "./Context";

export class FauxContext extends Context {
  public completed(): void {
    if (this.hasCompleted) return;
    console.log("Exercise completion achieved.");
    this.hasCompleted = true;
  }

  public load() {
    this.timeStart = performance.now();

    // return Promise.resolve({
    //   resourceType: "image",
    //   resourceUrl: "/test.jpg",
    // } as StateDocument);

    return Promise.resolve({
      resourceType: "video",
      resourceUrl: "/test.mp4",
    } as StateDocument);
  }

  public exit() {
    this.duration = performance.now() - this.timeStart!;

    console.log(`Exitiing after ${this.duration}ms`);
    return Promise.resolve();
  }
}
