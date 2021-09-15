export function urlFrequency(urls) {
  return [
    ...urls
      .map((url) =>
        url
          .replace("youtu.be", "youtube.com")
          .replace("i.imgur.com", "imgur.com")
      )
      .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
      .entries(),
  ]
    .map(([word, count]) => ({ word, count }))
    .filter(
      ({ word }) =>
        ![
          "self.france",
          "i.redd.it",
          "v.redd.it",
          "youtube.com",
          "reddit.com",
          "imgur.com",
        ].includes(word)
    )
    .sort((a, b) => b.count - a.count);
}

export function urlFrequencyRaw(urls) {
  return [
    ...urls
      .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
      .entries(),
  ]
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count);
}
