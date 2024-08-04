export interface IVideo {
    _id: string,
    title: string,
    description: string,
    file: string,
    created: {
        by: string,
        at: Date
    },
    updated?: {
        by: string,
        at: Date
    },
    deleted?: {
        by: string,
        at: Date
    }
}
