export default async (ctx: any, next: any) => {
  const { response } = ctx;
  try {
    await next();
  } catch (err) {
    response.body = {
      success: false,
      msg: err.message,
    };
  }
};
