import { combineReducers } from "redux";
import appbar from "../components/appbar/data/reducer";
import noteForm from "../components/note-form/data/reducer";
import noteList from "../components/note-list/data/reducer";

export default () =>
  combineReducers({
    appbar,
    noteForm,
    noteList
  });
