import "./globals.css";

export const metadata = {
  title: "Kaviyarasan M | Full Stack Developer & Engineer Portfolio",
  description:
    "Kaviyarasan M - Versatile Full Stack Engineer with 1 year 10 months of professional experience building scalable web and mobile applications across Node.js, Angular, Next.js, Flutter, and PHP (Laravel).",
  icons: {
    icon: "/images/cropped-favicon-32x32-1-32x32.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Font Outfit for all normal text & Cinzel for brand header */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
        />

        {/* Local CSS Stylesheets */}
        <link rel="stylesheet" href="/css/reusablec-block.css" />
        <link rel="stylesheet" href="/css/frontend.css" />
        <link rel="stylesheet" href="/css/styles.css" />
        <link rel="stylesheet" href="/css/header-footer-elementor.css" />
        <link rel="stylesheet" href="/css/frontend.min.css" />
        <link rel="stylesheet" href="/css/post-7.css" />
        <link rel="stylesheet" href="/css/post-18.css" />
        <link rel="stylesheet" href="/css/base-desktop.css" />
        <link rel="stylesheet" href="/css/base-mobile.css" media="(max-width:767px)" />
        <link rel="stylesheet" href="/css/post-304.css" />
        <link rel="stylesheet" href="/css/post-271.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/all.min.css" />
        <link rel="stylesheet" href="/css/animate.css" />
        <link rel="stylesheet" href="/css/main.css" />
        <link rel="stylesheet" href="/css/kavi-blog.css" />
        <link rel="stylesheet" href="/css/elementor-icons.min.css" />
        <link rel="stylesheet" href="/css/widget-icon-list.min.css" />
        <link rel="stylesheet" href="/css/widget-social-icons.min.css" />
      </head>
      <body
        className="home wp-singular page-template-default page page-id-18 wp-theme-kavi wp-child-theme-kavi-child-theme ehf-header ehf-footer ehf-template-kavi ehf-stylesheet-kavi-child-theme kavi-toolkit-activate not-logged-in elementor-default elementor-kit-7 elementor-page elementor-page-18"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
