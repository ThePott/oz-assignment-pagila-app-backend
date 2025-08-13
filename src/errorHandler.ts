export const logError = (error: any) => {
    console.error({
        name: error?.name ?? "no name",
        message: error?.message ?? error?.stack ?? "no message"
    })
}