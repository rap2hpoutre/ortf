import { ResponsiveAreaBump } from "@nivo/bump";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveCalendar } from "@nivo/calendar";
import getStats from "../utils/stats";
import stopWords from "../utils/stop-words";
import Wrapper from "../components/Wrapper";
import dayjs from "dayjs";
import "dayjs/locale/fr";

export default function Home({ stats }) {
  dayjs.locale("fr");
  const startDateInFrench = dayjs(stats.firstUpdate).format("DD MMMM YYYY");
  const endDateInFrench = dayjs(stats.endDate).format("DD MMMM YYYY");
  return (
    <Wrapper>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 w-full">
        <div className="bg-white rounded-xl shadow-one p-6 lg:col-span-2">
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-900 mb-2">
              Évolution des 5 sites les plus partagés
              <div className="text-sm font-normal text-gray-500">
                (sauf reddit, imgur et youtube)
              </div>
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
              Sites partagés depuis le {startDateInFrench}
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
              Sites partagés depuis le {startDateInFrench}
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
                colors={["#DBEAFE", "#93C5FD", "#3B82F6", "#1E3A8A"]}
                data={stats.postsCountByDayForCalendar}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-one p-6 lg:col-span-2">
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-900 mb-2">
              Évolution des 10 mots les plus partagés
              <div className="text-sm font-normal text-gray-500">
                Voir les mots exclus en bas de page
              </div>
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
              Mots partagés depuis le {startDateInFrench}
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
              Mots partagés depuis le {startDateInFrench}
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
              <li>
                Nombre total de posts étudiés : <b>{stats.totalPosts}</b>
              </li>
              <li>
                Date de début : <b>{startDateInFrench}</b>
              </li>
              <li>
                Date de fin : <b>{endDateInFrench}</b>
              </li>
              <li>
                Liste des mots exclus : <br />
                <span className="text-gray-500 text-sm">
                  {stopWords.join(", ")}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div></div>
      </div>
    </Wrapper>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      stats: await getStats(),
      stopWords: await stopWords,
    },
  };
}
