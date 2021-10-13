import Head from "next/head";
import { useRouter } from "next/router";
import NextLink from "next/link";
import classes from "./styles/container.module.css";

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
    description: `Etkinlikler ve mühendislik eğitimi üzerine.`,
    type: "website",
    ...customMeta,
  };

  return (
    <div>
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
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
      </Head>
      <div>
        <nav>
          <div>
            <MobileMenu />
            <NavItem href="/" text="Home" />
            <NavItem href="/community" text="Topluluk" />
            <NavItem href="/events" text="Etkinlikler" />
            <NavItem href="/gallery" text="Galeri" />
          </div>
        </nav>
      </div>
      <main>
        {children}
        <Footer />
      </main>
    </div>
  );
}
