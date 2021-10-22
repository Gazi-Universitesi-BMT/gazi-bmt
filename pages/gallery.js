import Container from "../components/Container.js";
import classes from "../styles/Gallery.module.css";

export default function Gallery() {
  return (
    <Container>
      <div className={classes.gallery}>
        <section className={classes.gallery__photos}>
          <div className={classes.section__header}>
            <h2>Galeri</h2>
          </div>
        </section>
      </div>
    </Container>
  );
}
