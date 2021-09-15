// Sorry, Spaghetti. Please kill me now.
import dayjs from "dayjs";
import { wordFrequency } from "../utils/word-frequency";
import { urlFrequency } from "../utils/url-frequency";

export default function getStats() {
  const posts = require("../data/france.json").filter(
    // Seems like a spam
    (e) => e.domain !== "starlightinternational786.world"
  );

  // get posts count for each day
  const postsCountByDay = posts.reduce((acc, post) => {
    const key = post.date;
    if (acc[key]) {
      acc[key] += 1;
    } else {
      acc[key] = 1;
    }
    return acc;
  }, {});

  const postsCountByDayForCalendar = Object.entries(postsCountByDay)
    .slice(1, -1)
    .map((e) => ({
      day: e[0],
      value: e[1],
    }));

  const titles = posts.map((post) => post.title).join(" ");
  const wordFrequencyResult = wordFrequency(titles);

  // Create array of posts group by week
  const postsByWeek: {} = posts.reduce((acc, post) => {
    const date = dayjs(post.date);
    const week = date.startOf("week").format("YYYY-MM-DD");
    if (!acc[week]) {
      acc[week] = [];
    }
    acc[week].push(post);
    return acc;
  }, {});

  // Get frequency by week
  const wordFrequencyByWeek = Object.entries(postsByWeek).reduce(
    (acc, [week, p]: [string, any[]]) => {
      const titles = p.map((post) => post.title).join(" ");
      const frequency = wordFrequency(titles);
      acc[week] = frequency.slice(0, 10);
      return acc;
    },
    {}
  );

  const wordFrequencyDataForBumpArea = [];
  for (const f of wordFrequencyResult.slice(0, 10)) {
    wordFrequencyDataForBumpArea.push({
      id: f.word,
      data: Object.entries(wordFrequencyByWeek)
        .map(([week, words]: [string, any[]]) => {
          const word = words.find((word) => word.word === f.word);
          return {
            x: dayjs(week).format("DD/MM"),
            y: word ? word.count : 0,
          };
        })
        .reverse()
        .slice(1, -1),
    });
  }

  const urlFrequencyResult = urlFrequency(posts.map((post) => post.domain));
  // Get url frequency by week
  const urlFrequencyByWeek = Object.entries(postsByWeek).reduce(
    (acc, [week, p]: [string, any[]]) => {
      const urlFrequencyResult = urlFrequency(p.map((post) => post.domain));
      acc[week] = urlFrequencyResult.slice(0, 10);
      return acc;
    },
    {}
  );

  const urlFrequencyDataForBumpArea = [];
  for (const f of urlFrequencyResult.slice(0, 5)) {
    urlFrequencyDataForBumpArea.push({
      id: f.word,
      data: Object.entries(urlFrequencyByWeek)
        .map(([week, urls]: [string, any[]]) => {
          const url = urls.find((url) => url.word === f.word);
          return {
            x: dayjs(week).format("DD/MM"),
            y: url ? url.count : 0,
          };
        })
        .reverse()
        .slice(1, -1),
    });
  }

  const urlFrequencyForBar = [];
  // let keysForUrlFrequencyForBar = [];
  for (const [key, value] of Object.entries(urlFrequencyByWeek).slice(
    1,
    -1
  ) as Array<Array<string | any>>) {
    const res = {
      id: dayjs(key).format("DD/MM"),
    };
    for (const f of value as Array<{ word: string; count: string }>)
      res[f.word] = f.count;
    urlFrequencyForBar.push(res);
  }
  const keysForUrlFrequencyForBar = urlFrequencyResult
    .slice(0, 15)
    .map((e) => e.word);

  const wordFrequencyForBar = [];
  for (const [key, value] of Object.entries(wordFrequencyByWeek).slice(1, -1)) {
    const res = {
      id: dayjs(key).format("DD/MM"),
    };
    for (const f of value as any) res[f.word] = f.count;
    wordFrequencyForBar.push(res);
  }
  const keysForWordFrequencyForBar = wordFrequencyResult
    .slice(0, 20)
    .map((e) => e.word);

  posts.map((post) => post.domain);
  return {
    wordFrequency: wordFrequencyResult.slice(0, 30),
    wordFrequencyDataForBumpArea,
    wordFrequencyForPie: wordFrequencyResult.slice(0, 15).map((f) => ({
      id: f.word,
      label: f.word,
      value: f.count,
    })),
    wordFrequencyForBar: wordFrequencyForBar.reverse(),
    keysForWordFrequencyForBar,
    urlFrequency: urlFrequencyResult.slice(0, 30),
    urlFrequencyForPie: urlFrequencyResult.slice(0, 15).map((f) => ({
      id: f.word,
      label: f.word,
      value: f.count,
    })),
    postsCountByDayForCalendar,
    urlFrequencyForBar: urlFrequencyForBar.reverse(),
    urlFrequencyDataForBumpArea,
    keysForUrlFrequencyForBar,
    totalPosts: posts.length,
    lastUpdate: dayjs(posts[0].date).format("YYYY-MM-DD"),
    firstUpdate: dayjs(posts[posts.length - 1].date).format("YYYY-MM-DD"),
  };
}
