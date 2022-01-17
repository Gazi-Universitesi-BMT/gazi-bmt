import Container from "../components/Container";
import getConfig from "next/config";
import AskedQuestion from "../components/AskedQuestion";
import classes from "../styles/ask.module.css";
import { useState } from "react";

export default function Ask({ messages }) {
  const [authorized, setAuthorized] = useState(false);
  const [pass, setPass] = useState("");

  const handleSubmit = () => {
    if (pass === process.env.PASS) {
      setAuthorized(true);
    } else {
    }
  };

  return (
    <Container>
      {authorized ? (
        <div className={classes.ask}>
          <div className={classes.questionamount}>
            <p>
              {messages.filter((mess) => mess.answered === false).length} Mesaj.
            </p>
          </div>
          <ul className={classes.askedquestions}>
            {messages
              .filter((mess) => mess.answered === false)
              .sort((a, b) => a.date > b.date)
              .map((message) => {
                return (
                  <li key={message.message}>
                    <AskedQuestion
                      id={message._id}
                      title={message.title}
                      email={message.email}
                      message={message.message}
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      ) : (
        <div className={classes.askform}>
          <form onSubmit={handleSubmit}>
            <input type="password" onChange={(e) => setPass(e.target.value)} />
            <button>Gönder</button>
          </form>
        </div>
      )}
    </Container>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.GET_MESSAGES}`);
  const messages = await res.json();

  return {
    props: {
      messages,
    },
    revalidate: 60,
  };
};
