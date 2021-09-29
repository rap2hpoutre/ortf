import Head from "next/head";
import Link from "next/link";

export default function Wrapper({ children }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 text-gray-800">
      <Head>
        <title>ORTF</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-2 lg:px-20 text-center">
        <div className="py-10">
          <h1 className="text-5xl font-bold tracking-wider">ORTF</h1>
          <h2 className="text-xl">Statistiques de /r/france</h2>
        </div>
        {children}
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t bg-white">
        <div className="flex items-center justify-center">
          <div className="p-2 text-center">
            Fait avec 👣 par rap2h
            <br />
            <Link href="/data">
              <a className="text-blue-500 hover:underline">Données brutes</a>
            </Link>{" "}
            -{" "}
            <a
              href="https://github.com/rap2hpoutre/ortf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Code Source
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
