import { GET_ALL_IDEAS, DELETE_IDEA } from "./constants";
import axios from "axios";

export function getAllIdeas() {
  return {
    type: GET_ALL_IDEAS,
    promise: axios.get(`http://127.0.0.1/ideas/`)
  };
}

export function deleteIdea(data) {
  return {
    type: DELETE_IDEA,
    promise: axios.post(`http://127.0.0.1/idea/delete`, { data })
  };
}
