// Convert closure to object

// closure --
function point(x1, y1) {
    return function distFromPoint(x2, y2) {
        return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    }
}

const ptDist = point(5, 10);
console.log(ptDist(1, 7)); // 5


// object
// We pass x1 and y1 - which are the values being closed over - as an object
function point_obj(x1y1, x2, y2) {
    return Math.sqrt((x1y1.x1 - x2) ** 2 + (x1y1.y1 - y2) ** 2);
}

console.log(point_obj({ x1: 5, y1: 10 }, 1, 7))