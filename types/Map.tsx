import { LocationType } from "."

type Map = {
  id: string
  name: string
  description: string
  usersPlayed: number
  likes: number
  locations: LocationType[]
  previewImg: string
  creator: string
}

export default Map