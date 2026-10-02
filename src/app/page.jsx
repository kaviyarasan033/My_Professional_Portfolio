import SmoothScroll from "../components/SmoothScroll";
import Preloader from "../components/Preloader";
import CustomCursor from "../components/CustomCursor";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import ProjectsSection from "../components/ProjectsSection";
import AchievementsSection from "../components/AchievementsSection";
import SkillsSection from "../components/SkillsSection";
import CtaSection from "../components/CtaSection";
import OpenSourceSection from "../components/OpenSourceSection";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export default function Home() {
  return (
    <SmoothScroll>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Preloader />
          <CustomCursor />
   
        <div id="page" className="hfeed site">
          <Header />
          <div className="page-area">
            <div
              id="post-18"
              className="post-18 page type-page status-publish hentry"
            >
              <div className="entry-content">
                <div
                  data-elementor-type="wp-page"
                  data-elementor-id="18"
                  className="elementor elementor-18"
                >
                  <div
                    className="elementor-element elementor-element-774aeaa e-con-full e-flex e-con e-parent"
                    data-id="774aeaa"
                    data-element_type="container"
                    data-e-type="container"
                  >
                    <HeroSection />
                    <AboutSection />
                    <ExperienceSection />
                    <ProjectsSection />
                    <AchievementsSection />
                    <SkillsSection />
                    <CtaSection />
                    <OpenSourceSection />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
        <ScrollToTop />
      </div>
    </div>
    </SmoothScroll>
  );
}
