import { useEffect, useState } from "react"

export default function useCategory(id) {
    const [category, setCategory] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) {
            return
        }

        setTimeout(() => {
            setCategory({
                id: 1,
                title: "Announcements",
            })
            setLoading(false)
        }, 2000)
    }, [id])

    return [category, isLoading]
}
