import fs from "node:fs";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

import type { PathLike } from "node:fs";

const prepareFile = <T>(filepath: PathLike, data: T) => {
    const create = () => {
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
        return data;
    };

    if (!fs.existsSync(filepath)) {
        return create();
    }

    const content = fs.readFileSync(filepath, "utf-8");
    if (!content) {
        return create();
    }

    try {
        return JSON.parse(content) as T;
    } catch (error) {
        return create();
    }
};

export class Db<T = unknown> extends Low<T> {
    constructor(filepath: PathLike, defaultData: T) {
        const adapter = new JSONFile<T>(filepath);
        const data = prepareFile(filepath, defaultData);

        super(adapter, data);
    }
}
