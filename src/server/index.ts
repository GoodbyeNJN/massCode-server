import { serve } from "@hono/node-server";

import { app } from "./hono";

export const createServer = (port: number, hostname: string) =>
    serve(
        {
            fetch: app.fetch,
            port,
            hostname,
        },
        info => console.log(`Listening on http://${info.address}:${info.port}`),
    );
