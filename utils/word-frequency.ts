import stopWords from "./stop-words";

export function wordFrequency(string, withStopWords = false) {
  return Object.entries(
    string
      .join(" ")
      .replace(/[.,;!?_]/g, " ")
      .toLowerCase()
      .replace(/covid-19/g, "covid")
      .split(/\s/)
      .map((word) => word.trim())
      .filter(
        (word) =>
          word.length > 0 && (withStopWords || !stopWords.includes(word))
      )
      .reduce(
        (map, word) =>
          Object.assign(map, {
            [word]: map[word] ? map[word] + 1 : 1,
          }),
        {}
      )
  )
    .map(([word, count]) => ({ word, count }))
    .sort((a: { count: any }, b: { count: any }) => b.count - a.count);
}
