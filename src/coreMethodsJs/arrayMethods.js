

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
export function ArrayMethodMedium(data){


    const names=data.map(i=>i.name)
    const role=data.map(i=>i.roles).flat()
    const roles=new Set(role)


    return {
        q1:names,
        q2:[...roles],
        

    }

}