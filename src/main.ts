import express = require("express");
import prisma from "./prisma";

const main = async () => {
  const users = await prisma.user.findMany();
  for (const user of users) {
    console.log(JSON.stringify(user));
  }

  const ok = prisma.note.create({
    data: {
      content: "test",
    },
  });

  const bad = prisma.user.create({
    data: {
      name: "test",
      note: {
        create: {
          content: (undefined as unknown) as string,
        },
      },
    },
  });

  try {
    await prisma.$transaction([ok, bad]);
  } catch (err) {
    console.error(err);
  }
};

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  await main();
  res.send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
