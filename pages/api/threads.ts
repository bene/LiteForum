import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import { assertFailed, assertIntIfSetOrDefault } from "../../lib/utils"

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { categoryId: categoryIdRaw, authorId: authorIdRaw, skip: rawSkip, take: rawTake } = req.query

    const skip = assertIntIfSetOrDefault(res, rawSkip, 0, "Invalid 'skip' query value")
    const take = assertIntIfSetOrDefault(res, rawTake, 10, "Invalid 'take' query value")
    const categoryId = assertIntIfSetOrDefault(
        res,
        categoryIdRaw,
        undefined,
        "Invalid 'categoryId' query value"
    )
    const authorId = assertIntIfSetOrDefault(res, authorIdRaw, undefined, "Invalid 'authorId' query value")

    if (assertFailed(res)) {
        return
    }

    const [totalThreads, threads] = await prisma.$transaction([
        prisma.thread.count({
            where: {
                categoryId,
                authorId,
            },
        }),
        prisma.thread.findMany({
            skip: skip,
            take: take,
            where: {
                categoryId,
                authorId,
            },
            select: {
                id: true,
                title: true,
                excerpt: true,
                category: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                author: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        }),
    ])

    res.setHeader("X-Total-Count", totalThreads)
    res.status(200).json(threads)
}
