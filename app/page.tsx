import ReviewTicker from "@/components/ReviewTicker";
import Hero from "@/components/Hero";
import StatusBanner from "@/components/StatusBanner";
import FeatureCards from "@/components/FeatureCards";


export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <ReviewTicker />

        <Hero />

        <StatusBanner />

        <FeatureCards />
      </main>
    </>
  );
}