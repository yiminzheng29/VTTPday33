export interface Item {
    itemname: string
    quantity: number
    unitprice: number
}


export interface Order {
    name: string
    address: string
    email: string
    phone: number
    express: boolean
    delivery: string
    items: Item[]

}