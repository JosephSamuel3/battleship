import { Gameboard } from "../modules/gameboard.js";
import { Ship } from "../modules/ship.js";

test("Testing placeShip and receiveAttack functions", ()=>{
    const board = new Gameboard
    const ship = new Ship("sub", 3)
    board.placeShip(ship, 0, 0, "horizontal") //ship should occupy [0,0],[0,1],[0,2]

    //testing for hits
    expect(board.receiveAttack(0,0)).toEqual({ result: "hit", ship: ship.name })
    expect(board.receiveAttack(0,1)).toEqual({ result: "hit", ship: ship.name })
    expect(board.receiveAttack(0,0)).toEqual({ result: "already attacked" })
    expect(board.receiveAttack(0,2)).toEqual({ result: "sunk", ship: ship.name })

    //testing for miss
    expect(board.receiveAttack(5,0)).toEqual({ result: "miss" })
    expect(board.receiveAttack(5,5)).toEqual({ result: "miss" })
})

test("Testing for overlap or out-of-bound ship placement to throw error", ()=>{
    const board = new Gameboard
    const s1 = new Ship("sub", 3)
    board.placeShip(s1, 0, 0, "horizontal") //ship should occupy [0,0],[0,1],[0,2]

    const s2 = new Ship("destroyer", 2)
    expect(() => board.placeShip(s2, 0, 1, "vertical")).toThrow() //this is testing overlap of ship placement between s1 and s2

    const s3 = new Ship("carrier", 5)
    expect(() => board.placeShip(s3, 1, 6, "horizontal")).toThrow() //this is testing out-of-bound ship placement
})

test("testing allShipSunk function", () =>{
    const board = new Gameboard
    const s1 = new Ship("sub", 3)
    const s2 = new Ship("destroyer", 2)
    board.placeShip(s1, 0, 0, "horizontal")
    board.placeShip(s2, 1, 2, "horizontal")

    //s1
    expect(board.receiveAttack(0,0)).toEqual({ result: "hit", ship: s1.name })
    expect(board.receiveAttack(0,1)).toEqual({ result: "hit", ship: s1.name })
    expect(board.receiveAttack(0,2)).toEqual({ result: "sunk", ship: s1.name })

    //s2
    expect(board.receiveAttack(1,2)).toEqual({ result: "hit", ship: s2.name })
    expect(board.receiveAttack(1,3)).toEqual({ result: "sunk", ship: s2.name })

    //checking if all ship is sunk
    expect(board.allShipSunk()).toBe(true);

})
