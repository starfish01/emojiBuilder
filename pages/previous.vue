<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">Previous Emoji Text</h2>
    <ul>
      <li v-for="(et, key) in cookieArray" :key="key">
        <section>
          <b-button
            @click="copiedItem(et)"
          >{{et.text.join().replace(',', ' ')}} | text {{et.emojiText}} | background {{et.emojiBackground}}</b-button>
          <b-button @click="onDeleteEmojiText(et)" type="is-danger" icon-right="delete" />
        </section>
      </li>
    </ul>
  </section>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      cookieArray: []
    };
  },
  computed: {
    ...mapState({
      letterData: state => state.emojiData.letterData
    })
  },
  methods: {
    onDeleteEmojiText(et) {
      this.cookieArray = _.remove(this.cookieArray, item => {
        return item.id !== et.id;
      });

      this.$cookies.set("emoji-Builder", JSON.stringify(this.cookieArray));
    },
    onCopy: function(e) {
      alert("You just copied: " + e.text);
    },
    copyMatrix(emojiText) {
      let outputString = "";
      emojiText.forEach(element => {
        let toBeAdded = element.value
          .join("")
          .replace(/0/g, element.emojiBackground)
          .replace(/1/g, element.emojiText);

        outputString += toBeAdded + "\r\n";
      });

      return outputString;
    },
    copiedItem(et) {
      const matrix = this.generateMatrix(
        et.text,
        et.emojiText,
        et.emojiBackground
      );

      this.$copyText(this.copyMatrix(matrix)).then(
        () => {
          this.$buefy.toast.open("Copied to Clipboard!");
        },
        () => {
          this.$buefy.toast.open("Could not be copied!");
        }
      );
    },
    createArrayFiller(lineNumber) {
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
    },

    generateMatrix(textArray, emojiText, emojiBackground) {
      let array = [];

      textArray.forEach((line, lineNumber) => {
        array = _.concat(this.createArrayFiller(lineNumber), array);

        array.forEach(element => {
          element.emojiText = emojiText;
          element.emojiBackground = emojiBackground;
        });

        let lineArray = _.split(line, "");

        lineArray.forEach(letter => {
          letter = letter.toLowerCase();

          const foundLetter = _.find(this.letterData, letter);

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
  },
  created() {
    this.cookieArray = this.$cookies.get("emoji-Builder")
      ? this.$cookies.get("emoji-Builder")
      : [];
  }
};
</script>
<style lang="scss" scoped>
li {
  margin-bottom: 1rem;
}
</style>
            // v-clipboard:copy="et.matrix"
