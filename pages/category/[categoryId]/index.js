import { useRouter } from "next/router"
import Link from "next/link"
import ThreadCard from "../../../components/ThreadCard"
import LiftOnHover from "../../../components/LiftOnHover"

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

export default function Category() {
    const router = useRouter()
    const { categoryId } = router.query

    const viewThreads = latestThreads.map(t => (
        <div key={t.id}>
            <LiftOnHover>
                <Link href={`/category/${categoryId}/${t.id}`}>
                    <a>
                        <ThreadCard
                            title={t.title}
                            excerpt="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
                        />
                    </a>
                </Link>
            </LiftOnHover>
        </div>
    ))

    return (
        <>
            <div className="mb-8 pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
                <h3 className="text-4xl leading-6 font-medium text-gray-900">Anouncements</h3>
                <div className="mt-3 flex sm:mt-0 sm:ml-4">
                    <Link href={`/category/${categoryId}/new`}>
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
