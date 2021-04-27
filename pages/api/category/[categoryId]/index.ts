import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { categoryId } = req.query

    const categories = await prisma.category.findFirst({
        where: {
            id: {
                equals: parseInt(categoryId as string),
            },
        },
    })
    res.status(200).json(categories)
}
