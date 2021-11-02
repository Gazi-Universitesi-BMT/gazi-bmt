import Container from "../components/Container.js";
import classes from "../styles/Gallery.module.css";
import { useState, useEffect } from "react";
import path from "path";
import fs from "fs";
import Image from "next/image";

export default function Gallery({ fileNames }) {
  const [index, setIndex] = useState(0);
  const [mainImage, setMainImage] = useState(fileNames[0]);

  const handleChangeImage = (e) => {
    setMainImage(e.target.alt);
  };
  return (
    <Container>
      <div className={classes.gallery}>
        <section className={classes.gallery__photos}>
          <div className={classes.section__header}>
            <h2>Galeri</h2>
          </div>

          <div className={classes.gallery__gallery}>
            <div className={classes.gallery__gallery__main}>
              <Image
                alt={mainImage}
                src={`/images/gallery/${mainImage}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <ul className={classes.gallery__gallery__list}>
              {fileNames.map((file) => (
                <li
                  key={file}
                  onClick={handleChangeImage}
                  className={classes.gallery__gallery__list__image}
                >
                  <Image
                    alt={file}
                    src={`/images/gallery/${file}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </Container>
  );
}

export const getStaticProps = async () => {
  const directory = path.join(process.cwd(), "public", "images", "gallery");
  const fileNames = fs.readdirSync(directory);

  return {
    props: { fileNames },
  };
};
