export type State = {
  a: string;
};
export type Action = {
  payload: string;
};
export declare function createMapUpdater(state: State, action: Action): State;
