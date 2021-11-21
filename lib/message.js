import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const createmessageuri = publicRuntimeConfig.CREATE_MESSAGE;

export const createMessage = async (message) => {
  await fetch(createmessageuri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};
