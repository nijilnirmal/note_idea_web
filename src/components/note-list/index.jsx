import React from "react";
import { connect } from "react-redux";
import { getAllIdeas, deleteIdea } from "./data/actions";
import { setIdeaIndex, resetIdea } from "../note-form/data/actions";
import { IoIosRemoveCircle, IoMdCreate } from "react-icons/io";
import { set as setSession } from "../../services/storage";
import Loader from "../loader";
import SnackBar from "../snackbar";

class NoteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleteIconVisible: -1,
      notes: []
    };
  }

  componentDidMount() {
    this.props.getAllIdeas();
  }

  componentDidUpdate(prevProps) {
    if (this.props.message && prevProps.message !== this.props.message) {
      this.props.getAllIdeas();
      this.props.resetIdea();
    }
  }

  handleMouseOver = index => {
    this.setState({
      isDeleteIconVisible: index
    });
  };

  handleMouseOut = () => {
    this.setState({
      isDeleteIconVisible: -1
    });
  };

  handleDelete = i => {
    this.setState(
      prevState => {
        let notes = this.props.notes.slice();
        notes.splice(i, 1);
        return { notes: notes.reverse() };
      },
      () => {
        setSession(this.state.notes);
        const data = {
          id: this.props.notes[i].id
        };
        this.props.deleteIdea(data);
      }
    );
  };

  handleSelect = i => {
    this.props.setIdeaIndex(i);
  };

  render() {
    const { notes } = this.props;
    return (
      <div style={styles.container}>
        {notes && notes.length > 0 ? (
          notes.map((item, index) => {
            return (
              <div
                style={styles.noteDiv}
                key={index}
                onMouseEnter={e => {
                  e.preventDefault();
                  this.handleMouseOver(index);
                }}
                onMouseLeave={this.handleMouseOut}
                onClick={e => {
                  e.preventDefault();
                  this.handleSelect(index);
                }}
              >
                {this.state.isDeleteIconVisible === index ? (
                  <IoIosRemoveCircle
                    style={styles.icons}
                    onClick={e => {
                      e.preventDefault();
                      this.handleDelete(index);
                    }}
                  />
                ) : null}
                <div style={styles.noteContentDiv}>{item.title}</div>
                <div style={styles.noteContentDiv}>{item.body}</div>
              </div>
            );
          })
        ) : (
          <div style={styles.emptyText}>Press + to add new idea</div>
        )}
        {this.props.isLoading ? <Loader /> : null}
        <SnackBar message={this.props.message} />
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: "8px",
    padding: "8px"
  },
  emptyText: {
    fontSize: "x-large",
    marginTop: "20px",
    fontFamily: "'Roboto', sans-serif",
    color: "#616161"
  },
  noteDiv: {
    width: "150px",
    height: "150px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.2)",
    borderRadius: "8px",
    margin: "24px",
    backgroundColor: "#FFF9C4",
    cursor: "pointer"
  },
  noteContentDiv: {
    // margin: "8px",
    marginTop: "16px",
    marginLeft: "16px",
    marginRight: "16px",
    fontFamily: "'Roboto', sans-serif"
  },
  icons: {
    width: "24px",
    height: "24px",
    position: "absolute",
    cursor: "pointer"
  }
};
function mapStateToProps(state) {
  return {
    isLoading: state.noteList.isLoading,
    message: state.noteList.message,
    notes: state.noteList.notes,
    noteFormMessage: state.noteForm.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllIdeas: () => dispatch(getAllIdeas()),
    deleteIdea: data => dispatch(deleteIdea(data)),
    setIdeaIndex: index => dispatch(setIdeaIndex(index)),
    resetIdea: () => dispatch(resetIdea())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
