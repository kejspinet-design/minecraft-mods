import { useEffect, useState } from "react";

export default function App() {
  const [mods, setMods] = useState([]);
  const [search, setSearch] = useState("");

  const SHEET_ID =
    "2PACX-1vQ-4KZFa7sFpb9DOeSDzANNHENmeZjVBDBMUNVsJn48VCK8tpC2GHIx8iVkIBh5K3wIC2EjutIuVJcw";

  useEffect(() => {
    async function fetchMods() {
      try {
        const url = `https://docs.google.com/spreadsheets/d/e/${SHEET_ID}/pub?output=csv`;

        const response = await fetch(url);
        const csvText = await response.text();

        const rows = csvText
          .split("\n")
          .slice(1)
          .filter((row) => row.trim() !== "");

        const data = rows.map((row) => {
          const cols = row.split(",");

          return {
            image: cols[0]?.replace(/"/g, "") || "",
            title: cols[1]?.replace(/"/g, "") || "Без названия",
            description: cols[2]?.replace(/"/g, "") || "",
            download: cols[3]?.replace(/"/g, "") || "#",
          };
        });

        setMods(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMods();
  }, []);

  const filteredMods = mods.filter((mod) =>
    mod.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#09090f] text-white overflow-hidden relative">
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/minecraft-4');

        .minecraft-font {
          font-family: 'Minecraft', sans-serif;
        }

        .glass {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08);
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-600 rounded-full blur-[140px] opacity-30"></div>
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-fuchsia-600 rounded-full blur-[140px] opacity-30"></div>
      </div>

      <header className="sticky top-0 z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-6">
          <h1 className="minecraft-font text-3xl text-purple-300">
            ModBuilds
          </h1>

          <input
            type="text"
            placeholder="Поиск модов..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[320px] max-w-full glass rounded-2xl px-5 py-3 outline-none text-white placeholder:text-zinc-400"
          />
        </div>
      </header>

      <section className="relative z-10 text-center pt-24 pb-14 px-6">
        <h2 className="minecraft-font text-5xl md:text-7xl text-purple-300">
          Minecraft Mods
        </h2>

        <p className="mt-8 text-zinc-300 text-lg max-w-2xl mx-auto">
          Лучшие моды Minecraft с удобным скачиванием и красивым интерфейсом.
        </p>
      </section>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMods.map((mod, index) => (
            <div
              key={index}
              className="glass rounded-[30px] overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-2xl shadow-purple-900/30"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={mod.image}
                  alt={mod.title}
                  className="w-full h-full object-cover hover:scale-110 transition duration-700"
                />
              </div>

              <div className="p-6">
                <h3 className="minecraft-font text-2xl text-purple-300 mb-4">
                  {mod.title}
                </h3>

                <p className="text-zinc-300 min-h-[90px]">
                  {mod.description}
                </p>

                <a
                  href={mod.download}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="minecraft-font mt-6 inline-flex items-center justify-center w-full rounded-2xl bg-gradient-to-r from-purple-500 to-fuchsia-500 py-4 text-lg"
                >
                  Скачать
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
