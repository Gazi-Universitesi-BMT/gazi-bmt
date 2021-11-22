import Container from "../components/Container";
import getConfig from "next/config";
import AskedQuestion from "../components/AskedQuestion";
import classes from "../styles/ask.module.css";

export default function Ask({ messages }) {
  return (
    <Container>
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
    </Container>
  );
}

export const getStaticProps = async () => {
  const { publicRuntimeConfig } = getConfig();
  const res = await fetch(`${publicRuntimeConfig.GET_MESSAGES}`);
  const messages = await res.json();

  return {
    props: {
      messages,
    },
    revalidate: 60,
  };
};
