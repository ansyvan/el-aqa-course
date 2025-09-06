import { Dish } from "./Dish.js";

const pizzaDiabola = new Dish(10, "Diabola", 0.5, true);

function printDishNameAndFinalPrice(dish: Dish) {
  console.log(`Pizza ${dish.name} costs $${dish.price} after tax.`);
}

printDishNameAndFinalPrice(pizzaDiabola);
