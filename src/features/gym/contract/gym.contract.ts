import { Gym, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface GymsRepository{
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
  findByLatitudeLongitude(latitude: Decimal, longitude: Decimal): Promise<Gym | null>
}