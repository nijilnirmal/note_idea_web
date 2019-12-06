import React from "react";
import { keyframes, css } from "styled-components";

export default function Loader() {
  var styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "fixed",
      top: "0",
      left: "0",
      height: "100vh",
      width: "100vw"
    },
    loader: {
      border: "16px solid #eee",
      borderTop: "16px solid #3ae",
      borderRadius: "50%",
      width: "1cm",
      height: "1cm"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loader} />
    </div>
  );
}
