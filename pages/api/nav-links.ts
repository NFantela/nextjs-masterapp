import type { NextApiRequest, NextApiResponse } from 'next'
import { Category } from '../../types/category'

export type NavRoutes = {
    categories: ReadonlyArray<Category>
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<NavRoutes>
) {
    res.status(200).json({
        categories: [
            {
                id: "as123-21321s212",
                name: "Smartphones",
                slug: "smartphones",
                path: "smartphones"
            },
            {
                id: "as123-21321s214",
                name: "Smart Watches",
                slug: "smart-watches",
                path: "smart-watches"
            }
        ]
    })
}
