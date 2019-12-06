import { handle } from "redux-pack";
import {
  GET_NEW_IDEA,
  UPDATE_IDEA,
  RESET_NEW_IDEA,
  SET_IDEA_INDEX
} from "./constants";
import { guuid } from "../../../services/guuid";
import moment from "moment";

const initialState = {
  isLoading: false,
  id: "",
  createdDate: "",
  message: "",
  index: -1
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_NEW_IDEA:
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
          id: guuid(),
          createdDate: moment().format("MMM Do YYYY")
        }),
        success: prevState => ({
          ...prevState
        })
      });
    case UPDATE_IDEA: {
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
            ...prevState,
            message: "Idea updated successfully!"
          };
        },
        success: prevState => ({
          ...prevState
        })
      });
    }
    case SET_IDEA_INDEX: {
      return {
        ...state,
        index: payload
      };
    }
    case RESET_NEW_IDEA: {
      return {
        ...initialState
      };
    }
    default:
      return state;
  }
};
