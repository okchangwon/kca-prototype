export default class WordsParser {
  constructor(body) {
    this.body = this.stripHead(body);

    this.analyze();
  }

  analyze() {
    this.parsedNames = this.parseNames();
    this.parsedWords = this.parseWords();
    this.nameRanking = this.getNamesRanking(this.parsedNames);
    this.wordRanking = this.getWordsRanking(this.parsedWords);
  }

  data() {
    return {
      date: this.getDates(),
      count: this.parsedNames.length,
      names: this.nameRanking.map(v => v[0]),
      words: this.wordRanking.map(v => v[0]),
      nameRanking: this.nameRanking,
      wordRanking: this.wordRanking,
    }
  }

  stripHead(body) {
    return body.replace(/[a-z0-9,]+\n/i, "");
  }

  getDates() {
    const dates = this.body.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g);

    return [
      dates[0],
      dates[dates.length - 1],
    ]
  }

  parseNames() {
    return this.body
      .match(/,"[^"]+",/g)
      .map(line => line.replace(/(^,")|(",$)/g, ""));
  }

  getNamesRanking(names) {
    const counts = {};
    const len = names.length;

    for(let i=0;i<len;i++) {
      if(!counts[names[i]]) {
        counts[names[i]] = 1;
      } else {
        counts[names[i]]++;
      }
    }

    return this.getRankingArrayFromCounts(counts);
  }

  parseWords() {
    return this.body
      .match(/"[^"]+"\n/g)
      .join(" ")
      .replace(/\s+/g, " ")
      .replace(/"/g, "")
      .split(" ");
  }

  getWordsRanking(words) {
    const counts = {};
    const len = words.length;

    for(let i=0;i<len;i++) {
      if(!counts[words[i]]) {
        counts[words[i]] = 1;
      } else {
        counts[words[i]]++;
      }
    }

    return this.getRankingArrayFromCounts(counts);
  }

  getRankingArrayFromCounts(counts) {
    const arr = [];
    for(const key in counts) {
      arr.push([key, counts[key]]);
    }

    const sortedArr = arr.sort((a, b) => {
      if (a[1] > b[1]) {
        return -1;
      }
      else if (a[1] < b[1]) {
        return 1;
      }
      return 0;
    });

    return sortedArr;
  }
}
