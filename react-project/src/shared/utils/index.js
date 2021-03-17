export const deepCopy = (data) => {
  // deep copy
  if ([null, undefined].includes(data)) {
    return null;
  }
  return JSON.parse(JSON.stringify(data));
};

export const toUintColorCode = (colorStr) => {
  if (colorStr) {
    if (colorStr.indexOf("#") === 0) {
      colorStr = colorStr.replace(/^#/, "");
      if (colorStr.length === 3) {
        const d = colorStr.split("");
        colorStr = d[0] + d[0] + d[1] + d[1] + d[2] + d[2];
      }
      return parseInt(colorStr, 16);
    } else {
      const rgb = colorStr.match(
        /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i,
      ); // rgb/rgba
      if (rgb && rgb.length === 4) {
        return (
          (parseInt(rgb[0]) << 16) | (parseInt(rgb[1]) << 8) | parseInt(rgb[2])
        );
      }
    }
  }

  throw new Error("Not a valid html color code!");
};

export const authenticate = async () => {
  const data = await localStorage.getItem('userDetails')
  return Boolean(data)
}
