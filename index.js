const express = require("express");
const Podlet = require("@podium/podlet");

const app = express();

const podlet = new Podlet({
  name: "myPodlet",
  version: "1.0.0",
  pathname: "/",
  manifest: "/manifest.json",
  content: "/",
  development: true,
});

app.use(podlet.middleware());

app.get(podlet.content(), (req, res) => {
  res.status(200).podiumSend(`
  <div>
    This is the podlet HTML
  </div>
  `);
});

app.get(podlet.manifest(), (req, res) => {
  res.status(200).send(podlet);
});

app.get(podlet.fallback(), (req, res) => {
  res
    .status(200)
    .podiumSend(
      `<div data-public-path-name=${publicPathname}>It did not work</div>`
    );
});

app.listen(7100);
