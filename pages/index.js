import Container from "../components/Container";
import classes from "../styles/Home.module.css";
import getConfig from "next/config";
import Event from "../components/Event.js";

export default function Home({ events }) {
  return (
    <Container>
      <div className={classes.home}>
        <section className={classes.home__hero}>
          <h1>Gazi Üniversitesi Bilgisayar Mühendisliği Topluluğu</h1>
        </section>
        {events.filter((el) => el.happened === false).length && (
          <section className={classes.home__events}>
            <div className={classes.section__header}>
              <h2>Yaklaşan Etkinlikler</h2>
            </div>
            <ul className={classes.home__events__list}>
              {events
                .filter((el) => el.happened === false)
                .map((event) => (
                  <Event key={event._id} event={event} />
                ))}
            </ul>
          </section>
        )}
      </div>
    </Container>
  );
}

export const getStaticProps = async () => {
  const { publicRuntimeConfig } = getConfig();
  const res = await fetch(`${publicRuntimeConfig.GET_EVENTS}`);
  const events = await res.json();

  return {
    props: {
      events,
    },
  };
};
