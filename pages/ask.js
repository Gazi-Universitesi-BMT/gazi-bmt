import Container from "../components/Container";
import getConfig from "next/config";

export default function Ask({ messages }) {
  console.log(messages);
  return (
    <Container>
      <div></div>
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
