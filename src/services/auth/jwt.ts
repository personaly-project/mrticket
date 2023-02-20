import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY!

export function encode<T>(src: T & object): string {
    if ("id" in src) {
        const token = jwt.sign({
            id: src.id
        }, SECRET_KEY)
        return token
    }
    throw new Error("id property missing")
}

export function decode<T>(authHeader: string): T {
    const token = authHeader.split(' ')[1]
    return jwt.verify(token, SECRET_KEY) as T
}