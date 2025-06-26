// imports

// helper methods

// lambda entry point
export const handler = async (event: any, context: any) => {
  const input = JSON.parse(event.body);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from Photo Recognition Lambda!",
      input: input,
    }),
  };
};
