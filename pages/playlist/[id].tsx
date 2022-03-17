import type {
    GetStaticPropsContext,
    InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/common/layout/Layout';
import { PlaylistItem } from '../api/playlists';

export async function getStaticPaths() {
    // hard coded return for now
    const ids = ['sad-1', 'sad-2'].map(id => ({ params: { id } }));

    return {
        paths: ids,
        fallback: false,
    }
}

export async function getStaticProps({
    params,
}: GetStaticPropsContext<{ id: string }>) {
    // todo get this to server later
    const playlists: PlaylistItem[] = [{
        id: 'sad-1',
        name: 'Playlist 1'
    },
    {
        id: 'sad-2',
        name: 'Playlist 2'
    }];

    const playlist = playlists.find(p => p.id === params?.id)

    if (!playlist) {
        throw new Error(`Playlist with slug '${params!.id}' not found`)
    }

    return {
        props: {
            playlist,
        },
        revalidate: 200,
    }
}

export default function Playlist({ playlist }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter()

    return router.isFallback ? (
        <h1>Loading...</h1>
    ) : (
        <>
            <h1>Records according to id  are here</h1>
            <p>{playlist.name}</p>
        </>
    )
}

Playlist.Layout = Layout;