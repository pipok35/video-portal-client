export interface IFile {
    _id: string,
    name: string,
    path: string,
    created: {
        by: string,
        at: Date
    },
    deleted?: {
        by: string,
        at: Date
    }
}
