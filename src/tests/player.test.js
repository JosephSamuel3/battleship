import Player from "../modules/player.js";
import { Ship } from "../modules/ship.js"

describe("Player class tests", () => {

    test("Real player attacks another player's board and records hits", () => {
        const player1 = new Player("real");
        const player2 = new Player("real");

        const ship = new Ship("destroyer", 2);
        player2.gameboard.placeShip(ship, 0, 0, "horizontal");

        expect(player1.attack(player2.gameboard, 0, 0)).toEqual({ result: "hit", ship: ship.name })
        expect(player1.attack(player2.gameboard, 0, 0)).toEqual({ result: "already attacked" })
        expect(player1.attack(player2.gameboard, 0, 1)).toEqual({ result: "sunk", ship: ship.name })
    })

    test("Computer player can make random valid attacks", () => {
        const computer = new Player("computer");
        const enemy = new Player("real");

        const ship = new Ship("destroyer", 2);
        enemy.gameboard.placeShip(ship, 0, 0, "horizontal");

        const possibleResult = new Set(["hit", "miss", "sunk", "already attacked"]);
        const results = new Set();
        for(let i = 0; i < 10; i++){
            const result = computer.randomAttack(enemy.gameboard);
            expect(possibleResult.has(result.result)).toBe(true);
        }
    });

});