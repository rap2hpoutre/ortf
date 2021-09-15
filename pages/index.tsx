import Head from "next/head";
import dayjs from "dayjs";
import url from "url";
import { wordFrequency } from "../utils/word-frequency";
import { urlFrequency } from "../utils/url-frequency";
import { ResponsiveAreaBump } from "@nivo/bump";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveCalendar } from "@nivo/calendar";
const stopWords = require("../utils/stop-words");

export default function Home({ stats }) {
  console.log(stats);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-blue-50">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">ORTF</h1>
        <h2 className="text-xl pb-10">Observatoire de ReddiT France</h2>
        <div></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 w-full">
          <div className="bg-white rounded-xl shadow-one p-6 lg:col-span-2">
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-900 mb-2">
                Évolution des 5 sites les plus partagés (hors reddit et youtube)
              </div>
              <div style={{ height: "350px" }}>
                <ResponsiveAreaBump
                  colors={{ scheme: "set3" }}
                  margin={{ top: 40, right: 90, bottom: 30, left: 30 }}
                  data={stats.urlFrequencyDataForBumpArea}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-one p-6">
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-900 mb-2">
                Sites partagés depuis le {stats.firstUpdate}
              </div>
              <div style={{ height: "350px" }}>
                <ResponsivePie
                  colors={{ scheme: "set3" }}
                  margin={{ top: 40, right: 30, bottom: 30, left: 30 }}
                  innerRadius={0.5}
                  cornerRadius={1}
                  padAngle={1}
                  activeOuterRadiusOffset={8}
                  arcLabelsRadiusOffset={0.7}
                  arcLabelsSkipAngle={10}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsDiagonalLength={20}
                  arcLinkLabelsStraightLength={5}
                  data={stats.urlFrequencyForPie}
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-one p-6">
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-900 mb-2">
                Sites partagés depuis le {stats.firstUpdate}
              </div>
              <div style={{ height: "350px" }}>
                <ResponsiveBar
                  colors={{ scheme: "set3" }}
                  keys={stats.keysForUrlFrequencyForBar}
                  margin={{ top: 40, right: 30, bottom: 30, left: 30 }}
                  data={stats.urlFrequencyForBar}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-one p-6 lg:col-span-2">
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-900 mb-2">
                Nombre de posts par jour
              </div>
              <div
                className="m-auto"
                style={{ height: "200px", maxWidth: "950px" }}
              >
                <ResponsiveCalendar
                  margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
                  from={new Date(stats.firstUpdate)}
                  to={new Date()}
                  emptyColor="#eeeeee"
                  dayBorderWidth={2}
                  dayBorderColor="#ffffff"
                  monthBorderColor="#ffffff"
                  colors={["#93C5FD", "#60A5FA", "#3B82F6", "#1D4ED8"]}
                  data={stats.postsCountByDayForCalendar}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-one p-6 lg:col-span-2">
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-900 mb-2">
                Évolution des 10 mots les plus partagés
              </div>
              <div style={{ height: "350px" }}>
                <ResponsiveAreaBump
                  colors={{ scheme: "set3" }}
                  margin={{ top: 40, right: 90, bottom: 30, left: 30 }}
                  data={stats.wordFrequencyDataForBumpArea}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-one p-6">
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-900 mb-2">
                Mots partagés depuis le {stats.firstUpdate}
              </div>
              <div style={{ height: "350px" }}>
                <ResponsivePie
                  colors={{ scheme: "set3" }}
                  margin={{ top: 40, right: 30, bottom: 30, left: 30 }}
                  innerRadius={0.5}
                  cornerRadius={1}
                  padAngle={1}
                  activeOuterRadiusOffset={8}
                  arcLabelsRadiusOffset={0.7}
                  arcLabelsSkipAngle={10}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsDiagonalLength={20}
                  arcLinkLabelsStraightLength={5}
                  data={stats.wordFrequencyForPie}
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-one p-6">
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-900 mb-2">
                Mots partagés depuis le {stats.firstUpdate}
              </div>
              <div style={{ height: "350px" }}>
                <ResponsiveBar
                  colors={{ scheme: "set3" }}
                  keys={stats.keysForWordFrequencyForBar}
                  margin={{ top: 40, right: 30, bottom: 30, left: 30 }}
                  data={stats.wordFrequencyForBar}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-one p-6  lg:col-span-2">
            <div className="text-left">
              <ul className="list-disc pl-5 p-3">
                <li>Nombre total de posts étudiés : {stats.totalPosts}</li>
                <li>Date de début : {stats.firstUpdate}</li>
                <li>Date de fin : {stats.lastUpdate}</li>
                <li>
                  Liste des mots exclus :{" "}
                  <span className="text-gray-500">{stopWords.join(", ")}</span>
                </li>
              </ul>
            </div>
          </div>
          <div></div>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps(context) {
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
    (acc, [week, p]) => {
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
        .map(([week, words]) => {
          const word = words.find((word) => word.word === f.word);
          return {
            x: week,
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
    (acc, [week, p]) => {
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
        .map(([week, urls]) => {
          const url = urls.find((url) => url.word === f.word);
          return {
            x: week,
            y: url ? url.count : 0,
          };
        })
        .reverse()
        .slice(1, -1),
    });
  }

  const urlFrequencyForBar = [];
  // let keysForUrlFrequencyForBar = [];
  for (const [key, value] of Object.entries(urlFrequencyByWeek).slice(1, -1)) {
    const res = {
      id: key,
    };
    for (const f of value) res[f.word] = f.count;
    urlFrequencyForBar.push(res);
  }
  const keysForUrlFrequencyForBar = urlFrequencyResult
    .slice(0, 10)
    .map((e) => e.word);

  const wordFrequencyForBar = [];
  for (const [key, value] of Object.entries(wordFrequencyByWeek).slice(1, -1)) {
    const res = {
      id: key,
    };
    for (const f of value) res[f.word] = f.count;
    wordFrequencyForBar.push(res);
  }
  const keysForWordFrequencyForBar = wordFrequencyResult
    .slice(0, 20)
    .map((e) => e.word);

  posts.map((post) => post.domain);
  return {
    props: {
      stats: {
        wordFrequency: wordFrequencyResult.slice(0, 30),
        wordFrequencyDataForBumpArea,
        wordFrequencyForPie: wordFrequencyResult.slice(0, 15).map((f) => ({
          id: f.word,
          label: f.word,
          value: f.count,
        })),
        wordFrequencyForBar,
        keysForWordFrequencyForBar,
        urlFrequency: urlFrequencyResult.slice(0, 30),
        urlFrequencyForPie: urlFrequencyResult.slice(0, 15).map((f) => ({
          id: f.word,
          label: f.word,
          value: f.count,
        })),
        postsCountByDayForCalendar,
        urlFrequencyForBar,
        urlFrequencyDataForBumpArea,
        keysForUrlFrequencyForBar,
        totalPosts: posts.length,
        lastUpdate: dayjs(posts[0].date).format("YYYY-MM-DD"),
        firstUpdate: dayjs(posts[posts.length - 1].date).format("YYYY-MM-DD"),
      },
    },
  };
}
