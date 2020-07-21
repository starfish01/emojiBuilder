
import _ from "lodash";
const LETTERDATA = '../data/letterData.json';


export default class emojiMatrix {

   letterData: any;

  constructor(){
    this.letterData = LETTERDATA;
  }

  _createArrayFiller(lineNumber: number) {
    lineNumber = lineNumber * 7;
    return [
      { value: [0], id: 0 + lineNumber },
      { value: [0], id: 1 + lineNumber },
      { value: [0], id: 2 + lineNumber },
      { value: [0], id: 3 + lineNumber },
      { value: [0], id: 4 + lineNumber },
      { value: [0], id: 5 + lineNumber },
      { value: [0], id: 6 + lineNumber }
    ];
  }

  generateMatrix(textArray, emojiText, emojiBackground) {
    let array = [];

    textArray.forEach((line, lineNumber) => {
      array = _.concat(this._createArrayFiller(lineNumber), array);

      array.forEach(element => {
        element.emojiText = emojiText;
        element.emojiBackground = emojiBackground;
      });

      let lineArray = _.split(line, "");

      lineArray.forEach(letter => {
        letter = letter.toLowerCase();

        const foundLetter: any = _.find(this.letterData, letter);

        if (foundLetter) {
          foundLetter[letter].forEach((element, i) => {
            array[i + 1].value = _.concat(array[i + 1].value, element);
          });

          const lengthOfLetter = foundLetter[letter][0].length;
          const fillerArray = Array(lengthOfLetter).fill(0);

          array[0].value = _.concat(array[0].value, fillerArray);
          array[6].value = _.concat(array[6].value, fillerArray);

          // adds space
          array.reverse();
          for (
            let index = lineNumber * 7;
            index < lineNumber * 7 + 7;
            index++
          ) {
            array[index].value = _.concat(array[index].value, 0);
          }
          array.reverse();
        }
      });
    });

    // Add top and bottom boarder
    const lengthOfSentence = array[0].length;
    const fillerArray = Array(lengthOfSentence).fill(0);
    return array;
  }



}
