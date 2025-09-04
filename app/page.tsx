import { GenerateRapProvider } from "@/hooks/use-generate-rap";
import RapForm from "@/lib/components/rap-form";
import RapTypewriter from "@/lib/components/rap-typewriter";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 via-fuchsia-400/10 to-cyan-400/20 blur-3xl" />

      <main className="relative mx-auto max-w-5xl px-4 py-12 md:py-16">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            ChatGPT <span className="text-indigo-600">(w)Rapper</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 md:text-base">
            Pick a style and mood, add a topic, and let it flow.
          </p>
        </header>

        <GenerateRapProvider>
          {/* Card */}
          <section className="grid gap-6 rounded-2xl border border-zinc-200/60 bg-white/70 p-5 shadow-lg backdrop-blur md:grid-cols-2 md:p-6 dark:border-zinc-800/60 dark:bg-zinc-900/70">
            <RapForm />
            <div className="rounded-xl border border-zinc-200/50 p-4 md:p-5 dark:border-zinc-800/50">
              <RapTypewriter />
            </div>
          </section>

          {/* Footer note */}
          <p className="mt-6 text-center text-xs text-zinc-500">
            Tip: try old school and hype for an immaculate vibe
          </p>
        </GenerateRapProvider>
      </main>
    </div>
  );
}