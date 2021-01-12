export const convertImages = (images: any) => {
  if (Array.isArray(images)) {
    return images;
  }

  if (
    images &&
    images["@type"] == "ImageObject" &&
    typeof images["url"] === "string"
  ) {
    return [images["url"]];
  }

  return [];
};
