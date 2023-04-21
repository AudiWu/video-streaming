import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { createWriteStream } from "fs";
import { Form } from "multiparty";
import { createReadStream, stat } from "fs";
import { promisify } from "util";
import PocketBase from "pocketbase";

dotenv.config();

const app = express();
const port = process.env.PORT;

const pb = new PocketBase("http://127.0.0.1:8090");

const authData = await pb.admins.authWithPassword(
  process.env.POCKET_BASE_EMAIL,
  process.env.POCKET_BASE_PASSWORD
);

app.get("/", (req: Request, res: Response) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
      <form enctype="multipart/form-data" method="POST" action="/upload">
        <input type="file" name="upload-file">
        <button>Upload File</button>
      </form>`);
});

app.post("/upload", (req: Request, res: Response) => {
  let form = new Form();

  form.on("part", (part) => {
    part
      .pipe(createWriteStream(`assets/uploads/${part.filename}`))
      .on("close", () => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<h1>File Uploaded: ${part.filename}</h1>`);
      });
  });

  form.parse(req);
});

app.get("/videos", async (req: Request, res: Response) => {
  const records = await pb.collection("videos").getFullList({
    sort: "-created",
  });

  res.status(200).json(records);
});

app.get("/video/:id", async (req: Request, res: Response) => {
  console.log(req.params.id);

  const record = await pb
    .collection("videos")
    .getOne(req.params.id, { expand: "relField1,relField2.subRelField" });

  const { id, video } = record;

  res.redirect(`http://127.0.0.1:8090/api/files/videos/${id}/${video}`);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
