import { PrismaClient } from "@prisma/client"
import Link from "next/link"
import LiftOnHover from "../../components/LiftOnHover"
import Comment from "../../components/Comment"
import Head from "next/head"

export default function Thread({ user }) {
    return (
        <>
            <Head>
                <title>{user.name}</title>
            </Head>
            <div className="mb-8 pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-4xl leading-6 font-medium text-gray-900 mt-2">{user.name}</h3>
                </div>
            </div>
            <div className="grid gap-8"></div>
        </>
    )
}

export async function getServerSideProps({ req, res, params }) {
    const { userId } = params

    const prisma = new PrismaClient()
    let user = await prisma.user.findFirst({
        where: {
            id: {
                equals: parseInt(userId),
            },
        },
        select: {
            id: true,
            name: true,
        },
    })

    return { props: { user } }
}
