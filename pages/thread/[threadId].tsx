import { PrismaClient } from "@prisma/client"
import Link from "next/link"
import LiftOnHover from "../../components/LiftOnHover"
import Comment from "../../components/Comment"
import Head from "next/head"

export default function Thread({ thread }) {
    const viewComments = thread.comments.map(c => (
        <div key={c.id}>
            <Comment content={c.content} createdAt={c.createdAt} author={c.author} />
        </div>
    ))

    return (
        <>
            <Head>
                <title>{thread.title}</title>
            </Head>
            <div className="mb-8 pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
                <div>
                    <Link href={`/category/${thread.category.id}`}>
                        <a className="text-gray-400">{thread.category.title}</a>
                    </Link>
                    <h3 className="text-4xl leading-6 font-medium text-gray-900 mt-2">{thread.title}</h3>
                </div>
            </div>
            <div className="grid gap-8">
                <Comment content={thread.content} createdAt={thread.createdAt} author={thread.author} />
                {viewComments}
            </div>
        </>
    )
}

export async function getServerSideProps({ req, res, params }) {
    const { threadId } = params

    const prisma = new PrismaClient()
    let thread = await prisma.thread.findFirst({
        where: {
            id: {
                equals: parseInt(threadId),
            },
        },
        select: {
            id: true,
            title: true,
            content: true,
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
            comments: {
                select: {
                    content: true,
                    author: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    })

    return { props: { thread } }
}
