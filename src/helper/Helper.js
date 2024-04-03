export const removeUnderScore = (value) => {
  return value ? value.replace(/_/g, " ") : "";
};

export const getTextColor = (title) => {
  switch (title) {
    case "personal":
      return "#ff4d49"; // Personal events color
    case "business":
      return "#666cff"; // Business events color
    case "family":
      return "#fdb528"; // Family events color
    case "holiday":
      return "#72e128"; // Holiday events color
    case "etc":
      return "#26c6f9"; // Etc events color
    default:
      return "#3174ad";
  }
};
export const getBgColor = (title) => {
  switch (title) {
    case "personal":
      return "#ffe4e4"; // Personal events color
    case "business":
      return "#e8e9ff"; // Business events color
    case "family":
      return "#fff4df"; // Family events color
    case "holiday":
      return "#eafbdf"; // Holiday events color
    case "etc":
      return "#def6fe"; // Etc events color
    default:
      return "#3174ad";
  }
};
