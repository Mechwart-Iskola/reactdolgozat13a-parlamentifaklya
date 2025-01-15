import { ProductList } from "../types/ProductType"

export const getComments = async () => {
    try {
        const res = await fetch("products.json")
        const data: ProductList = await res.json()
        return data
    } catch (error) {
        console.error(error)
        return undefined
    }
}