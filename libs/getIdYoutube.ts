import queryString from "query-string";

export const getIdYoutube = (data: string) => {
  const { url, query } = queryString.parseUrl(data);
  const { pathname } = new URL(url);
  let videoId;

  if (query.v) {
    videoId = query.v;
  } else {
    videoId = pathname.replace("/", "");
  }

  return videoId;
};
