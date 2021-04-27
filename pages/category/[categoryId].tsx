import Link from "next/link"
import ThreadCard from "../../components/ThreadCard"
import LiftOnHover from "../../components/LiftOnHover"
import { PrismaClient } from "@prisma/client"
import Head from "next/head"

const latestThreads = [
    {
        id: 1,
        title: "Annaouncements",
        color: "blue",
    },
    {
        id: 2,
        title: "Human space flight",
        color: "green",
    },
    {
        id: 3,
        title: "Science",
        color: "red",
    },
]

export default function Category({ category }) {
    const viewThreads = category.threads.map(t => (
        <div key={t.id}>
            <LiftOnHover>
                <Link href={`/thread/${t.id}`}>
                    <a>
                        <ThreadCard title={t.title} excerpt={t.excerpt} author={t.author} />
                    </a>
                </Link>
            </LiftOnHover>
        </div>
    ))

    return (
        <>
            <Head>
                <title>{category.title}</title>
            </Head>
            <div className="mb-8 pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
                <h3 className="text-4xl leading-6 font-medium text-gray-900">{category.title}</h3>
                <div className="mt-3 flex sm:mt-0 sm:ml-4">
                    <Link href={`/category/${category.id}/new`}>
                        <a>
                            <button
                                type="button"
                                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                                New thread
                            </button>
                        </a>
                    </Link>
                </div>
            </div>
            <div className="grid gap-8">{viewThreads}</div>
        </>
    )
}

export async function getServerSideProps({ req, res, params }) {
    const { categoryId } = params

    const prisma = new PrismaClient()
    let category = await prisma.category.findFirst({
        where: {
            id: {
                equals: parseInt(categoryId),
            },
        },
        select: {
            id: true,
            title: true,
            description: true,
            threads: {
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
            },
        },
    })

    return { props: { category } }
}
