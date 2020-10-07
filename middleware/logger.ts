export default async (ctx: any, next: any) => {
  const { request, response } = ctx;
  await next();
  const responseTime = response.headers.get("X-Response-Time");
  console.log(
    `${request.method} calling ${request.url.pathname} took ${responseTime}`,
  );
};
