import Container from "../components/Container.js";
import classes from "../styles/Events.module.css";
import getConfig from "next/config";
import Event from "../components/Event.js";

export default function Events({ events }) {
  return (
    <Container>
      <div className={classes.events}>
        <section className={classes.events__upcoming}>
          <div className={classes.section__header}>
            <h2>Yaklaşan Etkinlikler</h2>
          </div>
          <ul className={classes.events__upcoming__list}>
            {events
              .filter((el) => el.happened === false)
              .map((event) => (
                <Event key={event._id} event={event} />
              ))}
          </ul>
        </section>
        <section className={classes.events__past}>
          <div className={classes.section__header}>
            <h2>Geçmiş Etkinlikler</h2>
          </div>
          <ul className={classes.events__past__list}>
            {events
              .filter((el) => el.happened === true)
              .map((event) => (
                <Event key={event._id} event={event} />
              ))}
          </ul>
        </section>
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
