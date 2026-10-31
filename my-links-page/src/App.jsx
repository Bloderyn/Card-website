import { Anchor, Button, FloatingIndicator, Tabs, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { initializeEffects } from "./effects.js";
import avatarImage from "./images/bloderyn.jpg";
import artStationIcon from "./svg/artstation.svg";
import blueSkyIcon from "./svg/bluesky.svg";
import deviantArtIcon from "./svg/deviantart.svg";
import discordIcon from "./svg/discord.svg";
import githubIcon from "./svg/github.svg";
import instagramIcon from "./svg/instagram.svg";
import koFiIcon from "./svg/kofi.svg";
import vGenIcon from "./svg/vgen.svg";
import youTubeIcon from "./svg/youtube.svg";

const sections = [
  {
    title: "Social Presence",
    className: "links-section--social",
    rune: "◆",
    links: [
      {
        name: "BlueSky",
        description: "Posts and updates",
        href: "https://bsky.app/profile/bloderyn.bsky.social",
        color: "#5b94d6",
        icon: blueSkyIcon,
      },
      {
        name: "Instagram",
        description: "Finished artwork and illustrations",
        href: "https://www.instagram.com/bloderyn/",
        color: "#aa7b8a",
        icon: instagramIcon,
        className: "social-link--instagram",
      },
      {
        name: "Discord",
        description: "Community and announcements",
        href: "https://discord.gg/EYCjykdHks",
        color: "#7a7fc0",
        icon: discordIcon,
        className: "social-link--wide",
      },
    ],
  },
  {
    title: "Visual Archives",
    className: "links-section--visual",
    rune: "◇",
    links: [
      {
        name: "YouTube",
        description: "Videos and creative projects",
        href: "https://www.youtube.com/@Bloderyn",
        color: "#aa6a7a",
        icon: youTubeIcon,
      },
      {
        name: "ArtStation",
        description: "Artwork portfolio",
        href: "https://bloderyn.artstation.com/",
        color: "#6a9fb5",
        icon: artStationIcon,
      },
      {
        name: "GitHub",
        description: "Code and personal projects",
        href: "https://github.com/Bloderyn",
        color: "#9a7aaa",
        icon: githubIcon,
      },
      {
        name: "DeviantArt",
        description: "Artwork and community",
        href: "https://www.deviantart.com/bloderyn",
        color: "#6aaa8a",
        icon: deviantArtIcon,
      },
    ],
  },
  {
    title: "Commissions",
    className: "links-section--commissions",
    rune: "◇",
    links: [
      {
        name: "VGen",
        description: "Details, pricing, and requests",
        href: "https://vgen.co/Bloderyn",
        color: "#7aaa9a",
        icon: vGenIcon,
        badge: "Opens mid-November",
      },
      {
        name: "Ko-fi",
        description: "Support my work",
        href: "https://ko-fi.com/bloderyn",
        color: "#aa7a7a",
        icon: koFiIcon,
        disabled: true,
        badge: "Coming soon",
      },
    ],
  },
];

function LinkCard({ link }) {
  return (
    <Anchor
      aria-disabled={link.disabled || undefined}
      className={`social-link ${link.className ?? ""} ${
        link.disabled ? "social-link--disabled" : ""
      }`
        .replace(/\s+/g, " ")
        .trim()}
      href={link.disabled ? undefined : link.href}
      rel="noopener noreferrer"
      style={{ "--link-color": link.color }}
      tabIndex={link.disabled ? -1 : undefined}
      target="_blank"
      underline="never"
    >
      <span className="link-icon">
        <img alt="" src={link.icon} />
      </span>
      <span className="link-text">
        <Text component="span" className="link-title">
          {link.name}
        </Text>
        <Text component="span" className="link-desc">
          {link.description}
        </Text>
      </span>
      {link.badge ? (
        <span className="link-badge">{link.badge}</span>
      ) : (
        <span aria-hidden="true" className="link-arrow">
          ›
        </span>
      )}
    </Anchor>
  );
}

function LinkSection({ section }) {
  return (
    <section className={`links-section ${section.className}`}>
      <div className="section-header">
        <div className="section-header-top">
          <span aria-hidden="true" className="section-rune">
            {section.rune}
          </span>
          <h2 className="section-title">{section.title}</h2>
          <div className="section-line" />
        </div>
      </div>
      <div className="links-grid">
        {section.links.map((link) => (
          <LinkCard key={link.name} link={link} />
        ))}
      </div>
    </section>
  );
}

function ArtPortfolio() {
  return (
    <section aria-labelledby="art-portfolio-title" className="art-portfolio">
      <div className="section-header">
        <div className="section-header-top">
          <span aria-hidden="true" className="section-rune">
            ✦
          </span>
          <h1 className="section-title" id="art-portfolio-title">
            Art Portfolio
          </h1>
          <div className="section-line" />
        </div>
        <p className="section-subtitle">Selected works and studies</p>
      </div>

      <div className="art-gallery-empty">
        <span aria-hidden="true" className="art-gallery-ornament">
          ✧
        </span>
        <h2>Artwork coming soon</h2>
        <Text component="p">
          A selection of illustrations and character designs will be added here.
        </Text>
        <Anchor
          className="art-gallery-link"
          href="https://bloderyn.artstation.com/"
          rel="noopener noreferrer"
          target="_blank"
          underline="never"
        >
          Explore my art on ArtStation <span aria-hidden="true">↗</span>
        </Anchor>
      </div>
    </section>
  );
}
export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [navRoot, setNavRoot] = useState(null);
  const navTabs = useRef({});
  const [indicatorMoving, setIndicatorMoving] = useState(false);

  const setNavTab = (value) => (node) => {
    navTabs.current[value] = node;
  };

  useEffect(() => initializeEffects(), []);

  return (
    <div className="page">
      <canvas id="particles" />

      <Tabs
        className="site-tabs"
        keepMounted={false}
        onChange={setActiveTab}
        value={activeTab}
      >
        <header className="site-header">
          <span className="site-brand">BLODERYN</span>
          <Tabs.List
            aria-label="Main navigation"
            className="site-nav"
            ref={setNavRoot}
          >
            <FloatingIndicator
              className="site-nav-indicator"
              mod={{ moving: indicatorMoving }}
              onTransitionEnd={() => setIndicatorMoving(false)}
              onTransitionStart={() => setIndicatorMoving(true)}
              parent={navRoot}
              target={navTabs.current[activeTab]}
              transitionDuration={550}
            />
            <Tabs.Tab
              className="site-nav-tab"
              ref={setNavTab("home")}
              value="home"
            >
              Home
            </Tabs.Tab>
            <Tabs.Tab
              className="site-nav-tab"
              ref={setNavTab("portfolio")}
              value="portfolio"
            >
              Portfolio
            </Tabs.Tab>
          </Tabs.List>
        </header>

        <main className="content">
          <Tabs.Panel className="site-tab-panel" value="home">
            <div className="home-content">
              <header className="hero">
                <div className="avatar-frame">
                  <svg
                    aria-hidden="true"
                    className="avatar-ring-svg"
                    viewBox="0 0 220 220"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle className="ring-track" cx="110" cy="110" r="102" />
                    <circle className="ring-moving" cx="110" cy="110" r="102" />
                    {[
                      [110, 8],
                      [198, 59],
                      [198, 161],
                      [110, 212],
                      [22, 161],
                      [22, 59],
                    ].map(([cx, cy]) => (
                      <circle
                        className="ring-dot"
                        cx={cx}
                        cy={cy}
                        key={`${cx}-${cy}`}
                        r="3"
                      />
                    ))}
                  </svg>
                  <div className="avatar-wrapper">
                    <div className="avatar-img-wrap">
                      <img
                        alt="Bloderyn"
                        className="avatar-img"
                        src={avatarImage}
                      />
                    </div>
                    <div aria-hidden="true" className="avatar-inner-glow" />
                  </div>
                </div>

                <div className="title-block">
                  <span aria-hidden="true" className="title-ornament">
                    ✦
                  </span>
                  <h1 className="title">BLODERYN</h1>
                  <div className="subtitle-row">
                    <span className="divider-line divider-left" />
                    <span className="subtitle">
                      Archivist of the Forbidden &amp; Digital
                    </span>
                    <span className="divider-line divider-right" />
                  </div>
                  <Text className="hero-intro" component="p">
                    Digital art, character design, and dark fantasy.
                  </Text>
                  <nav aria-label="Featured links" className="hero-actions">
                    <Button
                      className="hero-action hero-action--primary"
                      component="a"
                      href="https://bloderyn.artstation.com/"
                      rel="noopener noreferrer"
                      target="_blank"
                      variant="filled"
                    >
                      Explore my art <span aria-hidden="true">↗</span>
                    </Button>
                    <Button
                      className="hero-action hero-action--secondary"
                      component="a"
                      href="https://vgen.co/Bloderyn"
                      rel="noopener noreferrer"
                      target="_blank"
                      variant="default"
                    >
                      Commission info
                    </Button>
                  </nav>
                  <Text className="hero-note" component="p">
                    Commissions open around mid-November
                  </Text>
                </div>
              </header>

              <div className="links-container">
                {sections.map((section) => (
                  <LinkSection key={section.title} section={section} />
                ))}
              </div>
            </div>
          </Tabs.Panel>

          <Tabs.Panel className="site-tab-panel" value="portfolio">
            <ArtPortfolio />
          </Tabs.Panel>

          <footer className="footer">
            <div aria-hidden="true" className="footer-divider">
              <div className="footer-line-wide" />
              <div className="footer-line-center" />
            </div>
            <div className="footer-inner">
              <p className="footer-copy">
                &copy; 2026 Blod Coven &mdash; All rites reserved
              </p>
              <p className="footer-note">
                Work in progress &mdash; new sections coming soon
              </p>
            </div>
          </footer>
        </main>
      </Tabs>
    </div>
  );
}
