import Container from "../components/Container.js";
import classes from "../styles/Community.module.css";

export default function Community() {
  return (
    <Container>
      <div className={classes.community}>
        <section className={classes.community__text}>
          <div className={classes.section__header}>
            <h2>Topluluk Hakkında</h2>
          </div>
          <p>
            Gazi Bilgisayar Mühendisliği Topluluğu 0000 yılında kurulup... Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Integer quis
            maximus nunc. Nunc nec convallis magna. Nam fermentum purus ut
            convallis scelerisque. Suspendisse tincidunt ligula facilisis,
            faucibus erat non, congue arcu. Fusce et vulputate augue, quis
            imperdiet mauris.
          </p>
        </section>

        <section className={classes.community__admin}>
          <div className={classes.section__header}>
            <h2>Yönetim</h2>
          </div>
        </section>
      </div>
    </Container>
  );
}
