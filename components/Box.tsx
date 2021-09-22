import dayjs from "dayjs";
import { useState } from "react";

export default function Box({ title, subtitle = "", children, large = false }) {
  const [index, setIndex] = useState(0);
  let c = "bg-white rounded-xl shadow px-2 py-4 lg:p-6";
  if (large) c += " lg:col-span-2";
  return (
    <div className={c}>
      <div className="text-center">
        <div className="text-sm font-semibold text-gray-900 mb-2">
          {title}
          {subtitle && (
            <div className="text-xs font-normal text-gray-500">{subtitle}</div>
          )}
        </div>
        <div style={{ height: "350px" }}>{children({ index })}</div>
        <Navigation currentIndex={index} setCurrentIndex={setIndex} />
      </div>
    </div>
  );
}

function Navigation({ currentIndex, setCurrentIndex }) {
  const from = dayjs()
    .subtract((currentIndex + 1) * 6, "week")
    .startOf("week");
  const to = dayjs()
    .subtract(currentIndex * 6, "week")
    .startOf("week");
  return (
    <div className="grid grid-cols-3 mt-5 text-gray-500 text-xs">
      <div className="justify-self-start text-blue-400">
        {from.format("YYYY-MM") > "2021-01" && (
          <button onClick={() => setCurrentIndex(currentIndex + 1)}>
            ← <span className="hidden md:inline">Période précédente</span>
            <span className="inline md:hidden">Précédent</span>
          </button>
        )}
      </div>
      <div className="justify-self-center">
        {from.format("DD MMM")} au {to.format("DD MMM")}
      </div>
      <div className="justify-self-end text-blue-400">
        {currentIndex > 0 && (
          <button onClick={() => setCurrentIndex(currentIndex - 1)}>
            <span className="hidden md:inline">Période Suivante</span>
            <span className="inline md:hidden">Suivant</span> →
          </button>
        )}
      </div>
    </div>
  );
}
