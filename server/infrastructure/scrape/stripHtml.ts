import cheerio from "cheerio";

export const stripHtml = (text: string): string => {
  return cheerio("<div/>").html(text).text();
};
