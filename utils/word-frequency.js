const stopWords = require("./stop-words");

export function wordFrequency(string) {
  return Object.entries(
    string
      .replace(/[.,;!?_]/g, " ")
      .toLowerCase()
      .split(/\s/)
      .map((word) => word.trim())
      .filter((word) => word.length > 0 && !stopWords.includes(word))
      .reduce(
        (map, word) =>
          Object.assign(map, {
            [word]: map[word] ? map[word] + 1 : 1,
          }),
        {}
      )
  )
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count);
}
