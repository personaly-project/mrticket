/** @format */

import Link from "next/link";
import React from "react";

function success() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          fontSize: "24px",
          flexDirection: "column",
        }}
      >
        <p
          style={{
            fontWeight: "bold",
            fontSize: "24px",
            flexDirection: "column",
            width: "500px",
          }}
        >
          Congratulations on your new purchase - this is all the confirmation
          you will get for now
        </p>
        <Link href="/">
          <button
            style={{
              backgroundColor: "black",
              fontWeight: "bold",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              textDecoration: "none",
              marginTop: "50px",
            }}
          >
            To Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default success;
