const test = [
    {
        id: 1, left: 1, top:3, width:4, height: 4
    },
    {
        id: 2, left: 3, top:1, width:4, height: 4
    },
    {
        id: 3, left: 5, top:5, width:2, height: 2
    }
]

const createFabric = (width, heigth) => {
    const square = new Array(width);
    for (let wPos = 0; wPos < square.length; wPos++) {
        square[wPos] = new Array(heigth);
    }

    return {
        square: square,
        exes: 0,
        idIntact: ''
    };
}

const fillFabric = (fabric, claim) => {
    let { square }  = fabric;
    let { exes } = fabric;
    for (let wPos = claim.left; wPos < claim.left + claim.width; wPos++) {
        for (let hPos = claim.top; hPos < claim.top + claim.height; hPos++) {
            if ( square[wPos][hPos] === 1 ) exes++;
            
            square[wPos][hPos] = square[wPos][hPos] + 1 || 1;
        }
    }

    return {
        square: square,
        exes: exes,
    };
}

const isClaimIntact = (claim, fabric) => {
    let { square }  = fabric;
    for (let wPos = claim.left; wPos < claim.left + claim.width; wPos++) {
        for (let hPos = claim.top; hPos < claim.top + claim.height; hPos++) {
            if ( square[wPos][hPos] !== 1 ) return false;
        }
    }
    return true;
}

const processClaims = (claims) => {
    let fabric = createFabric(1000, 1000);
    
    claims.map(claim => fabric = fillFabric(fabric, claim));

    const { id } = claims.find(claim => isClaimIntact(claim, fabric));
    fabric.idIntact = id;

    return fabric;
}