import Head from "next/head";
import { useRouter } from "next/router";
import NextLink from "next/link";
import classes from "./styles/container.module.css";
import useWindowDimensions from "./useWindowDimensions";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu";

function NavItem({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <a className={isActive ? classes.activeLink : classes.link}>
        <span className="capsize">{text}</span>
      </a>
    </NextLink>
  );
}

export default function Container(props) {
  const { children, ...customMeta } = props;
  const meta = {
    title: "Bilgisayar Mühendisliği Topluluğu, Gazi Üniversitesi.",
    description:
      "Gazi Üniversitesi Bilgisayar Mühendisliği Topluluğu. Yapay zeka, oyun geliştirme, web geliştirme, gömülü sistemler.",
    type: "website",
    ...customMeta,
  };
  const { height, width } = useWindowDimensions();

  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  return (
    <div className={classes.container}>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:type" content={meta.type} />
        <meta
          property="og:site_name"
          content="Gazi Üniversitesi Bilgisayar Mühendisliği Topluluğu"
        />
        <meta property="og:description" content={meta.description} />
        {/* } <meta property="og:url" content="urlhere" /> {*/}
        <meta property="og:title" content={meta.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={classes.header}>
        {width < 800 ? (
          <nav className={classes.header__navmobile}>
            <MobileMenu />
          </nav>
        ) : (
          <nav className={classes.header__navdesktop}>
            <div className={classes.header__navdesktop__logo}>
              <Image src="/icons/logo.svg" layout="fill" objectFit="cover" />
            </div>
            <ul className={classes.header__navdesktop__nav}>
              <li>
                <NavItem href="#" text="Ana Sayfa" />
              </li>
              <li>
                <NavItem href="#gallery" text="Galeri" />
              </li>
              <li>
                <NavItem href="#events" text="Etkinlikler" />
              </li>
              <li>
                <NavItem href="#community" text="Topluluk" />
              </li>
              <li>
                <NavItem href="#ask" text="Bize Sor" />
              </li>
            </ul>

            <div className={classes.socialandtheme}>
              <ul className={classes.socialheader}>
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
              </ul>
              <div
                className={classes.changeTheme}
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
              >
                {resolvedTheme === "dark" ? (
                  <Image
                    layout="fill"
                    objectFit="contain"
                    src="/icons/sun.png"
                  />
                ) : (
                  <Image
                    layout="fill"
                    objectFit="contain"
                    src="/icons/moon.png"
                  />
                )}
              </div>
            </div>
          </nav>
        )}
      </header>
      <main className={classes.main}>{children}</main>
      <footer className={classes.footer}>
        <Footer />
      </footer>
    </div>
  );
}
