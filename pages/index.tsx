import Link from "next/link"
import { PrismaClient } from "@prisma/client"

import LiftOnHover from "../components/LiftOnHover"
import ThreadCard from "../components/ThreadCard"
import { toHexColor } from "../lib/utils"
import Head from "next/head"

export default function Index({ categories, latestThreads }) {
    const categoriesView = categories.map(c => (
        <Link key={c.id} href={`/category/${c.id}`}>
            <a>
                <LiftOnHover>
                    <div
                        className={`bg-white rounded-xl shadow-lg border-l-4 p-8`}
                        style={{ borderLeftColor: `#${toHexColor(c.title)}` }}
                    >
                        <h2 className="text-2xl font-bold">{c.title}</h2>
                        <p className="text-lg text-gray-500 leading-loose">{c.description}</p>
                    </div>
                </LiftOnHover>
            </a>
        </Link>
    ))

    const latestThreadsView = latestThreads.map(t => (
        <div key={t.id}>
            <Link href={`/thread/${t.id}`}>
                <a>
                    <LiftOnHover>
                        <ThreadCard title={t.title} excerpt={t.excerpt} author={t.author} />
                    </LiftOnHover>
                </a>
            </Link>
        </div>
    ))

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <div className="flex gap-8">
                <div className="flex flex-col w-1/2 gap-8">{categoriesView}</div>
                <div className="flex flex-col w-1/2 gap-8">{latestThreadsView}</div>
            </div>
        </>
    )
}

export async function getServerSideProps({ req }) {
    const prisma = new PrismaClient()
    const [categories, latestThreads] = await prisma.$transaction([
        prisma.category.findMany({
            select: {
                id: true,
                title: true,
                description: true,
            },
        }),
        prisma.thread.findMany({
            take: 10,
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                title: true,
                excerpt: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        }),
    ])

    return { props: { categories, latestThreads } }
}
