import { JWTDecodeParams, JWTEncodeParams, getToken } from "next-auth/jwt";
import * as jose from "jose";

const encodedSecret = new TextEncoder().encode(process.env.JWT_SECRET!);
const encode = async (params: JWTEncodeParams) => {
    try {
        const signedToken = await new jose.SignJWT(params.token)
            .setProtectedHeader({ alg: "HS256" })
            .sign(encodedSecret);

        if (!signedToken) {
            throw new Error("Error signing token");
        }

        return signedToken;
    } catch (error) {
        console.log({ "signing token error": error });
        return null;
    }
};

const decode = async (params: JWTDecodeParams) => {
    try {
        if (!params.token) {
            throw new Error("No token provided");
        }

        const token = params.token;

        const decode = await jose.jwtVerify(token, encodedSecret);

        if (!decode.payload) {
            throw new Error("Error decoding token");
        }

        const payload = decode.payload;

        return payload;
    } catch (error) {
        console.log({ "decoding token error": error });
        return null;
    }
};

export { encode, decode, encodedSecret };
