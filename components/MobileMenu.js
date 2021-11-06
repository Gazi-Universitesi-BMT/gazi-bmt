import Link from "next/link";
import useDelayedRender from "use-delayed-render";
import { useState, useEffect } from "react";
import classes from "./styles/container.module.css";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
    isMenuOpen,
    {
      enterDelay: 20,
      exitDelay: 20,
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
      <button
        className={classes.mobile__toggle}
        aria-label="Toggle menu"
        type="button"
        onClick={toggleMenu}
      >
        <MenuIcon data-hide={isMenuOpen} />
      </button>
      {isMenuMounted && (
        <div className={classes.navmobile__wrapper}>
          <div className={classes.navmobile__wrapper__background}></div>
          <ul className={classes.navmobile__wrapper__foreground}>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/community">
                <a>Topluluk</a>
              </Link>
            </li>
            <li>
              <Link href="/events">
                <a>Etkinlikler</a>
              </Link>
            </li>
            <li>
              <Link href="/gallery">
                <a>Galeri</a>
              </Link>
            </li>
            <li>
              <a>
                <Image
                  src="/icons/insta.svg"
                  alt="Instagram logo"
                  width="25px"
                  height="25px"
                />
              </a>
            </li>
            <li>
              <a>
                <Image
                  src="/icons/twitter.svg"
                  alt="Twitter logo"
                  width="25px"
                  height="25px"
                />
              </a>
            </li>

            <li>
              <a>
                <Image
                  src="/icons/discord.svg"
                  alt="Discord logo"
                  width="25px"
                  height="25px"
                />
              </a>
            </li>
            <li
              className={classes.changeTheme}
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              {resolvedTheme === "dark" ? (
                <Image layout="fill" objectFit="contain" src="/icons/sun.png" />
              ) : (
                <Image
                  layout="fill"
                  objectFit="contain"
                  src="/icons/moon.png"
                />
              )}
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

function MenuIcon() {
  return (
    <div className={classes.mobilenavicon}>
      <div className={classes.mobilenavicon__line}></div>
      <div className={classes.mobilenavicon__line}></div>
      <div className={classes.mobilenavicon__line}></div>
    </div>
  );
}
