import { AreaBumpInputSerie } from "@nivo/bump";
import dayjs from "dayjs";

export type PostsCountByDayForCalendar = Array<{ day: string; value: number }>;
export type FrequencyForBar = [string[], Record<string, string>[]];
export type FrequencyForPie = Array<{
  id: string;
  value: number;
  label: string;
}>;

export function postsCountByDayForCalendar(posts): PostsCountByDayForCalendar {
  const postsCountByDay: Record<string, number> = posts.reduce((acc, post) => {
    const key = post.date;
    if (acc[key]) acc[key] += 1;
    else acc[key] = 1;
    return acc;
  }, {});

  return Object.entries(postsCountByDay).map((e) => ({
    day: e[0],
    value: e[1],
  }));
}

export function frequencyDataForBumpArea(
  frequencyResult,
  frequencyByWeek
): AreaBumpInputSerie[] {
  const frequencyDataForBumpArea = [];
  for (const f of frequencyResult.slice(0, 10)) {
    frequencyDataForBumpArea.push({
      id: f.word,
      data: Object.entries(frequencyByWeek)
        .map(([week, words]: [string, any[]]) => {
          const word = words.find((word) => word.word === f.word);
          return {
            x: dayjs(week).add(1, "week").format("DD/MM"),
            y: word ? word.count : 0,
          };
        })
        .reverse(),
    });
  }
  return frequencyDataForBumpArea;
}

export function frequencyForBar(
  frequencyResult,
  frequencyByWeek
): FrequencyForBar {
  const frequencyForBar = [];
  for (const [key, value] of Object.entries(frequencyByWeek)) {
    const res = {
      id: dayjs(key).add(1, "week").format("DD/MM"),
    };
    for (const f of value as Array<{ word: string; count: string }>)
      res[f.word] = f.count;
    frequencyForBar.push(res);
  }
  const keysForFrequencyForBar = frequencyResult
    .slice(0, 15)
    .map((e) => e.word);

  return [keysForFrequencyForBar, frequencyForBar.reverse()];
}

export function frequencyForPie(frequencyResult): FrequencyForPie {
  return frequencyResult.slice(0, 15).map((f) => ({
    id: f.word,
    label: f.word,
    value: f.count,
  }));
}
