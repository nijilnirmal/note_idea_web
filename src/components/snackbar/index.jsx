import React from "react";

export default class SnackBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.message && this.props.message !== prevProps.message) {
      this.setState(
        {
          isVisible: true
        },
        () => {
          setTimeout(() => {
            this.setState({
              isVisible: false
            });
          }, 5000);
        }
      );
    }
  }

  render() {
    return this.state.isVisible ? (
      <div style={styles.container}>{this.props.message}</div>
    ) : null;
  }
}

const styles = {
  container: {
    minWidth: "250px",
    marginLeft: "-125px",
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    borderRadius: "2px",
    padding: "16px",
    position: "fixed",
    zIndex: 1,
    left: "50%",
    bottom: "30px"
  }
};
