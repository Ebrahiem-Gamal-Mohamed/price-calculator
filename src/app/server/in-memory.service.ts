import { InMemoryDbService } from "angular-in-memory-web-api";
import { Item } from './../shopping/item.model';

export class InMemService implements InMemoryDbService {
  createDb() {
    let items: Item[] = [
      { id: "1", name: "Tornado", price: 20 },
      { id: "2", name: "Tornado", price: 20 },
      { id: "3", name: "Tornado", price: 20 },
      { id: "4", name: "Tornado", price: 20 },
      { id: "5", name: "Tornado", price: 20 },
    ];
    return { items };
  }
}
