import {createContext} from "react";
import {IJwtContext} from "./IJwtContext";

const JwtContext = createContext<IJwtContext>({ jwtResponse: null, setJwtResponse: null });

export default JwtContext;