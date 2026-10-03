"use client";

export default function ProjectsSection() {
  return (
    <>
      <div
        className="elementor-element elementor-element-fce6213 elementor-widget elementor-widget-project_section_01"
        data-id="fce6213"
        data-element_type="widget"
        data-e-type="widget"
        data-widget_type="project_section_01.default"
      >
        <div className="elementor-widget-container">
          {/* Project Section Start */}
          <section id="projects" className="project-section fix section-padding hero-new">
            <div className="container">
              {/* Section Title Header matching requested layout */}
              <div className="section-title mb-0 d-flex flex-wrap align-items-start justify-content-between">
                <span
                  className="sub-title tz-sub-tilte tz-sub-anim tx-subTitle"
                  style={{
                    color: "#ff6b6b",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    fontSize: "15px",
                    textTransform: "uppercase",
                  }}
                >
                  (featured WORK)
                </span>

                <h2
                  className="split-title text-uppercase"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3.6rem)",
                    fontWeight: 800,
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    color: "#111013",
                    marginTop: 0,
                  }}
                >
                  REAL-TIME &amp;
                  <br />
                  PRODUCTION PROJECTS
                </h2>
              </div>

              {/* Equal Size Cards Grid: Row Right and Left */}
              <div className="row g-4 justify-content-between align-items-stretch">
                {/* Row 1 - Left Card: Project 1 */}
                <div className="col-lg-6 col-md-6 d-flex">
                  <div className="project-card-items project-card-equal w-100">
                    <div className="thumb tp-clip-anim p-relative">
                      <img
                        decoding="async"
                        src="/images/project-1.jpg"
                        alt="HRMS - ClassWall Product"
                        className="tp-anim-img"
                        data-animate="true"
                      />
                    </div>

                    <div className="content">
                      <h3 className="title">
                        <a href="#projects">HRMS - ClassWall Product</a>
                      </h3>
                      <p>Docker &bull; Jenkins CI/CD &bull; MySQL &bull; Enterprise HRMS Platform</p>
                    </div>
                  </div>
                </div>

                {/* Row 1 - Right Card: Project 2 */}
                <div className="col-lg-6 col-md-6 d-flex">
                  <div className="project-card-items project-card-equal w-100">
                    <div className="thumb tp-clip-anim p-relative">
                      <img
                        decoding="async"
                        src="/images/project-2.jpg"
                        alt="Native Cow Bell (APK &amp; API)"
                        className="tp-anim-img"
                        data-animate="true"
                      />
                    </div>

                    <div className="content">
                      <h3 className="title">
                        <a href="#projects">Native Cow Bell (APK &amp; API)</a>
                      </h3>
                      <p>Flutter APK &bull; Next.js Backend &bull; Prisma &bull; PostgreSQL</p>
                    </div>
                  </div>
                </div>

                {/* Row 2 - Left Card: Project 3 */}
                <div className="col-lg-6 col-md-6 d-flex">
                  <div className="project-card-items project-card-equal w-100">
                    <div className="thumb tp-clip-anim p-relative">
                      <img
                        decoding="async"
                        src="/images/project-3.jpg"
                        alt="UK Based Taxi Websites &amp; GoRide Dispatch"
                        className="tp-anim-img"
                        data-animate="true"
                      />
                    </div>

                    <div className="content">
                      <h3 className="title">
                        <a href="#projects">UK Based Taxi Websites &amp; GoRide Dispatch</a>
                      </h3>
                      <p>Laravel &bull; Core PHP &bull; PayPal, Razorpay &amp; CCAvenue &bull; Dispatch CRM</p>
                    </div>
                  </div>
                </div>

                {/* Row 2 - Right Card: Project 4 */}
                <div className="col-lg-6 col-md-6 d-flex">
                  <div className="project-card-items project-card-equal w-100">
                    <div className="thumb tp-clip-anim p-relative">
                      <img
                        decoding="async"
                        src="/images/project-4.jpg"
                        alt="EatNow App &amp; KalviERP Platform"
                        className="tp-anim-img"
                        data-animate="true"
                      />
                    </div>

                    <div className="content">
                      <h3 className="title">
                        <a href="#projects">EatNow App &amp; KalviERP Platform</a>
                      </h3>
                      <p>MERN Stack &bull; Firebase Real-Time &bull; Education ERP &bull; Student Lifecycle</p>
                    </div>
                  </div>
                </div>

           
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
