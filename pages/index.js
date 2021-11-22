import Container from "../components/Container";
import classes from "../styles/Home.module.css";
import getConfig from "next/config";
import Event from "../components/Event.js";
import AdminCard from "../components/AdminCard.js";
import path from "path";
import fs from "fs";
import React, { useState } from "react";
import Image from "next/image";
import { createMessage } from "../lib/message";

import ReCAPTCHA from "react-google-recaptcha";

export default function Home({ events, admins, fileNames }) {
  const [mainImage, setMainImage] = useState(fileNames[0]);
  const { publicRuntimeConfig } = getConfig();

  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleChangeImage = (e) => {
    setMainImage(e.target.alt);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (title === "") {
        setError("Konu kısmı boş olamaz.");
      } else if (!validateEmail(email)) {
        setError("Lütfen geçerli bir e-mail adresi giriniz.");
      } else if (message.split(" ").length < 10) {
        setError("Mesajınız iletilmedi.");
      } else {
        const data = {
          title: title,
          email: email,
          message: message,
        };
        createMessage(data);
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      alert(error?.message || "Something went wrong");
    } finally {
    }
  };

  const onReCAPTCHAChange = () => {
    setDisabled(!disabled);
  };

  return (
    <Container>
      <div className={classes.home}>
        <section className={classes.hero}></section>
        <section className={classes.herotext}>
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
                    objectFit="cover"
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
        <section id="ask" className={classes.ask}>
          <div className={classes.section__header}>
            <h2>Bize Sor</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div id={classes.captcha}>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={onReCAPTCHAChange}
              />
            </div>

            <div tabIndex="0" id={classes.mess} className={classes.inputbox}>
              <label>Mesaj</label>
              <textarea
                type="text"
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div tabIndex="1" id={classes.emai} className={classes.inputbox}>
              <label>
                E-mail{" "}
                <span className={classes.mail}>
                  (Cevap mail olarak iletilecektir.)
                </span>
              </label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div tabIndex="2" id={classes.titl} className={classes.inputbox}>
              <label>Konu</label>
              <input type="text" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <button type="submit" disabled={disabled}>
              Gönder
            </button>
          </form>
          {success ? (
            <div className={classes.formsuccess}>
              <p>Mesajınız başarıyla iletildi.</p>
            </div>
          ) : (
            ""
          )}
          {error ? (
            <div className={classes.formerror}>
              <p>{error}</p>
            </div>
          ) : (
            ""
          )}
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
