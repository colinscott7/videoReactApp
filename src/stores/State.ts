import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { Context } from "../contexts/Context";
import { ContextFactory } from "../contexts/ContextFactory";
import { StateDocument } from "../interfaces/StateDocument";

class State {
  public stateDocument?: StateDocument;
  public context?: Context;

  constructor() {
    makeAutoObservable(this);
    this.loadStateDocument();
  }

  *loadStateDocument() {
    this.context = ContextFactory.getContext(window.location, window);
    this.stateDocument = yield this.context.load();
  }
}

export const storeContext = createContext<State>(new State());
