import { ADD_NEW_IDEA } from "./constants";

const initialState = {
  isAddnewIdeaClicked: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_NEW_IDEA:
      return {
        ...state,
        isAddnewIdeaClicked: !state.isAddnewIdeaClicked
      };
    default:
      return state;
  }
};
