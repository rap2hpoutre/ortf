const fetch = require("node-fetch");
const fs = require("fs");
const dayjs = require("dayjs");

(async () => {
  const url =
    "https://api.pushshift.io/reddit/search/submission/?subreddit=france&sort=desc&size=100&sort_type=created_utc";
  let posts = [];
  for (let i = 0; i < 100; i++) {
    const res = await fetch(
      url + (i > 0 ? `&before=${posts[posts.length - 1].createdUtc}` : "")
    );
    const json = await res.json();
    posts = [
      ...posts,
      ...json.data.map((post) => ({
        date: dayjs.unix(post.created_utc).format("YYYY-MM-DD"),
        createdUtc: post.created_utc,
        title: post.title,
        url: post.url,
        domain: post.domain,
      })),
    ];
    console.log(i);
  }

  // Save post in a file
  fs.writeFileSync(
    "./data/france.json",
    JSON.stringify(posts, null, 2),
    "utf8"
  );
})();
