import Head from "next/head";
import dayjs from "dayjs";
import url from "url";
import { wordFrequency } from "../utils/word-frequency";
import { urlFrequency } from "../utils/url-frequency";
import { ResponsiveAreaBump } from "@nivo/bump";
import { ResponsivePie } from "@nivo/pie";

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
                Total de liens partagés.
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

  const titles = posts.map((post) => post.title).join(" ");
  const frequency = wordFrequency(titles);

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
  const frequencyByWeek = Object.entries(postsByWeek).reduce(
    (acc, [week, p]) => {
      const titles = p.map((post) => post.title).join(" ");
      const frequency = wordFrequency(titles);
      acc[week] = frequency.slice(0, 10);
      return acc;
    },
    {}
  );

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
        .reverse(),
    });
  }

  posts.map((post) => post.domain);
  return {
    props: {
      stats: {
        frequency: frequency.slice(0, 30),
        frequencyByWeek,
        urlFrequency: urlFrequencyResult.slice(0, 30),
        urlFrequencyForPie: urlFrequencyResult.slice(0, 10).map((f) => ({
          id: f.word,
          label: f.word,
          value: f.count,
        })),
        urlFrequencyByWeek,
        urlFrequencyDataForBumpArea,
        totalPosts: posts.length,
        lastUpdate: dayjs(posts[0].date).format("DD/MM/YYYY"),
      },
    },
  };
}
