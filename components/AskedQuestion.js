import { useState } from "react";
import classes from "./styles/askedquestion.module.css";
import Image from "next/image";
import { updateMessage } from "../lib/message";

export default function AskedQuestion({ id, title, email, message }) {
  const [hidden, setHidden] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [info, setInfo] = useState("");

  const handleAnswer = (e) => {
    e.preventDefault();
    setInfo("");
    try {
      const data = {
        id: id,
      };

      updateMessage(data);
      setInfo("Mesaj az sonra silinecek.");
    } catch (err) {
      console.log(err, "Mesaj silinirken bir hata oluştu.");
      setInfo("Mesaj silinirken bir hata oluştu.");
    }
  };

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
          <div className={classes.askedquestion__buttons}>
            <a
              target="_blank"
              rel="noreferrer"
              href={`mailto:${email}?subject=Gazi Üniversitesi Bilgisayar Mühendisliği Topluluğu`}
            >
              <div className={classes.askedquestion__buttons}>
                <button
                  onClick={() => setDisabled(false)}
                  className={classes.askedquestion__buttons__answer}
                >
                  Cevapla
                </button>
              </div>
            </a>

            <button
              disabled={disabled}
              className={classes.askedquestion__buttons__check}
              onClick={handleAnswer}
            >
              <Image
                src="/icons/check.svg"
                width="16px"
                height="16px"
                alt="check"
              />
            </button>
            <p>{info}</p>
          </div>
        </div>
      )}
    </div>
  );
}
