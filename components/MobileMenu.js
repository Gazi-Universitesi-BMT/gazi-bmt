import Link from "next/link";
import useDelayedRender from "use-delayed-render";
import { useState, useEffect } from "react";
import classes from "./styles/container.module.css";

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
    isMenuOpen,
    {
      enterDelay: 20,
      exitDelay: 300,
    }
  );

  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = "";
    } else {
      setIsMenuOpen(true);
      document.body.style.overflow = "hidden";
    }
  }

  useEffect(() => {
    return function cleanup() {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <button aria-label="Toggle menu" type="button" onClick={toggleMenu}>
        <MenuIcon data-hide={isMenuOpen} />
        <CrossIcon data-hide={!isMenuOpen} />
      </button>
      {isMenuMounted && (
        <ul>
          <li style={{ transitionDelay: "150ms" }}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li style={{ transitionDelay: "175ms" }}>
            <Link href="/community">
              <a>Topluluk</a>
            </Link>
          </li>
          <li style={{ transitionDelay: "200ms" }}>
            <Link href="/events">
              <a>Etkinlikler</a>
            </Link>
          </li>
          <li style={{ transitionDelay: "250ms" }}>
            <Link href="/gallery">
              <a>Gallery</a>
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}
function CrossIcon() {
  return <div></div>;
}

function MenuIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M2.5 7.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
