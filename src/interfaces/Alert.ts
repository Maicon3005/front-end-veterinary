export interface AlertInterface {
    title: string,
    message: string,
    type: "error" | "success" | "warning" | "info" | undefined,
}