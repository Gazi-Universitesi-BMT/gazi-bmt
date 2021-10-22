import Container from "../components/Container.js";
import classes from "../styles/Events.module.css";

export default function Events() {
  return (
    <Container>
      <div className={classes.events}>
        <section className={classes.events__upcoming}>
          <div className={classes.section__header}>
            <h2>Yaklaşan Etkinlikler</h2>
          </div>
          <ul className={classes.events__upcoming__list}></ul>
        </section>
        <section className={classes.events__past}>
          <div className={classes.section__header}>
            <h2>Geçmiş Etkinlikler</h2>
          </div>
          <ul className={classes.events__past__list}></ul>
        </section>
      </div>
    </Container>
  );
}
