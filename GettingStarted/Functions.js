function pythag(side1, side2)
{
    let side3 = Math.sqrt(side1*side1 + side2*side2)
    return side3
}

console.log(`pythag: Side1=3, Side2=4, Side3=${pythag(3,4)}`)
console.log(`pythag: Side1=12, Side2=3, Side3=${pythag(12,5)}`)
console.log(`pythag: Side1="3", Side2="4", Side3=${pythag("3","4")}`)
console.log(`pythag: Side1="a", Side2="b", Side3=${pythag("a","b")}`)
console.log(`pythag: pythag.name=${pythag.name}`)
console.log(`pythag: typeof pythag=${typeof pythag}`)

const pythag2 = (side1, side2) => Math.sqrt(side1*side1 + side2*side2);
console.log(`pythag2: Side1=3, Side2=4, Side3=${pythag2(3,4)}`)
console.log(`pythag2: pythag2.name=${pythag2.name}`)
console.log(`pythag2: typeof pythag=${typeof pythag2}`)

const pythag3 = (side1, side2) => {
    side3 = Math.sqrt(side1*side1 + side2*side2)
    return side3
}
console.log(`pythag3: Side1=3, Side2=4, Side3=${pythag3(3,4)}`)
