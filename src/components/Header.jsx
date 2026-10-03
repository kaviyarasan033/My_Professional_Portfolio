"use client";

import { useEffect } from "react";

export default function Header() {
    useEffect(() => {
        const openMobile = () => {
            document.querySelector(".mobile-menu-overlay")?.classList.add("active");
            document.querySelector(".mobile-menu-main")?.classList.add("active");
            document.body.classList.add("no-scroll");
        };

        const closeMobile = () => {
            document.querySelector(".mobile-menu-overlay")?.classList.remove("active");
            document.querySelector(".mobile-menu-main")?.classList.remove("active");
            document.body.classList.remove("no-scroll");
        };

        const openOffcanvas = () => {
            document.querySelector(".offcanvas-overlay")?.classList.add("active");
            document.querySelector(".offcanvas-menu")?.classList.add("active");
        };

        const closeOffcanvas = () => {
            document.querySelector(".offcanvas-overlay")?.classList.remove("active");
            document.querySelector(".offcanvas-menu")?.classList.remove("active");
        };

        document.querySelector(".mobile-topbar .bars")?.addEventListener("click", openMobile);
        document.querySelector(".close-mobile-menu")?.addEventListener("click", closeMobile);
        document.querySelector(".mobile-menu-overlay")?.addEventListener("click", closeMobile);

        document.querySelector(".offcanvas-btn")?.addEventListener("click", openOffcanvas);
        document.querySelector(".offcasvas-close")?.addEventListener("click", closeOffcanvas);
        document.querySelector(".offcanvas-overlay")?.addEventListener("click", closeOffcanvas);

        document.querySelectorAll(".mobile-menu-main a, .offcanvas-menu a").forEach((a) => {
            a.addEventListener("click", () => {
                closeMobile();
                closeOffcanvas();
            });
        });
    }, []);

    return (
        <>
            <header id="masthead" itemScope itemType="https://schema.org/WPHeader">
                <p className="main-title bhf-hidden" itemProp="headline"><a href="#home" title="Kaviyarasan M"
                    rel="home">Kaviyarasan M</a></p>
                <style dangerouslySetInnerHTML={{
                    __html: `
                        .elementor-304 .elementor-element.elementor-element-4167b7b {
                            --display: flex;
                            --margin-top: 0px;
                            --margin-bottom: 0px;
                            --margin-left: 0px;
                            --margin-right: 0px;
                            --padding-top: 0px;
                            --padding-bottom: 0px;
                            --padding-left: 0px;
                            --padding-right: 0px;
                        }

                        .elementor-304 .elementor-element.elementor-element-beff9d3 {
                            width: 100%;
                            max-width: 100%;
                        }

                        .elementor-304 .elementor-element.elementor-element-beff9d3 .navbar-brand img,
                        .elementor-304 .elementor-element.elementor-element-beff9d3 .logo img {
                            width: auto !important;
                            max-width: 240px !important;
                            height: 52px !important;
                            max-height: 54px !important;
                        }

                        .elementor-304 .elementor-element.elementor-element-beff9d3 .sidebar__toggle span,
                        .elementor-304 .elementor-element.elementor-element-beff9d3 .bars span,
                        .elementor-304 .elementor-element.elementor-element-beff9d3 .close-mobile-menu i,
                        .elementor-304 .elementor-element.elementor-element-beff9d3 .offcasvas-close i,
                        .elementor-304 .elementor-element.elementor-element-beff9d3 .social-icon a i,
                        .elementor-304 .elementor-element.elementor-element-beff9d3 .news-btn i {
                            color: #ffffff;
                            font-size: 16px;
                        }

                        .elementor-304 .elementor-element.elementor-element-beff9d3 .sidebar__toggle span,
                        .elementor-304 .elementor-element.elementor-element-beff9d3 .bars span {
                            background-color: #ffffff;
                            width: 25px;
                            height: 2px;
                        }

                        .elementor-304 .elementor-element.elementor-element-beff9d3 .sidebar__toggle:hover span,
                        .elementor-304 .elementor-element.elementor-element-beff9d3 .bars:hover span,
                        .elementor-304 .elementor-element.elementor-element-beff9d3 .close-mobile-menu:hover i,
                        .elementor-304 .elementor-element.elementor-element-beff9d3 .offcasvas-close:hover i,
                        .elementor-304 .elementor-element.elementor-element-beff9d3 .social-icon a:hover i,
                        .elementor-304 .elementor-element.elementor-element-beff9d3 .news-btn:hover i {
                            color: #ff6b6b;
                        }

                        .elementor-304 .elementor-element.elementor-element-beff9d3 .sidebar__toggle:hover span,
                        .elementor-304 .elementor-element.elementor-element-beff9d3 .bars:hover span {
                            background-color: #ff6b6b;
                        }

                        .elementor-304 .elementor-element.elementor-element-beff9d3 .sidebar__toggle span:not(:first-child),
                        .elementor-304 .elementor-element.elementor-element-beff9d3 .bars span:not(:first-child) {
                            margin-top: 5px;
                        }

                        .elementor-304 .elementor-element.elementor-element-beff9d3 .navbar-nav .nav-link {
                            color: #ffffff;
                        }

                        .elementor-304 .elementor-element.elementor-element-beff9d3 .navbar-nav .nav-link:hover {
                            color: #ff6b6b;
                        }

                        .elementor-304 .elementor-element.elementor-element-beff9d3 .navbar-nav .nav-item {
                            margin-right: 30px;
                        }

                        .elementor-304 .elementor-element.elementor-element-beff9d3 .sub-menu {
                            background-color: #171414;
                        }

                        .elementor-304 .elementor-element.elementor-element-beff9d3 .sub-menu a {
                            color: #ffffff;
                        }

                        .elementor-304 .elementor-element.elementor-element-beff9d3 .sub-menu a:hover {
                            color: #ff6b6b;
                        }

                        .elementor-304 .elementor-element.elementor-element-beff9d3 .lets-talk-btn {
                            color: #000000;
                            background-color: #FFFFFF;
                            border-radius: 30px;
                        }

                        .elementor-304 .elementor-element.elementor-element-beff9d3 .lets-talk-btn:hover {
                            color: #ffffff;
                            background-color: #171414;
                        }

                        .elementor-304 .elementor-element.elementor-element-beff9d3 .offcanvas-menu {
                            background-color: #171414;
                        }

                        .elementor-304 .elementor-element.elementor-element-beff9d3 .offcanvas-overlay {
                            background-color: rgba(0, 0, 0, 0.5);
                        }

                        .elementor-304 .elementor-element.elementor-element-beff9d3 .mobile-menu-main {
                            background-color: #171414;
                        }

                        .elementor-304 .elementor-element.elementor-element-beff9d3 .mobile-menu-overlay {
                            background-color: rgba(0, 0, 0, 0.5);
                        }

                        .elementor-304 .elementor-element.elementor-element-beff9d3 .mobile-menu-main .nav-link {
                            color: #ffffff;
                        }

                        .elementor-304 .elementor-element.elementor-element-beff9d3 .mobile-menu-main .nav-link:hover {
                            color: #ff6b6b;
                        }

                        .elementor-304 .elementor-element.elementor-element-beff9d3 .sticky-menu {
                            background-color: #191a18;
                            height: 80px;
                        }
                    ` }} />
                <div data-elementor-type="wp-post" data-elementor-id="304" className="elementor elementor-304">
                    <div className="elementor-element elementor-element-4167b7b e-con-full e-flex e-con e-parent"
                        data-id="4167b7b" data-element_type="container" data-e-type="container">
                        <div className="elementor-element elementor-element-beff9d3 elementor-widget__width-inherit elementor-widget elementor-widget-kavi_header_1"
                            data-id="beff9d3" data-element_type="widget" data-e-type="widget"
                            data-widget_type="kavi_header_1.default">
                            <div className="elementor-widget-container">

                                <style dangerouslySetInnerHTML={{
                                    __html: `
                                        .ah1-beff9d3#sticky-header.header-section.header-1.sticky-menu {
                                            background-color: #191a18 !important;
                                        }

                                        .ah1-beff9d3#sticky-header.header-section.header-1 .header-main .navbar .navbar-nav>.nav-item>a,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 .header-main .navbar .navbar-nav>.nav-item>.nav-link,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 .header-main .navbar ul[id^="menu-"]>.menu-item>a,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 .header-main .navbar ul[id^="menu-"]>.menu-item>.nav-link,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 .defult-header ul[id^="menu-"]>.menu-item>a {
                                            color: #ffffff !important;
                                        }

                                        .ah1-beff9d3#sticky-header.header-section.header-1 .header-main .navbar .navbar-nav>.nav-item>a i,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 .header-main .navbar .navbar-nav>.nav-item>.nav-link i {
                                            color: #ffffff !important;
                                        }

                                        .ah1-beff9d3#sticky-header.header-section.header-1 .header-main .navbar .navbar-nav>.nav-item:hover>a,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 .header-main .navbar .navbar-nav>.nav-item:hover>.nav-link,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 .header-main .navbar ul[id^="menu-"]>.menu-item:hover>a,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 .header-main .navbar ul[id^="menu-"]>.menu-item>a.active,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 .header-main .navbar ul[id^="menu-"]>.menu-item:hover>.nav-link,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 .defult-header ul[id^="menu-"]>.menu-item:hover>a,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 .defult-header ul[id^="menu-"]>.menu-item>a.active {
                                            color: #ff6b6b !important;
                                        }

                                        .ah1-beff9d3#sticky-header.header-section.header-1 .header-main .navbar .navbar-nav>.nav-item:hover>a i,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 .header-main .navbar .navbar-nav>.nav-item:hover>.nav-link i {
                                            color: #ff6b6b !important;
                                        }

                                        .ah1-beff9d3#sticky-header.header-section.header-1 .header-main .navbar .navbar-nav .nav-item>.sub-menu,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 ul[id^="menu-"] .menu-item .sub-menu,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 .defult-header ul[id^="menu-"] .menu-item .sub-menu {
                                            background-color: #171414 !important;
                                        }

                                        .ah1-beff9d3#sticky-header.header-section.header-1 .header-main .navbar .navbar-nav .nav-item>.sub-menu li a,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 .header-main .navbar .navbar-nav .nav-item>.sub-menu li a i,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 ul[id^="menu-"] .menu-item .sub-menu li a,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 ul[id^="menu-"] .menu-item .sub-menu li a i,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 .defult-header ul[id^="menu-"] .menu-item .sub-menu .menu-item>a,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 ul[id^="menu-"] .sub-menu .menu-item.menu-item-has-children>a::after,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 .header-main .navbar .navbar-nav .nav-item .has-homemenu .homemenu-items .homemenu .hometitle,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 .homemenu-content .hometitle {
                                            color: #ffffff !important;
                                        }

                                        .ah1-beff9d3#sticky-header.header-section.header-1 .header-main .navbar .navbar-nav .nav-item>.sub-menu li a:hover,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 .header-main .navbar .navbar-nav .nav-item>.sub-menu li:hover i,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 ul[id^="menu-"] .menu-item .sub-menu li a:hover,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 ul[id^="menu-"] .menu-item .sub-menu .menu-item>a.active,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 ul[id^="menu-"] .menu-item .sub-menu .menu-item:hover>a::before,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 .defult-header ul[id^="menu-"] .menu-item .sub-menu .menu-item>a:hover,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 .defult-header ul[id^="menu-"] .menu-item .sub-menu .menu-item>a.active,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 .header-main .navbar .navbar-nav .nav-item .has-homemenu .homemenu-items .homemenu .hometitle:hover,
                                        .ah1-beff9d3#sticky-header.header-section.header-1 .homemenu-content .hometitle:hover {
                                            color: #ff6b6b !important;
                                        }

                                        /* Sticky Logo Logic */
                                        .ah1-beff9d3 .sticky-logo {
                                            display: none;
                                        }

                                        .ah1-beff9d3#sticky-header.header-section.header-1.sticky-menu .main-logo {
                                            display: none !important;
                                        }

                                        .ah1-beff9d3#sticky-header.header-section.header-1.sticky-menu .sticky-logo {
                                            display: block !important;
                                        }

                                        /* Sticky Nav Colors */
                                        .ah1-beff9d3#sticky-header.header-section.header-1.sticky-menu .header-main .navbar .navbar-nav>.nav-item>a,
                                        .ah1-beff9d3#sticky-header.header-section.header-1.sticky-menu .header-main .navbar .navbar-nav>.nav-item>.nav-link,
                                        .ah1-beff9d3#sticky-header.header-section.header-1.sticky-menu .header-main .navbar ul[id^="menu-"]>.menu-item>a,
                                        .ah1-beff9d3#sticky-header.header-section.header-1.sticky-menu .header-main .navbar ul[id^="menu-"]>.menu-item>.nav-link,
                                        .ah1-beff9d3#sticky-header.header-section.header-1.sticky-menu .defult-header ul[id^="menu-"]>.menu-item>a {
                                            color: #ffffff !important;
                                        }

                                        .ah1-beff9d3#sticky-header.header-section.header-1.sticky-menu .header-main .navbar .navbar-nav>.nav-item>a i,
                                        .ah1-beff9d3#sticky-header.header-section.header-1.sticky-menu .header-main .navbar .navbar-nav>.nav-item>.nav-link i {
                                            color: #ffffff !important;
                                        }

                                        .ah1-beff9d3#sticky-header.header-section.header-1.sticky-menu .header-main .navbar .navbar-nav>.nav-item:hover>a,
                                        .ah1-beff9d3#sticky-header.header-section.header-1.sticky-menu .header-main .navbar .navbar-nav>.nav-item:hover>.nav-link,
                                        .ah1-beff9d3#sticky-header.header-section.header-1.sticky-menu .header-main .navbar ul[id^="menu-"]>.menu-item:hover>a,
                                        .ah1-beff9d3#sticky-header.header-section.header-1.sticky-menu .header-main .navbar ul[id^="menu-"]>.menu-item>a.active,
                                        .ah1-beff9d3#sticky-header.header-section.header-1.sticky-menu .header-main .navbar ul[id^="menu-"]>.menu-item:hover>.nav-link,
                                        .ah1-beff9d3#sticky-header.header-section.header-1.sticky-menu .defult-header ul[id^="menu-"]>.menu-item:hover>a,
                                        .ah1-beff9d3#sticky-header.header-section.header-1.sticky-menu .defult-header ul[id^="menu-"]>.menu-item>a.active {
                                            color: #ff6b6b !important;
                                        }

                                        .ah1-beff9d3#sticky-header.header-section.header-1.sticky-menu .header-main .navbar .navbar-nav>.nav-item:hover>a i,
                                        .ah1-beff9d3#sticky-header.header-section.header-1.sticky-menu .header-main .navbar .navbar-nav>.nav-item:hover>.nav-link i {
                                            color: #ff6b6b !important;
                                        }
                                    ` }} />
                                <header className="header-section header-1 ah1-beff9d3" id="sticky-header">
                                    <div className="container">
                                        <div className="header-main">

                                            {/* ===================== DESKTOP NAVBAR ===================== */}
                                            <nav className="navbar p-0 navbar-expand-xl d-none d-xl-flex">
                                                <a className="navbar-brand d-flex align-items-center" href="#home">
                                                    <img src="/images/logokavi.png" alt="KaviScript" className="main-logo" style={{ "maxHeight": "54px", "height": "52px", "width": "auto", "maxWidth": "240px", "objectFit": "contain" }} />
                                                    <img src="/images/logokavi.png" alt="KaviScript" className="sticky-logo" style={{ "maxHeight": "54px", "height": "52px", "width": "auto", "maxWidth": "240px", "objectFit": "contain" }} />
                                                </a>

                                                <button className="navbar-toggler" type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#navbarSupportedContent"
                                                    aria-controls="navbarSupportedContent" aria-expanded="false"
                                                    aria-label="Toggle navigation">
                                                    <span className="navbar-toggler-icon"></span>
                                                </button>

                                                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                                                    <ul className="navbar-nav mx-auto mb-lg-0">
                                                        <li className="nav-item"><a className="nav-link"
                                                            href="#home">Home</a></li>
                                                        <li className="nav-item"><a className="nav-link"
                                                            href="#about">About</a></li>
                                                        <li className="nav-item"><a className="nav-link"
                                                            href="#experience">Experience</a></li>
                                                        <li className="nav-item"><a className="nav-link"
                                                            href="#projects">Projects</a></li>
                                                        <li className="nav-item"><a className="nav-link"
                                                            href="#skills">Skills</a></li>
                                                        <li className="nav-item"><a className="nav-link"
                                                            href="#achievements">Achievements</a></li>
                                                        <li className="nav-item"><a className="nav-link"
                                                            href="#opensource">Open Source</a></li>
                                                        <li className="nav-item"><a className="nav-link" href="/resume.pdf"
                                                            target="_blank"><i className="fa-solid fa-file-pdf"
                                                                style={{ "marginRight": "5px", "color": "#ff6b6b" }}></i>Resume</a>
                                                        </li>
                                                        <li className="nav-item"><a className="nav-link"
                                                            href="#contact">Contact</a></li>
                                                    </ul>

                                                    <div className="menu-right-info">
                                                        <a href="mailto:mkaviyarasan003@gmail.com"
                                                            className="lets-talk-btn">
                                                            Hire Me </a>
                                                        <div className="sidebar__toggle offcanvas-btn">
                                                            <span></span>
                                                            <span></span>
                                                            <span></span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </nav>

                                        </div>
                                    </div>

                                    <div className="offcanvas-overlay position-fixed top-0 start-0 w-100 h-100"></div>
                                    <div className="offcanvas-menu position-fixed">
                                        <div
                                            className="header-top d-flex align-items-center justify-content-between gap-4">
                                            <div className="logo offcanvas_menu_logo"><a href="#home"><img src="/images/logokavi.png" alt="KaviScript" style={{ "maxHeight": "48px", "height": "46px", "width": "auto", "maxWidth": "200px", "objectFit": "contain" }} />
                                            </a>
                                            </div>
                                            <button
                                                className="offcasvas-close black-bg border-0 text-white d-flex align-items-center justify-content-center rounded-pill">
                                                <i className="fa-regular fa-xmark"></i>
                                            </button>
                                        </div>
                                        <span className="action-title">Full Stack Engineer</span>
                                        <a href="/resume.pdf" target="_blank" className="news-btn">
                                            <span className="text">
                                                <span className="text-default">View Resume <i
                                                    className="fa-regular fa-arrow-up-right"></i></span>
                                                <span className="text-hover">Download CV <i
                                                    className="fa-regular fa-arrow-up-right"></i></span>
                                            </span>
                                        </a>
                                        <div className="offcanvas_gallery d-none d-lg-block">
                                            <img className="gallery_img" src="/images/offcanvas1.jpg" alt="Gallery" />
                                            <img className="gallery_img" src="/images/offcanvas2.jpg" alt="Gallery" />
                                            <img className="gallery_img" src="/images/offcanvas3.jpg" alt="Gallery" />
                                            <img className="gallery_img" src="/images/offcanvas4.jpg" alt="Gallery" />
                                        </div>
                                        <div className="mobile-menu-area d-block d-xl-none">
                                            <ul id="menu-main-menu-1" className="list-unstyled">
                                                <li className="menu-item mb-2"><a href="#home" className="nav-link">Home</a>
                                                </li>
                                                <li className="menu-item mb-2"><a href="#about"
                                                    className="nav-link">About</a></li>
                                                <li className="menu-item mb-2"><a href="#experience"
                                                    className="nav-link">Experience</a></li>
                                                <li className="menu-item mb-2"><a href="#projects"
                                                    className="nav-link">Projects</a></li>
                                                <li className="menu-item mb-2"><a href="#skills"
                                                    className="nav-link">Skills</a></li>
                                                <li className="menu-item mb-2"><a href="#achievements"
                                                    className="nav-link">Achievements</a></li>
                                                <li className="menu-item mb-2"><a href="#opensource"
                                                    className="nav-link">Open Source</a></li>
                                                <li className="menu-item mb-2"><a href="/resume.pdf" target="_blank"
                                                    className="nav-link text-warning"><i
                                                        className="fa-solid fa-file-pdf"></i> Resume (PDF)</a></li>
                                                <li className="menu-item mb-2"><a href="#contact"
                                                    className="nav-link">Contact</a></li>
                                            </ul>
                                        </div>
                                        <div className="off-contact-info">
                                            <span className="info-title">Contact Info</span>
                                            <div className="contact-details">
                                                <span className="sub-info">Phone</span>
                                                <p>
                                                    <a href="tel:+918618924949">+91 86189 24949</a>
                                                </p>
                                            </div>
                                            <div className="contact-details">
                                                <span className="sub-info">Email</span>
                                                <p>
                                                    <a
                                                        href="mailto:mkaviyarasan003@gmail.com">mkaviyarasan003@gmail.com</a>
                                                </p>
                                            </div>
                                            <div className="contact-details">
                                                <span className="sub-info">Location</span>
                                                <p>
                                                    Chennai, Tamil Nadu, India
                                                </p>
                                            </div>
                                            <div className="contact-details">
                                                <span className="sub-info">Portfolio</span>
                                                <p>
                                                    <a href="https://developerkavi.in"
                                                        target="_blank">developerkavi.in</a>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="social-icon-list">
                                            <span className="follow-title">Connect:</span>
                                            <div className="social-icon d-flex align-items-center">
                                                <a href="https://linkedin.com" target="_blank"
                                                    aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                                                <a href="https://github.com" target="_blank" aria-label="GitHub"><i
                                                    className="fab fa-github"></i></a>
                                                <a href="mailto:mkaviyarasan003@gmail.com" aria-label="Email"><i
                                                    className="fas fa-envelope"></i></a>
                                                <a href="https://developerkavi.in" target="_blank"
                                                    aria-label="Website"><i className="fas fa-globe"></i></a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ===================== MOBILE MENU ===================== */}
                                    <div className="mobile-menu-area d-block d-xl-none">

                                        <div className="container">
                                            <div className="mobile-topbar">
                                                <div className="d-flex justify-content-between align-items-center">

                                                    <div className="logo">
                                                        <a href="#home">
                                                            <img src="/images/logokavi.png" alt="KaviScript" style={{ "maxHeight": "48px", "height": "46px", "width": "auto", "maxWidth": "200px", "objectFit": "contain" }} />
                                                        </a>
                                                    </div>

                                                    <div className="menu-search d-flex align-items-center gap-4">

                                                        <div className="bars">
                                                            <span></span>
                                                            <span></span>
                                                            <span></span>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>

                                        <div className="mobile-menu-overlay"></div>

                                        <div className="mobile-menu-main">

                                            <div className="logo">
                                                <a href="#home">
                                                    <img src="/images/logokavi.png" alt="KaviScript" style={{ "maxHeight": "48px", "height": "46px", "width": "auto", "maxWidth": "200px", "objectFit": "contain" }} />
                                                </a>
                                            </div>

                                            <div className="close-mobile-menu">
                                                <i className="fas fa-times"></i>
                                            </div>

                                            <div className="menu-body">
                                                <div className="menu-list">
                                                    <ul id="menu-main-menu-1" className="list-unstyled">
                                                        <li className="menu-item mb-2"><a title="Home"
                                                            href="#home">Home</a></li>
                                                        <li className="menu-item mb-2"><a title="About"
                                                            href="#about">About</a></li>
                                                        <li className="menu-item mb-2"><a title="Experience"
                                                            href="#experience">Experience</a></li>
                                                        <li className="menu-item mb-2"><a title="Projects"
                                                            href="#projects">Projects</a></li>
                                                        <li className="menu-item mb-2"><a title="Skills"
                                                            href="#skills">Skills</a></li>
                                                        <li className="menu-item mb-2"><a title="Achievements"
                                                            href="#achievements">Achievements</a></li>
                                                        <li className="menu-item mb-2"><a title="Open Source"
                                                            href="#opensource">Open Source</a></li>
                                                        <li className="menu-item mb-2"><a title="Resume"
                                                            href="/resume.pdf" target="_blank"
                                                            style={{ "color": "#ff6b6b" }}><i
                                                                className="fa-solid fa-file-pdf"></i> Resume
                                                            (PDF)</a></li>
                                                        <li className="menu-item mb-2"><a title="Contact"
                                                            href="#contact">Contact</a></li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="off-contact-area">
                                                <div className="off-contact-info">
                                                    <span className="info-title">Contact Info</span>
                                                    <div className="contact-details">
                                                        <span className="sub-info">Phone</span>
                                                        <p>
                                                            <a href="tel:+918618924949">+91 86189 24949</a>
                                                        </p>
                                                    </div>
                                                    <div className="contact-details">
                                                        <span className="sub-info">Email</span>
                                                        <p>
                                                            <a
                                                                href="mailto:mkaviyarasan003@gmail.com">mkaviyarasan003@gmail.com</a>
                                                        </p>
                                                    </div>
                                                    <div className="contact-details">
                                                        <span className="sub-info">Location</span>
                                                        <p>
                                                            Chennai, Tamil Nadu, India
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="social-icon-list">
                                                    <span className="follow-title">
                                                        Connect:
                                                    </span>
                                                    <div className="social-icon d-flex align-items-center gap-3">
                                                        <a href="https://linkedin.com" target="_blank"><i
                                                            className="fab fa-linkedin-in text-white"></i></a>
                                                        <a href="https://github.com" target="_blank"><i
                                                            className="fab fa-github text-white"></i></a>
                                                        <a href="mailto:mkaviyarasan003@gmail.com"><i
                                                            className="fas fa-envelope text-white"></i></a>
                                                        <a href="https://developerkavi.in" target="_blank"><i
                                                            className="fas fa-globe text-white"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* ===================== MOBILE MENU END ===================== */}
                                </header>

                            </div>
                        </div>
                    </div>
                </div>
            </header>



        </>
    );
}
