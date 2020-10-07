export default async (ctx: any, next: any) => {
  const { request, response } = ctx;
  const start = Date.now();
  await next();
  const responseTime = Date.now() - start;
  response.headers.set("X-Response-Time", `${responseTime} ms`);
};
