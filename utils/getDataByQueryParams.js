export function getDataByQueryParams(data, queryObj) {
  const { continent, country, is_open_to_public } = queryObj;

  if (country) {
    data = data.filter(
      (i) => i.country.toLowerCase() == queryObj.country.replace(/-/g, " ").toLowerCase(),
    );
  }

  if (continent) {
    data = data.filter(
      (i) => i.continent.toLowerCase() == queryObj.continent.replace(/-/g, " ").toLowerCase(),
    );
  }

  if (is_open_to_public) {
    data = data.filter(
      (i) =>
        i.is_open_to_public ==
        JSON.parse(queryObj.is_open_to_public.toLowerCase()),
    );
  }

  return data;
}
