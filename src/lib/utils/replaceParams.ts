import { ParsedUrlQuery } from 'querystring';
import { queryParamToString } from './queryParamToString';

export const replaceQueryParams = (
  pathname: string,
  query: ParsedUrlQuery,
  params: string[],
) => {
  let resultPath = pathname;
  params.forEach(
    (p) =>
      (resultPath = resultPath.replace(`[${p}]`, queryParamToString(query, p))),
  );
  return resultPath;
};
