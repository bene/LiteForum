import { useEffect, useState } from "react"

export default function useThreadPreview(id) {
    const [threadPreview, setThreadPreview] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) {
            return
        }

        setTimeout(() => {
            setThreadPreview({
                id: 1,
                title: "Thread 1",
                excerpt:
                    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                authorId: 1,
            })
            setLoading(false)
        }, 2000)
    }, [id])

    return [threadPreview, isLoading]
}
