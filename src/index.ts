import { Product } from "./Product.js";
import { Koszyk } from "./Cart.js";
import { KoszykItem } from "./CartItem.js";
import { Uzytkownik } from "./Uzytkownik.js";

import { InMemoryProductRepository } from "./infra/InMemoryProductRepository.js";
import { ListProducts } from "./app/ListProducts.js";

// class Shop {
//     constructor(private name: string) { }

//     welcome() {
//         console.log(`Welcome to ${this.name}!`);
//     }
// }

async function main() {
    const repo = new InMemoryProductRepository();
    const listProducts = new ListProducts(repo);

    const products = await listProducts.execute();

    console.log(products);
}

main();


//////////
// TEST //
// TEST //
// TEST //
// TEST //
// TEST //
// TEST //
// TEST //
// TEST //
// TEST //
// TEST //
//////////

// const user = new Uzytkownik(1, "jk67", "Jan", "Kowalski", "jan.k@example.com");
// console.log(`\n--- Test Użytkownika ---`);
// console.log(`Zalogowano: ${Uzytkownik.getNameFromID(1)}`);

// // Tworzenie produktów
// const p1 = new Product("Laptop", 3500, "Mocny sprzęt", []);
// const p2 = new Product("Myszka", 150, "Bezprzewodowa", []);
// const p3 = new Product("Klawiatura", 300, "Mechaniczna", []);

// p1.dodajProdukt();
// p2.dodajProdukt();
// p3.dodajProdukt();

// console.log(`\n--- Test Produktów ---`);
// console.log(Product.findProduct("Laptop")?.Nazwa);

// // Opinie
// p1.dodajOpinie("Świetny laptop!", 1);
// p1.dodajOpinie("Szybka dostawa", 1);
// console.log(`Opinie:`, Product.listOpinie("Laptop"));

// // Operacje na koszyku
// const koszyk = new Koszyk("Mój Koszyk", 1);

// console.log(`\n--- Test Koszyka ---`);
// // Dodajemy produkty
// koszyk.dodajProdukt(new KoszykItem(p1, 1)); // 1x Laptop (3500)
// koszyk.dodajProdukt(new KoszykItem(p2, 2)); // 2x Myszka (300)
// koszyk.dodajProdukt(new KoszykItem(p3, 1)); // 1x Klawiatura (300)

// koszyk.dodajProdukt(new KoszykItem(p2, 1));

// console.log(`Produkty w koszyku:`);
// koszyk.listaProduktow().forEach(item => {
//     console.log(`- ${item.produkt.Nazwa}: ${item.ilosc} szt. (suma: ${item.suma()} PLN)`);
// });

// console.log(`Suma całkowita: ${koszyk.sumaProduktow()} PLN`);

// // Test usuwania
// console.log(`\nUsuwam klawiaturę...`);
// koszyk.usunProdukt(new KoszykItem(p3, 1));
// console.log(`Nowa suma: ${koszyk.sumaProduktow()} PLN`);
