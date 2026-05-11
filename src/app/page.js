import "./landing/styles.css";
import { Hero } from "./landing/components/Hero";
import { Capabilities } from "./landing/components/Capabilities";
import { Features } from "./landing/components/Features";
import { SaasSections } from "./landing/components/SaasSections";

export default function HomePage() {
  return (
    <main className="bg-black">
      <Hero />
      <Capabilities />
      <Features />
      <SaasSections />
    </main>
  );
}
