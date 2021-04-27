import Link from "next/link"
import Image from "next/image"

import Loading from "./Loading"
import useUser from "./hooks/useUser"

export default function ThreadCard({ title, excerpt, authorId }) {
    const [user, isLoadingUser] = useUser(authorId)

    return (
        <div className="bg-white rounded-xl shadow-lg px-8 pt-8 pb-4">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-lg text-gray-500 leading-loose pb-5 border-b border-gray-200 mb-4">
                {excerpt}
            </p>
            <div className="flex flex-row justify-between items-center">
                {isLoadingUser ? (
                    <Loading className="h-4 w-4" />
                ) : (
                    <>
                        <Image
                            src="/avator-example.jpg"
                            alt="Picture of the author"
                            height={24}
                            width={24}
                            className="rounded-full"
                        />
                        <p className="text-gray-500 ml-2 mr-auto">
                            By{" "}
                            <Link href={`/user/${user.id}`}>
                                <a className="text-primary-500">{user.username}</a>
                            </Link>
                        </p>
                    </>
                )}
                <p className="text-gray-500 text-sm">Last activity a few minutes ago.</p>
            </div>
        </div>
    )
}
