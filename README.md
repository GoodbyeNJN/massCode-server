<h1 align="center">massCode Server</h1>

This is a standalone server for [assistant-vscode](https://github.com/massCodeIO/assistant-vscode), eliminating the need to run the [massCode](https://github.com/massCodeIO/massCode) application for deployment in a non GUI environment.

## Features

-   Custom listening address and port.
-   Custom massCode database file path.

## Usage

### Node.js

```bash
# 1. Clone this repo
git clone https://github.com/GoodbyeNJN/massCode-server

# 2. Build
pnpm install && pnpm build

# 3. (Optional) Set environments
export PORT=3000
export HOSTNAME=0.0.0.0
export DB=/path/to/massCode/directory/db.json

# 4. Start server
node dist/index.js
```

### Docker

```bash
docker run -d \
    --name masscode-server
    --restart=always \
    -e PORT=3033 \
    -e HOSTNAME=0.0.0.0 \
    -e DB=/app/db/db.json \
    -p 3033:3033 \
    -v /path/to/massCode/directory:/app/db \
    masscode-server
```

## API

```ts
export interface Snippet {
    id: string;
    name: string;
    content: SnippetContent[];
    description?: string | null;
    folderId: string;
    tagsIds: string[];
    isFavorites: boolean;
    isDeleted: boolean;
    createdAt: number;
    updatedAt: number;
}

export interface SnippetWithFolder extends Snippet {
    folder?: Folder;
}
```

-   `GET /snippets/embed-folder` -> `SnippetWithFolder[]`

    Get all snippets including folder info.

-   `POST /snippets/create` <- `Partial<Snippet>`

    Create a new snippet.
