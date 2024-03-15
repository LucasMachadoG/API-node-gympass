import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExists } from "../../features/user/usecases/errors/user.already.exists.error";
import { makeGetUserProfileUsecase } from "../../features/user/usecases/factories/make.get.user.profile.usecase";
import { UserPresenter } from "../presenters/get.user.profile";

export async function profile(request: FastifyRequest, reply: FastifyReply){
  try{
    const getUserProfile = makeGetUserProfileUsecase()

    const { user } = await getUserProfile.execute({
      id: request.user.sub
    })

    return reply.status(201).send(UserPresenter.toHTTP(user))
  }catch(error: any){
    if(error instanceof UserAlreadyExists){
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}