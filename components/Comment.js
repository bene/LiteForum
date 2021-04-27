import Link from "next/link"
import Image from "next/image"

export default function Comment({ content, createdAt, author: { id: authorId, name: username } }) {
    return (
        <div className="bg-white rounded-xl shadow-lg px-8 pt-8 pb-4">
            <p className="text-lg text-gray-500 leading-loose pb-5 border-b border-gray-200 mb-4">
                {content}
            </p>
            <div className="flex flex-row justify-between items-center">
                <Image
                    src="/avator-example.jpg"
                    alt="Picture of the author"
                    height={24}
                    width={24}
                    className="rounded-full"
                />
                <p className="text-gray-500 ml-2 mr-auto">
                    By{" "}
                    <Link href={`/user/${authorId}`}>
                        <a className="text-primary-500">{username}</a>
                    </Link>
                </p>
                <p className="text-gray-500 text-sm">Last activity a few minutes ago.</p>
            </div>
        </div>
    )
}
