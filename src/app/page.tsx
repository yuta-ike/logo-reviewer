import { SPONSORS } from "@/sponsors";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans p-4">
      <main className="max-w-[800px] mx-auto flex flex-col">
        {SPONSORS.map((sponsor) => (
          <div key={sponsor.title} className="p-4">
            <div className="flex items-center space-x-4">
              <a
                href={sponsor.url}
                className="shrink-0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={sponsor.image}
                  alt={sponsor.title}
                  width={200}
                  height={150}
                  className="rounded-lg hover:opacity-90 hover:shadow-xl active:shadow-none transition"
                />
              </a>
              <div className="flex flex-col gap-2 grow">
                <h2 className="font-bold">{sponsor.title}</h2>
                <p className="text-sm">{sponsor.description}</p>
                <ul className="flex flex-wrap gap-x-4 gap-y-1">
                  {sponsor.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-sm font-bold transition"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
