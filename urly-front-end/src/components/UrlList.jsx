import UrlListButton from "./UrlListButton";

export default function UrlList(props) {
  return (
    <ul role="list" className="bg-white sm:rounded-lg">
      {props.urls.map((urlLink) => (
        <li
          key={urlLink.Id}
          className="flex w-full item-center justify-between py-3 shadow-inner"
        >
          <div className="px-3 w-1/2">
            <span className="align-middle">{urlLink.long}</span>
          </div>
          <div className="flex justify-between w-1/3 px-4">
            <a href={urlLink.short}>
              <span className="align-middle">{urlLink.short}</span>
            </a>
            <UrlListButton url={urlLink.short} />
          </div>
        </li>
      ))}
    </ul>
  );
}
