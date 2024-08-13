import type { FastifyReply, FastifyRequest } from "fastify";
import credentials from "../datastore/credentials";

export const basicAuthHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    const authHeader = request.headers["authorization"];
    if (!authorized(authHeader)) {
        reply
            .status(401)
            .header("WWW-Authenticate", "BASIC realm=\"Workshop\"")
    } else {
        reply
            .send("Highly sensitive content");
    }
}

function authorized(authHeader: string | string[] | undefined): boolean {
    if (!authHeader ||
        typeof(authHeader) !== 'string' ||
        !(authHeader as string).toUpperCase().startsWith("BASIC")) {
        return false;
    }

    const encodedCredentials = authHeader.substring(6);
    const decodedCredentials = atob(encodedCredentials);
    const [username, password] = decodedCredentials.split(":");
    return credentials.get(username) === password;
}