import UrlListButton from "./UrlListButton";

export default function UrlList(props) {
  return (
    <ul className="bg-white sm:rounded-lg">
      {props.urls.map((urlLink) => (
        <li
          key={urlLink.Id}
          className="flex w-full item-center justify-between py-3 shadow-inner"
        >
          <div className="flex items-center px-3 w-1/2">
            <span>{urlLink.long}</span>
          </div>
          <div className="flex items-center justify-between w-2/5 px-4">
            <a href={urlLink.short}>
              <span>{urlLink.short}</span>
            </a>
            <button
              type="button"
              onClick={() => {
                props.handleDelete(urlLink.Id);
              }}
              className="inline-flex items-center mx-3 px-4 py-2 border border-transparent text-sm font-medium bg-red-300 hover:bg-red-400 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Delete
            </button>
            <UrlListButton url={urlLink.short} />
          </div>
        </li>
      ))}
    </ul>
  );
}
