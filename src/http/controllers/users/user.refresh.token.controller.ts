import {  FastifyReply, FastifyRequest } from "fastify";

export async function userRefresh(request: FastifyRequest, reply: FastifyReply){
  // Aqui ele vai apenas olhar para os cookies da nossa requisição para ver se existe o refresh token
  await request.jwtVerify({ onlyCookie: true })

  const token = await reply.jwtSign({
    name: ''
  }, {
    sign: {
      sub: request.user.sub
    }
  })

  const refreshToken = await reply.jwtSign({
    name: ''
  }, {
    sign: {
      sub: request.user.sub,
      expiresIn: '7d'
    }
  })

  return reply.setCookie('refreshToken', refreshToken, {
    path: '/',
    secure: true,
    sameSite: true,
    httpOnly: true
  }).status(200).send({
    token
  })
}