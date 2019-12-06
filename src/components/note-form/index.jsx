import React from "react";
import { connect } from "react-redux";
import {
  getNewIdea,
  updateIdea,
  resetIdea,
  setIdeaIndex
} from "./data/actions";
import { getAllIdeas } from "../note-list/data/actions";
import { set as setSession } from "../../services/storage";
import Loader from "../loader";
import SnackBar from "../snackbar";

class NoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      notes: [],
      chars_left: 140
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.message && prevProps.message !== this.props.message) {
      this.props.getAllIdeas();
      if (this.state.title && this.state.body) {
        this.setState({
          ...this.state,
          title: "",
          body: "",
          chars_left: 140
        });
      } else {
        this.props.setIdeaIndex(this.props.notes.length);
      }
    }

    if (this.props.isAddnewIdeaClicked !== prevProps.isAddnewIdeaClicked) {
      if (this.props.isAddnewIdeaClicked) {
        this.props.getNewIdea();
      } else {
        this.props.resetIdea();
      }
    }

    if (
      this.props.index >= 0 &&
      this.props.index < this.props.notes.length &&
      prevProps.index !== this.props.index
    ) {
      this.setState({
        title: this.props.notes[this.props.index].title,
        body: this.props.notes[this.props.index].body
      });
    }

    if (this.props.index === -1 && prevProps.index !== this.props.index) {
      this.setState({
        ...this.state,
        title: "",
        body: "",
        chars_left: 140
      });
    }
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
      chars_left: 140 - event.target.value.length
    });
  };

  handleUpdate = () => {
    if (this.state.title || this.state.body) {
      if (this.props.notes && this.props.notes.length > 0) {
        if (this.props.index !== -1) {
          this.setState(
            prevState => {
              let notes = this.props.notes.slice();
              notes[this.props.index].title = this.state.title;
              notes[this.props.index].body = this.state.body;
              return { notes: notes };
            },
            () => {
              setSession(this.state.notes);
              const data = {
                id: this.state.notes[this.props.index].id,
                title: this.state.title,
                body: this.state.body
              };
              this.props.updateIdea(data);
            }
          );
        } else {
          this.setState(
            {
              ...this.state,
              notes: [
                ...this.props.notes,
                {
                  id: this.props.id,
                  createdDate: this.props.createdDate,
                  title: this.state.title,
                  body: this.state.body
                }
              ]
            },
            () => {
              setSession(this.state.notes);
              const data = {
                id: this.props.id,
                title: this.state.title,
                body: this.state.body
              };
              this.props.updateIdea(data);
            }
          );
        }
      } else {
        this.setState(
          {
            ...this.state,
            notes: [
              {
                id: this.props.id,
                createdDate: this.props.createdDate,
                title: this.state.title,
                body: this.state.body
              }
            ]
          },
          () => {
            setSession(this.state.notes);
            const data = {
              id: this.props.id,
              title: this.state.title,
              body: this.state.body
            };
            this.props.updateIdea(data);
          }
        );
      }
    }
  };

  render() {
    return this.props.isAddnewIdeaClicked ? (
      <>
        <div style={styles.container}>
          <div style={styles.noteInputDiv}>
            <input
              style={styles.noteInput}
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
              onBlur={e => {
                e.preventDefault();
                this.handleUpdate();
              }}
            />
            <textarea
              style={styles.noteInput}
              id="body"
              name="body"
              maxLength={140}
              placeholder="Jot down your idea..."
              value={this.state.body}
              onChange={this.handleChange}
              onBlur={e => {
                e.preventDefault();
                this.handleUpdate();
              }}
            />
            {this.state.chars_left <= 15 ? (
              <p>Characters Left: {this.state.chars_left}</p>
            ) : null}
          </div>
        </div>
        {this.props.isLoading ? <Loader /> : null}
        <SnackBar message={this.props.message} />
      </>
    ) : null;
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },

  noteInputDiv: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "32px",
    padding: "8px",
    paddingTop: "16px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    borderRadius: "8px"
  },
  noteInput: {
    width: "92%",
    display: "inline-block",
    margin: "8px",
    marginTop: "4px",
    border: "0px",
    outlineColor: "lightgrey",
    fontSize: "large",
    padding: "8px",
    backgroundColor: "#FAFAFA",
    fontFamily: "'Roboto', sans-serif"
  }
};

function mapStateToProps(state) {
  return {
    isLoading: state.noteForm.isLoading,
    id: state.noteForm.id,
    createdDate: state.noteForm.createdDate,
    notes: state.noteList.notes,
    message: state.noteForm.message,
    isAddnewIdeaClicked: state.appbar.isAddnewIdeaClicked,
    index: state.noteForm.index
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getNewIdea: () => dispatch(getNewIdea()),
    updateIdea: data => dispatch(updateIdea(data)),
    getAllIdeas: () => dispatch(getAllIdeas()),
    resetIdea: () => dispatch(resetIdea()),
    setIdeaIndex: index => dispatch(setIdeaIndex(index))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);
