const createmessageuri = process.env.CREATE_MESSAGE;
const updatemessageuri = process.env.UPDATE_MESSAGE;

export const createMessage = async (message) => {
  await fetch(createmessageuri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};

export const updateMessage = async (id) => {
  await fetch(updatemessageuri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
};
