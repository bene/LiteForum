import { useEffect, useState } from "react"

export default function useUser(id) {
    const [user, setUser] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) {
            return
        }

        setTimeout(() => {
            setUser({
                id: 1,
                username: "bene",
            })
            setLoading(false)
        }, 2000)
    }, [id])

    return [user, isLoading]
}
