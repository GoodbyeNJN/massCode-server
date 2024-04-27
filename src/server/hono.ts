import { Hono } from "hono";
import { logger } from "hono/logger";
import { nanoid } from "nanoid";

import { getDb } from "../db";

import type { Snippet, SnippetWithFolder } from "../db";

export const app = new Hono();
app.use(logger());

app.get("/snippets/embed-folder", async c => {
    const db = await getDb();

    const snippets = db.data.snippets.map<SnippetWithFolder>(snippet => {
        const folder = db.data.folders.find(folder => folder.id === snippet.folderId);
        return { ...snippet, folder };
    });

    return c.json(snippets);
});

app.post("/snippets/create", async c => {
    const db = await getDb();

    const body = await c.req.json();
    const snippet: Snippet = {
        isDeleted: false,
        isFavorites: false,
        folderId: "",
        tagsIds: [],
        description: null,
        name: "Untitled",
        content: [
            {
                label: "fragment",
                language: "plain_text",
                value: "",
            },
        ],

        id: nanoid(8),
        createdAt: Date.now().valueOf(),
        updatedAt: Date.now().valueOf(),

        ...body,
    };

    db.update(data => {
        data.snippets.push(snippet);
    });
    await db.write();

    return c.text("OK");
});
