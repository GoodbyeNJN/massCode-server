import { Db } from "./lowdb";

import type { Data } from "./types";

export * from "./types";

const defaultData: Data = {
    folders: [],
    snippets: [],
    tags: [],
};

let cache: Db<Data>;

export const createDb = async (filepath: string) => {
    if (!filepath) {
        throw new Error("The provided filepath of db is empty!");
    }

    const db = new Db<Data>(filepath, defaultData);
    cache = db;

    return getDb();
};

export const getDb = async () => {
    if (!cache) {
        throw new Error("Db instance has not been created!");
    }

    await cache.read();

    return cache;
};
