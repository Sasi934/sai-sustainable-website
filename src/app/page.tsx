import Intro from "@/components/motion/Intro";
import Hero from "@/components/sections/Hero";
import Introduction from "@/components/sections/Introduction";
import Divisions from "@/components/sections/Divisions";
import Capabilities from "@/components/sections/Capabilities";
import Credentials from "@/components/sections/Credentials";
import ITPreview from "@/components/sections/ITPreview";
import FinalCTA from "@/components/sections/FinalCTA";

/**
 * Homepage rhythm follows §34 — contrast, not constant spectacle:
 *   dark cinematic → quiet ivory editorial → dark portals → ivory index
 *   → deep forest credentials → dark 3D technology → dark close.
 */
export default function Home() {
  return (
    <>
      {/* Title sequence — homepage only, once per session. */}
      <Intro />
      <Hero />
      <Introduction />
      <Divisions />
      <Capabilities />
      <Credentials />
      <ITPreview />
      <FinalCTA />
    </>
  );
}
