import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import { assertFailed, assertInt } from "../../../lib/utils"
const prisma = new PrismaClient()

prisma.$use(async (params, next) => {
    const result = await next(params)
    if (params.model === "User") {
        delete result.password
    }

    return result
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id: idRaw } = req.query

    const id = assertInt(res, idRaw, "Invalid 'id' query value")
    if (assertFailed(res)) {
        return
    }

    const user = await prisma.user.findFirst({
        where: {
            id,
        },
    })

    if (!user) {
        res.status(404).json({
            error: "User does not exists",
        })
        return
    }

    res.status(200).json(user)
}
