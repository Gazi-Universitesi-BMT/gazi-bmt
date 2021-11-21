import Container from "../components/Container";
import getConfig from "next/config";
import AskedQuestion from "../components/AskedQuestion";
import classes from "../styles/ask.module.css";

export default function Ask({ messages }) {
  return (
    <Container>
      <div className={classes.ask}>
        <div className={classes.questionamount}>
          <p>{messages.length} Mesaj.</p>
        </div>
        <ul className={classes.askedquestions}>
          {messages.map((message) => {
            return (
              <li key={message.message}>
                <AskedQuestion
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
  };
};
