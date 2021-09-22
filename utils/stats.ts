import dayjs from "dayjs";
import { wordFrequency } from "./word-frequency";
import { urlFrequency } from "./url-frequency";
import {
  postsCountByDayForCalendar,
  frequencyDataForBumpArea,
  frequencyForBar,
  frequencyForPie,
  PostsCountByDayForCalendar,
  FrequencyForBar,
  FrequencyForPie,
} from "./chartsData";
import { AreaBumpInputSerie } from "@nivo/bump";

const PERIOD_WEEK = 6;

export interface Stats {
  totalPosts: number;
  lastUpdate: string;
  firstUpdate: string;
  postsCountByDayForCalendar: PostsCountByDayForCalendar;
  wordFrequencyDataForBumpArea: AreaBumpInputSerie[][];
  wordFrequencyForPie: FrequencyForPie[];
  wordFrequencyForBar: FrequencyForBar[];
  urlFrequencyDataForBumpArea: AreaBumpInputSerie[][];
  urlFrequencyForPie: FrequencyForPie[];
  urlFrequencyForBar: FrequencyForBar[];
}

interface Post {
  date: string;
  url: string;
  title: string;
  domain: string;
  createdUtc: number;
}
interface Frequency {
  word: string;
  count: number;
}
type PostsByPeriod = Record<string, Post>;
type PostsFrequency = Record<string, Frequency[]>;

function postsByPeriod(posts, period, format): PostsByPeriod {
  return posts.reduce((acc, post) => {
    const date = dayjs(post.date);
    const week = date.startOf(period).format(format);
    if (!acc[week]) acc[week] = [];
    acc[week].push(post);
    return acc;
  }, {});
}

function postsFrequency(posts, callback): PostsFrequency {
  return Object.entries(posts).reduce((acc, [k, p]: [string, any[]]) => {
    const frequency = callback(p);
    acc[k] = frequency.slice(0, 10);
    return acc;
  }, {});
}

function nWeeksAgo(x: number) {
  return dayjs().subtract(x, "week").startOf("week").format("YYYY-MM-DD");
}

export default function getStats(): Stats {
  const allPosts = require("../data/france.json").filter(
    (e) => e.domain !== "starlightinternational786.world" // Seems like a spam
  );

  const stats: Stats = {
    totalPosts: allPosts.length,
    lastUpdate: dayjs(allPosts[0].date).format("YYYY-MM-DD"),
    firstUpdate: dayjs(allPosts[allPosts.length - 1].date).format("YYYY-MM-DD"),
    postsCountByDayForCalendar: postsCountByDayForCalendar(
      allPosts.filter((post) => post.date > "2021-01-01")
    ),
    wordFrequencyDataForBumpArea: [],
    wordFrequencyForPie: [],
    wordFrequencyForBar: [],
    urlFrequencyDataForBumpArea: [],
    urlFrequencyForPie: [],
    urlFrequencyForBar: [],
  };

  // Iterate from 2020-11-01 to now with PERIOD_WEEK steps
  for (let i = 0; ; i++) {
    const from = nWeeksAgo((i + 1) * PERIOD_WEEK);
    const to = nWeeksAgo(i * PERIOD_WEEK);
    if (from < "2020-11-01") break;

    console.log(from, to);

    const posts = allPosts.filter(
      (post) => post.date >= from && post.date < to
    );

    const postsByWeek = postsByPeriod(posts, "week", "YYYY-MM-DD");

    const wordFrequencyResult = wordFrequency(posts.map((post) => post.title));
    const urlFrequencyResult = urlFrequency(posts.map((post) => post.domain));

    const wordFrequencyByWeek = postsFrequency(postsByWeek, (p) =>
      wordFrequency(p.map((post) => post.title))
    );

    const urlFrequencyByWeek = postsFrequency(postsByWeek, (p) =>
      urlFrequency(p.map((post) => post.domain))
    );

    stats.wordFrequencyDataForBumpArea.push(
      frequencyDataForBumpArea(wordFrequencyResult, wordFrequencyByWeek)
    );
    stats.wordFrequencyForPie.push(frequencyForPie(wordFrequencyResult));
    stats.wordFrequencyForBar.push(
      frequencyForBar(wordFrequencyResult, wordFrequencyByWeek)
    );

    stats.urlFrequencyDataForBumpArea.push(
      frequencyDataForBumpArea(urlFrequencyResult, urlFrequencyByWeek)
    );
    stats.urlFrequencyForPie.push(frequencyForPie(urlFrequencyResult));
    stats.urlFrequencyForBar.push(
      frequencyForBar(urlFrequencyResult, urlFrequencyByWeek)
    );
  }

  return stats;
}
