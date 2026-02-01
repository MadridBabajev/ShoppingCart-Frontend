import IJWTResponse from "../../dto/identity/IJWTResponse";

export interface IJwtContext {
    jwtResponse: IJWTResponse | null,
    setJwtResponse: ((data: IJWTResponse | null) => void) | null
}