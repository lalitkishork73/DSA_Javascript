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
  const names = data.map((i) => i.name);
  // const role=data.map(i=>i.roles).flat()
  const roles = new Set(data.flatMap((x) => x.roles));
  const q3 = data
    .find((x) => x.userId === 1)
    .purchases.reduce((a, c) => a + c.amount, 0);
  const q4 = data.flatMap((i) => [
    i.address.city,
    ...i.address.previous.map((y) => y.city),
  ]);
  const q5 = data.filter((x) => x.purchases.length > 0).map((u) => u.userId);

  return {
    q1: names,
    q2: [...roles],
    q3,
    q4,
    q5,
  };
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

export function ArrayMethodMediumLevel2(data) {
  const q6 = data.flatMap((x) =>
    x.purchases.flatMap((y) =>
      y.items.map((z) => {
        return { userId: x.userId, ...z };
      })
    )
  );

  const q7 = q6.reduce((acc, { sku, qty }) => {
    acc[sku] = (acc[sku] ?? 0) + qty;
    return acc;
  }, {});

  // const q8 = data.reduce((acc, curr) => {
  //   curr.purchases.forEach((purchase) => {
  //     acc[curr.userId] = (acc[curr.userId] ?? 0) + purchase.amount;
  //   });
  //   return acc;
  // }, {});

  const totalSpent = data.map((user) => {
    const total = user.purchases.reduce((sum, p) => sum + p.amount, 0);

    return {
      userId: user.userId,
      totalSpent: total,
    };
  });

  const q8 = totalSpent.reduce(
    (max, curr) => (curr.totalSpent > max.totalSpent ? curr : max),
    totalSpent[0] ?? { userId: null, totalSpent: 0 }
  );

  // const q9 = data.flatMap((user) =>
  //   user.activityLog
  //     .filter((activity) => activity.type === "view")
  //     .map((out) => ({ userId: user.userId }))
  // );

  const q9 = data
    .filter((user) => user.activityLog.some((log) => log.type === "view"))
    .map((user) => user.userId);

  /* This code snippet is performing the following operation: */
  // const q10 = data.flatMap((user) =>
  //   user.purchases.map((purchase) =>
  //     purchase.items.reduce((acc, curr) => {
  //       acc[curr.category] = (acc[curr.category] ?? 0) + 1;
  //       return acc;
  //     }, {})
  //   )
  // );

  const q10 = data.reduce((acc, curr) => {
    curr.purchases.forEach((purchase) => {
      purchase.items.forEach((item) => {
        acc[item.category] = (acc[item.category] ?? 0) + item.price * item.qty;
      });
    });

    return acc;
  }, {});

  return {
    q6,
    q7,
    q8,
    q9,
    q10,
  };
}
