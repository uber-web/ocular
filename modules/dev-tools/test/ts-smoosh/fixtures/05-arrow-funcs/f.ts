export type State = {
  a: string;
};
export type Action = {
  payload: string;
};

export const createMapUpdater = (state: State, action: Action): State => {
  return state;
};
