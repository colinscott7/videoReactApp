import { Context } from "./Context";
import { FauxContext } from "./FauxContext";

export class ContextFactory {
  static getContext(location: Location, window: Window): Context {
    return new FauxContext(location, window);
  }
}
