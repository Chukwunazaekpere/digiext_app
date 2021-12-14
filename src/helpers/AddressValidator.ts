import axios from "axios";
import envs, {EnvInterface} from "../config/env";


export const addressValidator = async (addressCombination: string) => {
    const {PLACES_API_URL, PLACES_API_KEY} = envs;
    const verificationResponse = await axios.get(`${PLACES_API_URL}?input=${addressCombination}%20Nigeria&inputtype=textquery&key=${PLACES_API_KEY}`);
    return verificationResponse
}
