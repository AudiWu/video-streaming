import { Request, Response } from "express";
import { createReadStream, stat } from "fs";
import { promisify } from "util";

const videoPath = "assets/bigbuck.mp4";
const videoInfo = promisify(stat);

export const streamVideo = async (req: Request, res: Response) => {
  const { size } = await videoInfo(videoPath);
  const range = req.headers.range;

  if (range) {
    let [start, end] = range.replace(/bytes=/, "").split("-");
    const videoStartRange = parseInt(start, 10);
    const videoEndRange = end ? parseInt(end, 10) : size - 1;

    res.writeHead(206, {
      "Content-Range": `bytes ${videoStartRange}-${videoEndRange}/${size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": videoStartRange - videoEndRange + 1,
      "Content-Type": "video/mp4",
    });

    createReadStream(videoPath, {
      start: videoStartRange,
      end: videoEndRange,
    }).pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": size,
      "Content-Type": "video/mp4",
    });
    createReadStream(videoPath).pipe(res);
  }
};
