export default async (ctx: any) => {
  const { response } = ctx;
  response.status = 404;
  response.body = {
    success: false,
    msg: "Resource not found",
  };
};
