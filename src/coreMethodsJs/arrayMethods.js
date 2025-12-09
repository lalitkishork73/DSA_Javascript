

/*
🟦 LEVEL 1 — Medium (Warm-up)
Q1: Return an array of all user names.

Expected: ["Lalit", "Ravi", "Aman"]

Q2: Get a list of all roles without duplicates.

Expected: ["admin", "editor", "user"]

Q3: Find total purchase amount for userId = 1.
Q4: Get all cities (current + previous) for all users.
Q5: Find users who made at least one purchase.
*/
export function ArrayMethodMedium(data) {


    const names = data.map(i => i.name)
    // const role=data.map(i=>i.roles).flat()
    const roles = new Set(data.flatMap(x => x.roles))
    const q3 = data.find((x) => x.userId === 1).purchases.reduce((a, c) => a + c.amount, 0)
    const q4 = data.flatMap(i => [i.address.city, ...i.address.previous.map(y => y.city)])
    const q5 = data.filter(x => x.purchases.length > 0).map(u=>u.userId)


    return {
        q1: names,
        q2: [...roles],
        q3, q4, q5

    }

}


/* 
🟩 LEVEL 2 — Hard (Real interview difficulty)
Q6: Return a flattened list of all purchased items across all users.

Example output:

[
  { userId: 1, sku: "A1", qty: 2, category: "electronics", price: 50 },
  ...
]

Q7: Calculate total quantity purchased per SKU across all users.

Expected like:

{
  A1: 3,
  B1: 3,
  C1: 3
}

Q8: Find the top spending user.
Q9: Get users whose activityLog contains 'view' events.
Q10: Build an object:
{
  electronics: totalSpent,
  books: totalSpent,
  clothes: totalSpent
}

*/