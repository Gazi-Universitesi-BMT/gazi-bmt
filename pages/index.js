import Container from "../components/Container";
import classes from "../styles/Home.module.css";

export default function Home() {
  return (
    <Container>
      <div className={classes.home}>
        <section className={classes.home__hero}></section>
        <section className={classes.home__events}>
          <div className={classes.section__header}>
            <h2>Yaklaşan Etkinlikler</h2>
          </div>
          <ul className={classes.home__events__list}></ul>
        </section>
      </div>
    </Container>
  );
}
