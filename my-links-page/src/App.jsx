import { Anchor, Button, Text } from "@mantine/core";
import { useEffect } from "react";
import { initializeEffects } from "./effects.js";
import avatarImage from "./images/bloderyn.jpg";
import artStationIcon from "./svg/artstation.svg";
import blueSkyIcon from "./svg/bluesky.svg";
import discordIcon from "./svg/discord.svg";
import githubIcon from "./svg/github.svg";
import instagramIcon from "./svg/instagram.svg";
import koFiIcon from "./svg/kofi.svg";
import vGenIcon from "./svg/vgen.svg";
import xIcon from "./svg/x.svg";
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
        description: "Artwork and works in progress",
        href: "https://www.instagram.com/bloderyn/",
        color: "#aa7b8a",
        icon: instagramIcon,
        className: "social-link--instagram",
      },
      {
        name: "X",
        description: "Short posts and updates",
        href: "https://x.com/Bloderyn",
        color: "#9a9aa8",
        icon: xIcon,
      },
      {
        name: "Discord",
        description: "Community and announcements",
        href: "https://discord.gg/EYCjykdHks",
        color: "#7a7fc0",
        icon: discordIcon,
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
        className: "social-link--wide",
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
      },
      {
        name: "Ko-fi",
        description: "Support my work",
        href: "https://ko-fi.com/bloderyn",
        color: "#aa7a7a",
        icon: koFiIcon,
      },
    ],
  },
];

function LinkCard({ link }) {
  return (
    <Anchor
      className={`social-link ${link.className ?? ""}`.trim()}
      href={link.href}
      rel="noopener noreferrer"
      style={{ "--link-color": link.color }}
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
      <span aria-hidden="true" className="link-arrow">
        ›
      </span>
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

export default function App() {
  useEffect(() => initializeEffects(), []);

  return (
    <div className="page">
      <canvas id="particles" />

      <main className="content">
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
                <img alt="Bloderyn" className="avatar-img" src={avatarImage} />
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
          </div>
        </header>

        <div className="links-container">
          {sections.map((section) => (
            <LinkSection key={section.title} section={section} />
          ))}
        </div>

        <footer className="footer">
          <div aria-hidden="true" className="footer-divider">
            <div className="footer-line-wide" />
            <div className="footer-line-center" />
          </div>
          <div className="footer-inner">
            <p className="footer-copy">
              &copy; 2026 Blod Coven &mdash; All rites reserved
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
