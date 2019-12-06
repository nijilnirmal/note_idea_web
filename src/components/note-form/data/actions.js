import {
  GET_NEW_IDEA,
  UPDATE_IDEA,
  RESET_NEW_IDEA,
  SET_IDEA_INDEX
} from "./constants";
import axios from "axios";

export function getNewIdea() {
  return {
    type: GET_NEW_IDEA,
    promise: axios.get(`http://127.0.0.1/ideas/`)
  };
}

export function updateIdea(data) {
  return {
    type: UPDATE_IDEA,
    promise: axios.post(`http://127.0.0.1/idea/update`, { data })
  };
}

export function setIdeaIndex(index) {
  return {
    type: SET_IDEA_INDEX,
    payload: index
  };
}

export function resetIdea() {
  return {
    type: RESET_NEW_IDEA
  };
}
