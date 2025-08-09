import { chromium } from "@playwright/test";

const FILENAME = "screenshot-playwright.png";
const TARGET_TESTID = "sponsor-preview";

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto("http://localhost:3000");

await page.waitForLoadState("networkidle");

const locator = page.getByTestId(TARGET_TESTID);

const box = await locator.boundingBox();

const buffer = await page.screenshot({
  path: FILENAME,
  fullPage: true,
  clip: extendBox(box ?? undefined),
});

await browser.close();

const url = new URL("https://slack.com/api/files.getUploadURLExternal");
url.searchParams.append("filename", FILENAME);
url.searchParams.append("length", `${buffer.length}`);

const getUrlRes = await fetch(url, {
  headers: {
    Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

if (!getUrlRes.ok) {
  throw new Error(`Failed to get upload URL: ${getUrlRes.statusText}`);
}

const { file_id: fileId, upload_url: uploadUrl } = await getUrlRes.json();

const formData = new FormData();
formData.append("filename", new Blob([buffer], { type: "image/png" }));

const uploadRes = await fetch(uploadUrl, {
  method: "POST",
  body: formData,
});

if (!uploadRes.ok) {
  throw new Error(`Failed to upload file: ${uploadRes.statusText}`);
}

const completeRes = await fetch(
  "https://slack.com/api/files.completeUploadExternal",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      files: [
        {
          id: fileId,
          title: FILENAME,
        },
      ],
      channels: "C099JJH1UM8",
    }),
  }
);

if (!completeRes.ok) {
  throw new Error(`Failed to complete file upload: ${completeRes.statusText}`);
}

function extendBox(input?: {
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  if (input == null) return undefined;
  const PADDING = 200;
  return {
    x: input.x - PADDING,
    y: input.y - PADDING,
    width: input.width + PADDING * 2,
    height: input.height + PADDING * 2,
  };
}
