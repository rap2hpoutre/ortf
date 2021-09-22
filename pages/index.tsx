import { ResponsiveAreaBump } from "@nivo/bump";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveCalendar } from "@nivo/calendar";
import getStats, { Stats } from "../utils/stats";
import stopWords from "../utils/stop-words";
import Wrapper from "../components/Wrapper";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import Box from "../components/Box";

export default function Home({ stats }: { stats: Stats }) {
  dayjs.locale("fr");
  const startDateInFrench = dayjs(stats.firstUpdate).format("DD MMMM YYYY");
  const endDateInFrench = dayjs(stats.lastUpdate).format("DD MMMM YYYY");
  return (
    <Wrapper>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 w-full">
        <Box
          title="Évolution des 5 sites les plus postés"
          subtitle="Basé sur le nombre de posts (hors reddit, imgur et youtube), évolution par semaine"
          large={true}
        >
          {({ index }) => (
            <ResponsiveAreaBump
              colors={{ scheme: "set3" }}
              margin={{ top: 40, right: 80, bottom: 30, left: 20 }}
              data={stats.urlFrequencyDataForBumpArea[index]}
            />
          )}
        </Box>
        <Box title="Top sites postés">
          {({ index }) => (
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
              data={stats.urlFrequencyForPie[index]}
            />
          )}
        </Box>
        <Box title="Top sites postés">
          {({ index }) => (
            <ResponsiveBar
              colors={{ scheme: "set3" }}
              keys={stats.urlFrequencyForBar[index][0]}
              margin={{ top: 40, right: 30, bottom: 30, left: 30 }}
              data={stats.urlFrequencyForBar[index][1]}
            />
          )}
        </Box>
        <div className="bg-white rounded-xl shadow px-2 py-4 lg:p-6 lg:col-span-2">
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-900 mb-2">
              Nombre de posts par jour
              <div className="text-xs font-normal text-gray-500">
                L'API utilisée semble être tombée en panne certains jours, les
                données de début 2021 sont donc moins fiables
              </div>
            </div>

            <div
              className="m-auto"
              style={{ height: "200px", maxWidth: "950px" }}
            >
              <ResponsiveCalendar
                margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
                from={new Date("2021-01-01")}
                to={new Date()}
                emptyColor="#eeeeee"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                monthBorderColor="#ffffff"
                colors={["#DBEAFE", "#93C5FD", "#3B82F6", "#1E3A8A"]}
                data={stats.postsCountByDayForCalendar}
              />
            </div>
          </div>
        </div>
        <Box
          title="Évolution des 10 mots les plus présents dans les titres"
          subtitle="Nombre de fois que les noms apparaissent dans les titre des posts, voir les mots exclus en bas de page"
          large={true}
        >
          {({ index }) => (
            <ResponsiveAreaBump
              colors={{ scheme: "set3" }}
              margin={{ top: 40, right: 80, bottom: 30, left: 20 }}
              data={stats.wordFrequencyDataForBumpArea[index]}
            />
          )}
        </Box>
        <Box title="Fréquence des mots dans les titres">
          {({ index }) => (
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
              data={stats.wordFrequencyForPie[index]}
            />
          )}
        </Box>
        <Box title="Fréquence des mots dans les titres">
          {({ index }) => (
            <ResponsiveBar
              colors={{ scheme: "set3" }}
              keys={stats.wordFrequencyForBar[index][0]}
              margin={{ top: 40, right: 30, bottom: 30, left: 30 }}
              data={stats.wordFrequencyForBar[index][1]}
            />
          )}
        </Box>

        <div className="bg-white rounded-xl shadow px-2 py-4 lg:p-6  lg:col-span-2 text-sm">
          <div className="text-left">
            <ul className="list-disc pl-5 p-3 space-y-2">
              <li>
                Nombre total de posts étudiés : <b>{stats.totalPosts}</b>
              </li>
              <li>
                Date de début : <b>{startDateInFrench}</b> (affichés depuis le 1
                janvier 2021 uniquement)
              </li>
              <li>
                Date de fin : <b>{endDateInFrench}</b>
              </li>
              <li>
                ORTF signifie <b>Observatoire de ReddiT France</b>
              </li>
              <li>
                Liste des mots exclus : <br />
                <span className="text-gray-500 text-xs">
                  {stopWords.join(", ")}
                </span>
                <p className="text-xs">
                  👉 Certains mots (comme « france », « français ») ont été
                  exclus{" "}
                  <a
                    href="https://www.reddit.com/r/france/comments/poy5xz/site_de_statistiques_non_officiel_de_rfrance/"
                    target="_blank"
                    className="text-blue-500 hover:underline"
                    rel="noopener noreferrer"
                  >
                    sur conseils de redditeurs
                  </a>{" "}
                  car trop présents par rapport aux autres
                </p>
              </li>

              <li>
                <a
                  href="https://github.com/rap2hpoutre/ortf/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Signaler un problème ou proposer une amélioration
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div></div>
      </div>
    </Wrapper>
  );
}

export async function getStaticProps() {
  return {
    props: {
      stats: await getStats(),
      stopWords: await stopWords,
    },
  };
}
