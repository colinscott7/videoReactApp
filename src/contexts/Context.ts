import { StateDocument } from "../interfaces/StateDocument";

export abstract class Context {
  public location: Location;
  public window: Window;
  public projectPath?: string;
  public timeStart?: number;
  public duration?: number;
  public hasCompleted?: boolean;

  constructor(location: Location, window: Window) {
    this.window = window;
    this.location = window.location;
  }

  public abstract load(): Promise<StateDocument>;

  public abstract completed(): void;

  public abstract exit(): Promise<void>;
}
