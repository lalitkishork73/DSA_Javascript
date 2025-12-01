export function BruteForce(arr, k) {
  //   let i = 0,
  //     j = 0,
  //     sum = 0,
  //     max = 0,
  //     size = arr.length;

  //   while (j < size) {
  //     if (j - i + 1 < k) {
  //       sum += arr[j];
  //       j++;
  //     }

  //     sum += arr[j] - arr[i];
  //     j++;
  //     i++;

  //     if (sum > max) {
  //       max = sum;
  //     }
  //   }

  //   return max;

  // Online Javascript Editor for free
  // Write, Edit and Run your Javascript code using JS Online Compiler

  // let arr = [2, -1, -7, 8, -15, 30, 16, 28]
  // let k = 3;


    // let i = 0, j = 0;
    // let negative = [];
    // let ans = [];
    // let size = arr.length;

    // while (j < size) {
    //     if (arr[j] < 0) negative.push(arr[j]);

    //     if (j - i + 1 < k) {
    //         j++;
    //     } else {
    //         ans.push(negative.length > 0 ? negative[0] : 0);
    //         console.log(negative[0],arr[i]);
    //         if (negative.length > 0 && arr[i] === negative[0]) {
    //             negative.shift();
    //         }

    //         i++;
    //         j++;
    //     }
    // }
 
    // return ans;

    let n=[]
    
for(let i=0;i<arr.length-k;i++){
    let fristnegative=0
    for(let j=i;j<i+k;j++){
        if(arr[j]<0){
            fristnegative=arr[j]
            break;
        }
        
    }
    if(fristnegative===0){
        n.push(0)
        // continue
    }
    n.push(fristnegative)

}

return n.sort((a,b)=>b-a)
 
}
