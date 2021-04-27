import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import { assertFailed, assertIntIfSetOrDefault } from "../../lib/utils"

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { skip: rawSkip, take: rawTake } = req.query

    const skip = assertIntIfSetOrDefault(res, rawSkip, 0, "Invalid 'skip' query value")
    const take = assertIntIfSetOrDefault(res, rawTake, 10, "Invalid 'take' query value")

    if (assertFailed(res)) {
        return
    }

    const [totalCategories, categories] = await prisma.$transaction([
        prisma.category.count(),
        prisma.category.findMany({
            skip,
            take,
        }),
    ])

    res.setHeader("X-Total-Count", totalCategories)
    res.status(200).json(categories)
}
