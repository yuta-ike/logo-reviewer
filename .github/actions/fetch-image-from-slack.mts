import { writeFile } from "node:fs/promises";
import path from "node:path";

const url = new URL("https://slack.com/api/files.info");
url.searchParams.append("file", "F099F26V5H9");

const res = await fetch(url.toString(), {
  headers: {
    Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

if (!res.ok) {
  throw new Error(`Failed to fetch file info: ${res.statusText}`);
}

const {
  file: { url_private_download: urlPrivateDownload, url_private: urlPrivate },
} = await res.json().then((data) => (console.log(data), data));

const downloadRes = await fetch(urlPrivateDownload, {
  headers: {
    Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
  },
});
if (!downloadRes.ok) {
  throw new Error(`Failed to fetch image: ${downloadRes.statusText}`);
}

console.info(urlPrivate);

const arrayBuffer = await downloadRes
  .arrayBuffer()
  .then((data) => (console.log(data), data));
await writeFile(
  path.join(import.meta.dirname, "../../public/preview.png"),
  Buffer.from(arrayBuffer)
);
