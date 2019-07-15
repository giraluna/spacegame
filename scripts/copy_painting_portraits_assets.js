"use strict";

process.on("unhandledRejection", err => {
  throw err;
});

const cpr = require("cpr").cpr;
const mkdirp = require("mkdirp").mkdirp;

let count = 0

const options =
{
  filter: (fileName) =>
  {
    if (fileName.endsWith(".license"))
    {
      return false;
    }

    count += 1;

    return true;
  },
  overwrite: true,
};

mkdirp("dist/modules/paintingportraits/img", err =>
{
  cpr("modules/paintingportraits/img", "dist/modules/paintingportraits/img", options, (err) =>
  {
    if (err)
    {
      throw err;
    }

    console.log(`Copied ${count} painting portraits to dist/`);
  });
});
