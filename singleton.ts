// DO NOT EDIT THIS FILE, THIS IS THE PRISMA MOCK FOR TESTING

import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended"

import prisma from "@/services/prisma/prisma";

jest.mock('@/services/prisma/prisma', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>()
}))


beforeEach(() => {
    if (prismaMock) {
        mockReset(prismaMock)
    }
})

//this is for removing the warning in testing 
const originalError = console.error;
beforeAll(() => {
    console.error = (...args) => {
        if (/Warning: ReactDOM.render is no longer supported in React 18./.test(args[0])) {
            return;
        }
        originalError.call(console, ...args);
    };
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>