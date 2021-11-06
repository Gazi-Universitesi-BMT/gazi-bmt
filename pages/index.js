import Container from "../components/Container";
import classes from "../styles/Home.module.css";
import getConfig from "next/config";
import Event from "../components/Event.js";
import AdminCard from "../components/AdminCard.js";
import path from "path";
import fs from "fs";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home({ events, admins, fileNames }) {
  const [index, setIndex] = useState(0);
  const [mainImage, setMainImage] = useState(fileNames[0]);

  const handleChangeImage = (e) => {
    console.log(e);
    setMainImage(e.target.alt);
  };

  return (
    <Container>
      <div className={classes.home}>
        <section className={classes.hero}>
          <h1>Gazi Üniversitesi</h1>
          <p>Bilgisayar Mühendisliği Topluluğu</p>
        </section>

        <section id="gallery" className={classes.gallery}>
          <div className={classes.gallery__main}>
            <Image
              src={`/images/gallery/${mainImage}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={classes.gallery__others}>
            <ul className={classes.gallery__others__list}>
              {fileNames.map((image) => (
                <li key={image} onClick={handleChangeImage}>
                  <Image
                    src={`/images/gallery/${image}`}
                    layout="fill"
                    objectFit="contain"
                    alt={image}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {events.length > 0 && (
          <section id="events" className={classes.events}>
            <div className={classes.section__header}>
              <h2>Yaklaşan Etkinlikler</h2>
            </div>
            <ul className={classes.events__list}>
              {events
                .filter((el) => el.happened === false)
                .map((event) => (
                  <Event key={event._id} event={event} />
                ))}
            </ul>
          </section>
        )}

        <section className={classes.building}>
          <Image
            src="/images/strokd.svg"
            layout="fill"
            objectFit="contain"
            alt="building of gazi university"
          />
        </section>

        <section id="community" className={classes.community}>
          <div className={classes.section__header}>
            <h2>Topluluk Hakkında</h2>
          </div>

          <div className={classes.community__text}>
            <p>
              Gazi Bilgisayar Mühendisliği Topluluğu 0000 yılında kurulup...
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              quis maximus nunc. Nunc nec convallis magna. Nam fermentum purus
              ut convallis scelerisque. Suspendisse tincidunt ligula facilisis,
              faucibus erat non, congue arcu. Fusce et vulputate augue, quis
              imperdiet mauris.
            </p>
          </div>
        </section>
        <section className={classes.admins}>
          <div className={classes.section__header}>
            <h2>Yönetim</h2>
          </div>
          <ul className={classes.admins__list}>
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
  const res = await fetch(`${publicRuntimeConfig.GET_EVENTS}`);
  const events = await res.json();

  const adminsres = await fetch(`${publicRuntimeConfig.GET_ADMINS}`);
  const admins = await adminsres.json();

  const directory = path.join(process.cwd(), "public", "images", "gallery");
  const fileNames = fs.readdirSync(directory);

  return {
    props: {
      events,
      admins,
      fileNames,
    },
  };
};
