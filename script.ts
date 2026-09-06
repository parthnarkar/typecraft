type Pizza = {
    id: number,
    name: string,
    price: number
}

type OrderStatus = "ordered" | "completed"

type Order = {
    id: number,
    pizza: Pizza,
    status: OrderStatus
};

let nextPizzaId = 1;

const menu: Pizza[] = [
    { id: nextPizzaId++, name: "Margherita", price: 8 },
    { id: nextPizzaId++, name: "Pepperoni", price: 10 },
    { id: nextPizzaId++, name: "Hawaiian", price: 10 },
    { id: nextPizzaId++, name: "Veggie", price: 9 },
]

let cashInRegister = 100
let nextOrderId = 1

// Typed Array
const orderQueue: Order[] = []

function addNewPizza(pizzaObj: Pizza): void {
    menu.push({ id: nextPizzaId++, ...pizzaObj})
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ name: "BBQ Chicken", price: 12 })
addNewPizza({ name: "Spicy Sausage", price: 11 })

function placeOrder(pizzaName: string): Order | undefined {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)
    if (!selectedPizza) {
        console.error(`${pizzaName} does not exist in the menu`)
        return
    }
    cashInRegister += selectedPizza.price
    const newOrder: Order = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" }
    orderQueue.push(newOrder)
    return newOrder
}

function completeOrder(orderId: number): Order | undefined {
    const order = orderQueue.find(order => order.id === orderId)

    //handling the undefined case
    if (!order) {
        console.error(`${order} does not exist`);
        return;
    }

    order.status = "completed"
    return order;
}

// NORMAL LOGIC
// function getPizzaDetail(identifier: string | number) {
//     return menu.find((item: Pizza) => {
//         return item.id === identifier || item.name === identifier;
//     });
// }

/*
TYPE NARROWING: in the below we have implemented the type narrowing, like when we don't know what the data type of the identifier will be, then in the IF condition put the string condition , then we narrow down to number
*/
export function getPizzaDetail(identifier: string | number): Pizza | undefined {
    if (typeof identifier === "string") {
        return menu.find(pizza => pizza.name.toLowerCase() === identifier.toLowerCase())
    } else if (typeof identifier === "number") {
        return menu.find(pizza => pizza.id === identifier)
    } else {
        throw new TypeError("Parameter `identifier` must be either a string or a number")
    }
}

// placeOrder("Chicken Bacon Ranch")
// completeOrder(1);

console.log("Menu:", menu)
// console.log("Cash in register:", cashInRegister)
// console.log("Order queue:", orderQueue)

// console.log(getPizzaDetail("Margherita"));
// console.log(getPizzaDetail(2));