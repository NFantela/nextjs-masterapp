import { NextApiRequest, NextApiResponse } from "next";

export interface PlaylistItem {
    id: string;
    name: string;
    description?: string;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ playlists: PlaylistItem[] }>
) {
    res.status(200).json({
        playlists: [
            {
                id: "as123-21321s212",
                name: "Playlist 1",
            },
            {
                id: "as123-21321s214",
                name: "Playlist 2",
            }
        ]
    })
}