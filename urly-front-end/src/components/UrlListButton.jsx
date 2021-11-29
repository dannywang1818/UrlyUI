import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function UrlListButton(props) {
  const [buttonText, setButtonText] = useState("Copy");
  const [buttonColor, setButtonColor] = useState(
    "text-indigo-700 bg-indigo-100 hover:bg-indigo-200 "
  );

  const updateButtonColor = (curColor) => {
    if (curColor == "text-indigo-700 bg-indigo-100 hover:bg-indigo-200 ") {
      return "text-white bg-green-600 hover:bg-green-600 ";
    } else {
      return "text-indigo-700 bg-indigo-100 hover:bg-indigo-200 ";
    }
  };

  const updateButtonText = (curText) => {
    if (curText == "Copy") {
      return "Copied!";
    } else {
      return "Copy";
    }
  };

  const handleClick = (e) => {
    setButtonText(updateButtonText(buttonText));
    setButtonColor(updateButtonColor(buttonColor));
  };

  useEffect(() => {
    if (buttonText == "Copied!") {
      setTimeout(() => {
        setButtonText(updateButtonText(buttonText));
        setButtonColor(updateButtonColor(buttonColor));
      }, 1000);
    }
  });

  return (
    <CopyToClipboard text={props.url}>
      <button
        type="button"
        onClick={handleClick}
        className={
          buttonColor +
          "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        }
      >
        {buttonText}
      </button>
    </CopyToClipboard>
  );
}
