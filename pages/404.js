import Image from "next/image"

export default function Custom404() {
    return (
        <div className="bg-white rounded-xl shadow-lg p-8 py-24 flex flex-col justify-center items-center text-center">
            <Image src="/illustration-map.png" height={330} width={330} />
            <p className="text-6xl text-gray-700 mt-16">
                The page you’re looking
                <br />
                for can’t be found.
            </p>
        </div>
    )
}
