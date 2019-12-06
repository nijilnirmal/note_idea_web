import React from "react";
import { connect } from "react-redux";
import { IoIosAddCircleOutline, IoIosCreate, IoMdFunnel } from "react-icons/io";
import { addNewIdea } from "./data/actions";

class Appbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleAddNewIdea = () => {
    this.props.addNewIdea();
  };

  render() {
    return (
      <>
        <div style={styles.container}>
          <div style={styles.appNameDiv}>
            <h2>Idea Board</h2>
          </div>
          <div style={styles.appNameDiv}>
            <IoIosAddCircleOutline
              style={styles.icons}
              onClick={this.handleAddNewIdea}
            />
            <IoMdFunnel style={styles.icons} />
          </div>
        </div>
        <div style={styles.separatorDiv}></div>
      </>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF59D"
  },
  appNameDiv: {
    width: "160px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    fontFamily: "'Roboto', sans-serif"
  },
  icons: {
    width: "24px",
    height: "24px",
    cursor: "pointer"
  },
  separatorDiv: {
    height: "1px",
    backgroundColor: "#ccc"
  }
};
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    addNewIdea: () => dispatch(addNewIdea())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Appbar);
