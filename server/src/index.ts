import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { createWriteStream } from "fs";
import { Form } from "multiparty";
import { streamVideo } from "./video";

dotenv.config();

const app = express();
const port = process.env.PORT;

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


app.get("/video", (req: Request, res: Response) => {
  streamVideo(req, res);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
