const fetch = require("node-fetch");
const fs = require("fs");
const dayjs = require("dayjs");
const previousPosts = require("../data/france.json");

// Update only last posts
(async () => {
  const url =
    "https://api.pushshift.io/reddit/search/submission/?subreddit=france&sort=desc&size=100&sort_type=created_utc";
  let posts = [];
  const onlyLastPreviousPosts = previousPosts.slice(0, 300);
  for (let i = 0; i < 2; i++) {
    const res = await fetch(
      url + (i > 0 ? `&before=${posts[posts.length - 1].createdUtc}` : "")
    );
    const json = await res.json();
    posts = [
      ...posts,
      ...json.data
        .filter((e) => e.domain !== "starlightinternational786.world")
        .filter(
          (e) =>
            previousPosts.filter(
              (p) =>
                p.title === e.title &&
                p.createdUtc === e.created_utc &&
                p.url === e.url
            ).length === 0
        )
        .map((post) => ({
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
    JSON.stringify([...posts, ...previousPosts], null, 2),
    "utf8"
  );
})();
