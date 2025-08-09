export const SPONSORS = [
  {
    title: "テスト株式会社",
    url: "https://example.com",
    image: "https://picsum.photos/400/300?random=1",
    description:
      "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。",
    links: [
      {
        label: "公式サイト",
        url: "https://example.com",
      },
      {
        label: "サービスサイト",
        url: "https://example.com",
      },
    ],
  },
  {
    title: "株式会社サンプル",
    url: "https://example.com",
    image: "https://picsum.photos/400/300?random=2",
    description:
      "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。",
    links: [
      {
        label: "公式サイト",
        url: "https://example.com",
      },
      {
        label: "サービスサイト",
        url: "https://example.com",
      },
    ],
  },
  {
    title: "デモ有限会社",
    url: "https://example.com",
    image: "https://picsum.photos/400/300?random=3",
    description:
      "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。",
    links: [
      {
        label: "公式サイト",
        url: "https://example.com",
      },
      {
        label: "サービスサイト",
        url: "https://example.com",
      },
    ],
  },
  {
    title: "フィクション株式会社",
    url: "https://example.com",
    image: "https://picsum.photos/400/300?random=4",
    description:
      "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。",
    links: [
      {
        label: "公式サイト",
        url: "https://example.com",
      },
      {
        label: "サービスサイト",
        url: "https://example.com",
      },
    ],
  },
];

if (process.env.IN_PREVIEW === "1") {
  SPONSORS.push(JSON.parse(process.env.PREVIEW_DATA ?? "{}"));
}
