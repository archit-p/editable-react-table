import React from "react";
import {grey} from "./colors";

export default function Relationship({value, backgroundColor}) {
  return (
    <span
      style={{
        boxSizing: "border-box",
        backgroundColor: backgroundColor,
        color: grey(800),
        fontWeight: 400,
        padding: "2px 6px",
        borderRadius: 4,
        textTransform: "capitalize",
        display: "inline-block"
      }}>
      {value}
    </span>
  );
}
