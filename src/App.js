import React from "react";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import Appbar from "./components/appbar";
import NoteForm from "./components/note-form";
import NoteList from "./components/note-list";

const AppContainer = () => {
  return (
    <Provider store={store}>
      <Appbar />
      <NoteForm />
      <NoteList />
    </Provider>
  );
};

export default AppContainer;
