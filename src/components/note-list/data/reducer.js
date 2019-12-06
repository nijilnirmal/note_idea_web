import { handle } from "redux-pack";
import { GET_ALL_IDEAS, DELETE_IDEA } from "./constants";
import { get as getSession } from "../../../services/storage";

const initialState = {
  isLoading: false,
  notes: [],
  message: ""
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_IDEAS:
      return handle(state, action, {
        start: prevState => {
          return {
            ...prevState,
            isLoading: true
          };
        },
        finish: prevState => ({ ...prevState, isLoading: false }),
        failure: prevState => ({
          ...prevState,
          notes: getSession()
        }),
        success: prevState => ({
          ...prevState
        })
      });
    case DELETE_IDEA: {
      return handle(state, action, {
        start: prevState => {
          return {
            ...prevState,
            isLoading: true,
            message: ""
          };
        },
        finish: prevState => ({ ...prevState, isLoading: false }),
        failure: prevState => {
          return {
            ...initialState,
            message: "Idea deleted successfully!"
          };
        },
        success: prevState => ({
          ...prevState
        })
      });
    }
    default:
      return state;
  }
};
