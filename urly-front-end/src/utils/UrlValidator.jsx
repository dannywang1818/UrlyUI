import isUrl from "validator/lib/isURL";

export default function UrlValidator(longUrl) {
  if (longUrl.length <= 0) {
    return {
      state: false,
      message: "Please, provide a valid url",
    };
  }
  if (!isUrl(longUrl)) {
    return {
      state: false,
      message: "Unable to shorten that link. It is not a valid url.",
    };
  }
  return {
    state: true,
    message: "Validated long url",
  };
}
