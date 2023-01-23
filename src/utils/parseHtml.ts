import parse from "html-react-parser";

export const parseHtml = (html: string) => (html ? parse(html) : "");
