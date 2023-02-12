import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY!

export function encode<T>(src: T & object): string {
    if ("id" in src) {
        const token = jwt.sign(src, SECRET_KEY, {
            expiresIn: "1h"
        })
        return token
    }
    throw new Error("id property missing")
}

export function decode<T>(authHeader: string): T {
    const token = authHeader.split(' ')[2]
    return jwt.verify(token, SECRET_KEY) as T
}