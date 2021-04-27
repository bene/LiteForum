import { NextApiResponse } from "next"

export function parseIntWithFallback(value: string, fallback: number): number {
    const result = parseInt(value)
    return isNaN(result) ? fallback : result
}

export function assertString(res: NextApiResponse, value: any, message: string): string {
    if (typeof value === "string") {
        return value
    }
    res.status(400).json({
        error: message,
    })
}

export function assertInt(res: NextApiResponse, value: any, message: string): number {
    const parsed = parseInt(value)

    if (!isNaN(parsed)) {
        return parsed
    }
    res.status(400).json({
        error: message,
    })
}

export function assertIntIfSetOrDefault(
    res: NextApiResponse,
    value: any,
    defaultValue: number,
    message: string
): number {
    if (!value) {
        return defaultValue
    }

    const parsed = parseInt(value)

    if (!isNaN(parsed)) {
        return parsed
    }
    res.status(400).json({
        error: message,
    })
}

export function assertFailed(res: NextApiResponse): boolean {
    return res.finished || res.destroyed
}

export function toHexColor(value: string): string {
    let hash = 0
    for (let i = 0; i < value.length; i++) {
        hash = value.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = (hash & 0x00ffffff).toString(16).toUpperCase()

    return "00000".substring(0, 6 - color.length) + color
}
