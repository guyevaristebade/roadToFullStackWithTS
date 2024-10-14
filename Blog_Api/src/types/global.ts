import mongoose from "mongoose";

export interface ResponseType<Type = any>  {
    success: boolean
    status?: number
    msg?: string
    data?: Type
}