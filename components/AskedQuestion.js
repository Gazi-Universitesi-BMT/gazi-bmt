import { useState } from "react";
import classes from "./styles/askedquestion.module.css";

export default function AskedQuestion({ title, email, message }) {
  const [hidden, setHidden] = useState(true);
  const [mail, setMail] = useState({ email });

  let loc = "location.href = `mailto:${email}`;";

  return (
    <div className={classes.askedquestion} onClick={() => setHidden(false)}>
      <h2>{title}</h2>
      <p className={classes.askedquestion__mail}>{email}</p>
      <br />
      {hidden ? (
        ""
      ) : (
        <div className={classes.askedquestion__message}>
          <p>{message}</p>
          <a
            target="_blank"
            href={`mailto:${email}?subject=Gazi Üniversitesi Bilgisayar Mühendisliği Topluluğu`}
          >
            <button>Cevapla</button>
          </a>
        </div>
      )}
    </div>
  );
}
