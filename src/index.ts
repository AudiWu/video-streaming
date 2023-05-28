import express, { Request, Response } from "express";
import dotenv from "dotenv";
import PocketBase from "pocketbase";
import { stat, createReadStream, statSync } from "fs";
import { promisify } from "util";

const HTTP_STATUS_MESSAGE: Record<number, string> = {
  500: "Internal server Error",
};

dotenv.config();

const app = express();
const port = process.env.PORT;

const pb = new PocketBase("http://127.0.0.1:8090");

const authData = await pb.admins.authWithPassword(
  process.env.POCKET_BASE_EMAIL,
  process.env.POCKET_BASE_PASSWORD
);

app.get("/", (req: Request, res: Response) => {});

app.get("/videos", async (req: Request, res: Response) => {
  try {
    const records = await pb.collection("videos").getFullList({
      sort: "-created",
    });

    res.status(200).json(records);
  } catch (err) {
    console.log(err);
    res.status(500).send(HTTP_STATUS_MESSAGE[500]);
  }
});

app.get("/video/:id", async (req: Request, res: Response) => {
  try {
    const record = await pb
      .collection("videos")
      .getOne(req.params.id, { expand: "relField1,relField2.subRelField" });

    const { id, video } = record;
    const videoUrl = `http://127.0.0.1:8090/api/files/videos/${id}/${video}`;

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
    <video id="videoPlayer" controls>
    <source src="${videoUrl}" type="video/mp4">
  </video>`);
  } catch {
    res.status(500).send(HTTP_STATUS_MESSAGE[500]);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
