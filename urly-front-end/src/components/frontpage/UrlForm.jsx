import React, { useState, useEffect } from "react";
import getShortUrl from "../../data/ShortUrls";
import UrlList from "./UrlList";
import { CopyToClipboard } from "react-copy-to-clipboard";
import UrlValidator from "../../utils/UrlValidator";

export default function UrlForm() {
  const MAX_URLS_NUMBER = 3;
  const MAX_URL_LENGTH = 40;

  const [urls, setUrls] = useState(() => {
    const savedUrls = localStorage.getItem("url");
    const initialUrls = JSON.parse(savedUrls);
    return initialUrls || [];
  });
  const [Id, setId] = useState(() => {
    const savedUrls = localStorage.getItem("url");
    const initialUrls = JSON.parse(savedUrls);
    if (initialUrls != null && initialUrls.length > 0) {
      return initialUrls[0].Id + 1;
    }
    return 1;
  });
  const [buttonText, setButtonText] = useState("Shorten");
  const [buttonColor, setButtonColor] = useState(
    "bg-indigo-600 hover:bg-indigo-700 "
  );
  const [inputValue, setInputValue] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [showWarning, setShowWarning] = useState("");

  const updateButtonColor = (curColor) => {
    if (curColor === "bg-indigo-600 hover:bg-indigo-700 ") {
      return "bg-green-600 hover:bg-green-600 ";
    } else {
      return "bg-indigo-600 hover:bg-indigo-700 ";
    }
  };

  const updateButtonText = (curText) => {
    if (curText === "Shorten") {
      return "Copy";
    } else if (curText === "Copy") {
      return "Copied!";
    } else {
      return "Copy";
    }
  };

  const handleClick = (e) => {
    if (buttonText === "Shorten") {
      let longUrl = inputValue;
      let response = UrlValidator(longUrl);
      if (!response.state) {
        setIsValidUrl(response.state);
        setShowWarning(response.message);
        return;
      }

      if (longUrl.length > MAX_URL_LENGTH) {
        longUrl = longUrl.substring(0, MAX_URL_LENGTH) + "...";
      }
      let updatedUrls = [
        {
          Id: Id,
          long: longUrl,
          short: getShortUrl(Id),
        },
      ];
      if (urls !== undefined && urls.length >= MAX_URLS_NUMBER) {
        urls.pop();
      }
      updatedUrls.push(...urls);
      setUrls(updatedUrls);
      setId((prevId) => prevId + 1);
      localStorage.setItem("url", JSON.stringify(updatedUrls));
    }

    if (buttonText === "Copied!") {
      return;
    }

    if (buttonText === "Copy") {
      setButtonColor(updateButtonColor(buttonColor));
    }
    setButtonText(updateButtonText(buttonText));
  };

  const handleDelete = (Id) => {
    let updatedUrls = [];
    for (let i = 0; i < urls.length; i++) {
      if (urls[i].Id !== Id) {
        updatedUrls.push(urls[i]);
      }
    }
    setUrls([...updatedUrls]);
    localStorage.setItem("url", JSON.stringify(updatedUrls));
  };

  const handleUrlChange = (e) => {
    setInputValue(e.target.value);
    if (buttonText === "Copy") {
      setButtonText("Shorten");
    }
  };

  useEffect(() => {
    if (buttonText === "Copied!") {
      setTimeout(() => {
        setButtonText(updateButtonText(buttonText));
        setButtonColor(updateButtonColor(buttonColor));
      }, 1000);
    }
  });

  useEffect(() => {
    if (!isValidUrl) {
      setTimeout(() => {
        setIsValidUrl(true);
        setShowWarning("");
      }, 3000);
    }
  }, [isValidUrl]);

  return (
    <div className="sm:flex sm:flex-col sm:rounded-lg px-4 py-5 sm:p-6 w-2/3">
      <div className="sm:rounded-lg py-4 sm:flex sm:items-center sm:justify-between w-full">
        <div className="w-10/12">
          <label htmlFor="url" className="sr-only">
            Url
          </label>
          <input
            type="text"
            onChange={handleUrlChange}
            autoComplete="off"
            name="url"
            id="url"
            className="px-3 placeholder-gray-600 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-12 sm:text-lg border border-gray-100 rounded-md"
            placeholder="Shorten your link"
          />
        </div>
        <div className="w-2/12 mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
          <CopyToClipboard text={urls.length > 0 ? urls[0].short : ""}>
            <button
              type="button"
              onClick={handleClick}
              className={
                buttonColor +
                "inline-flex justify-center items-center mr-4 px-4 py-2 w-full border border-transparent shadow-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-lg"
              }
            >
              {buttonText}
            </button>
          </CopyToClipboard>
        </div>
      </div>
      {showWarning && (
        <div className="flex bg-red-100 sm:rounded-lg sm:p-3 justify-center mb-4">
          <span className="align-middle text-lg">{showWarning}</span>
        </div>
      )}
      {urls !== undefined && urls.length > 0 && (
        <UrlList urls={urls} handleDelete={handleDelete} />
      )}
    </div>
  );
}
