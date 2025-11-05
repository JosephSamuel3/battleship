import { Ship } from "../modules/ship.js"

test("If ship registers hit", () => {
    const ship = new Ship("submarine",3); 
    ship.hit();
    expect(ship.isSunk()).toBe(false);
})

test("If ship registers sunken ships", () => {
    const ship = new Ship("submarine",3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
})