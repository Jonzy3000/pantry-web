import { stripHtml } from "./stripHtml";

interface HowToStep {
  "@type": "HowToStep";
  text: string;
}

interface HowToSection {
  "@type": "HowToSection";
  name: string;
  itemListElement: Array<HowToStep>;
}

const isString = (step: any): step is string => {
  return typeof step == "string";
};

const isHowToStep = (step: any): step is HowToStep => {
  return (
    (step as HowToStep).text !== undefined &&
    (step as HowToStep)["@type"] == "HowToStep"
  );
};

const isHowToSection = (section: any): section is HowToSection => {
  return (
    (section as HowToSection).itemListElement !== undefined &&
    (section as HowToSection)["@type"] == "HowToSection"
  );
};

export const convertInstructions = (instructions: Array<any>): string[] => {
  return instructions
    .reduce((acc, it) => {
      if (isString(it)) {
        return [...acc, it];
      } else if (isHowToStep(it)) {
        return [...acc, it.text];
      } else if (isHowToSection(it)) {
        return acc.concat(it.itemListElement.map((subItem) => subItem.text));
      } else {
        throw `Cannot parse instruction item ${JSON.stringify(it)}`;
      }
    }, [])
    .map(stripHtml);
};
