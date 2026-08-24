import HomeServices from "./home-services";
import TrustedStrip from "./trsusted-strip";
import Hero from "./Hero";
import Coverage from "./coverage";
import Featured from "./featured";
import Process from "./process";
import ReAssurance from "./re-assurance";
import FinalCta from "./final-cta";
import ServiceAreas from "./service-areas";

function HomePage() {
  return (
    <div>
      <main>
        <Hero />
        <TrustedStrip />
        <HomeServices />
        <Featured />
        <Coverage />
        <Process />
        <ServiceAreas />
        <ReAssurance />
        <FinalCta />
      </main>
    </div>
  );
}

export default HomePage;
