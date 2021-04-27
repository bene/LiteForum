import Link from "next/link"
import LiftOnHover from "../components/LiftOnHover"
import ThreadCard from "../components/ThreadCard"

const categories = [
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

export default function Index() {
    const viewCategories = categories.map(c => (
        <Link key={c.id} href={`/category/${c.id}`}>
            <a>
                <LiftOnHover>
                    <div
                        className={`${
                            c.color ? `border-${c.color}-500 ` : ""
                        }bg-white rounded-xl shadow-lg border-l-4 p-8`}
                    >
                        <h2 className="text-2xl font-bold">{c.title}</h2>
                        <p className="text-gray-500">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                            vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                            no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        </p>
                    </div>
                </LiftOnHover>
            </a>
        </Link>
    ))

    const latestThreads = categories.map(t => (
        <div key={t.id}>
            <Link href={`/category/null/${t.id}`}>
                <a>
                    <LiftOnHover>
                        <ThreadCard
                            title={t.title}
                            excerpt={
                                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
                            }
                            authorId={1}
                        />
                    </LiftOnHover>
                </a>
            </Link>
        </div>
    ))

    return (
        <div className="flex gap-8">
            <div className="flex flex-col w-1/2 gap-8">{viewCategories}</div>
            <div className="flex flex-col w-1/2 gap-8">{latestThreads}</div>
        </div>
    )
}
