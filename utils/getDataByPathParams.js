export function getDataByPathParams(data, locationType, locationName) {
    return data.filter(
      (i) => i[locationType].toLowerCase() == locationName.toLowerCase(),
    );
}