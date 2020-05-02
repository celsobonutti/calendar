import { useReducer } from 'react';

enum Actions {
  SetTrue,
  SetFalse,
  Toggle,
}

const reducer = (state: boolean, action: Actions) => {
  switch (action) {
    case Actions.SetTrue:
      return true;
    case Actions.SetFalse:
      return false;
    case Actions.Toggle:
      return !state;
  }
};

export const useToggler = (initialValue: boolean) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return {
    state,
    setTrue: () => dispatch(Actions.SetTrue),
    setFalse: () => dispatch(Actions.SetFalse),
    toggle: () => dispatch(Actions.Toggle),
  };
};
