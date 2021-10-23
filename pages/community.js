import Container from "../components/Container.js";
import classes from "../styles/Community.module.css";
import AdminCard from "../components/AdminCard.js";
import getConfig from "next/config";

export default function Community({ admins }) {
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
          <ul className={classes.community__admin__list}>
            {admins.map((admin) => (
              <AdminCard key={admin._id} admin={admin} />
            ))}
          </ul>
        </section>
      </div>
    </Container>
  );
}

export const getStaticProps = async () => {
  const { publicRuntimeConfig } = getConfig();
  const res = await fetch(`${publicRuntimeConfig.GET_ADMINS}`);
  const admins = await res.json();

  return {
    props: {
      admins,
    },
  };
};
