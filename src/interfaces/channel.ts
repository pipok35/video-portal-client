export interface IChannel {
    _id: string,
    title: string,
    avatarId: string,
    description: string,
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
