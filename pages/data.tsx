import Wrapper from "../components/Wrapper";
import { urlFrequencyRaw } from "../utils/url-frequency";
import { wordFrequency } from "../utils/word-frequency";
import Link from "next/link";

function Back() {
  return (
    <Link href="/">
      <a className="text-blue-500 hover:underline mb-7">
        Retour à la page des graphiques
      </a>
    </Link>
  );
}

export default function Data({ urls, words }) {
  return (
    <Wrapper>
      <Back />
      <h2 className="text-2xl">Liste des sites</h2>
      <p className="text-sm text-gray-600">
        Uniquement avec plus de 5 posts, contient probablement des spams modérés{" "}
        <br />à postériori par reddit ou les modérateurs.
      </p>
      <table className="table-auto border-2 bg-white m-5 text-left">
        <thead className="table-auto border-2">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">Domaine</th>
            <th className="p-3">Nombre de posts</th>
          </tr>
        </thead>
        <tbody>
          {urls.map(({ word, count }, key) => (
            <tr key={word} className="hover:bg-gray-200">
              <td className="p-3">{key + 1}</td>
              <td className="p-3">{word}</td>
              <td className="p-3">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-2xl">Liste des mots dans les titres</h2>
      <p className="text-sm text-gray-600">
        Uniquement les mots présents plus de 20 fois dans les titres.
        <br />
        Les mots de liaisons ignorés dans les graphiques sont affichés ici.
      </p>
      <table className="table-auto border-2 bg-white m-5 text-left">
        <thead className="table-auto border-2">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">Mot</th>
            <th className="p-3">Nombre de posts</th>
          </tr>
        </thead>
        <tbody>
          {words.map(({ word, count }, key) => (
            <tr key={word} className="hover:bg-gray-200">
              <td className="p-3">{key + 1}</td>
              <td className="p-3">{word}</td>
              <td className="p-3">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Back />
    </Wrapper>
  );
}

export async function getStaticProps() {
  const posts = require("../data/france.json");
  return {
    props: {
      urls: urlFrequencyRaw(posts.map((post) => post.domain)).filter(
        (e) => e.count > 5
      ),
      words: wordFrequency(
        posts.map((post) => post.title).join(" "),
        true
      ).filter((e) => e.count > 20),
    },
  };
}
