import HomeServices from "./home-services";
import TrustedStrip from "./trsusted-strip";
import Hero from "./Hero";
import Coverage from "./coverage";
import Featured from "./featured";
import Process from "./process";
import ReAssurance from "./re-assurance";
import FinalCta from "./final-cta";
import HomeFooter from "./home-footer";

function HomePage() {
  return (
    <div>
      <main>
        <Hero />
        <TrustedStrip />
        <div className="container">
          <HomeServices />
          <Coverage />
          <Featured />
          <Process />
          <ReAssurance />
          <FinalCta />
        </div>
        <HomeFooter />
      </main>
    </div>
  );
}

export default HomePage;
