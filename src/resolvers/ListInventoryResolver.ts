import { Resolver, Query, Arg } from "type-graphql";
import { getConnection, SelectQueryBuilder } from "typeorm";
import { Inventory } from "../entities/Inventory";

@Resolver()
export class ListInventoryResolver {
  @Query(() => [Inventory])
  async listInventory(
    @Arg("category", { nullable: true }) category: string,
    @Arg("subCategory", { nullable: true }) subCategory: string,
    @Arg("inStock", { nullable: true }) inStock: boolean,
    @Arg("offset", { defaultValue: 1 }) offset: number,
    @Arg("size", { defaultValue: 10 }) size: number,
    @Arg("sortBy", { defaultValue: "quantity" }) sortBy: "quantity" | "orders",
    @Arg("sortOrder", { defaultValue: "ASC" }) sortOrder: "ASC" | "DESC"
  ): Promise<Inventory[]> {
    const queryBuilder: SelectQueryBuilder<Inventory> = getConnection()
      .getRepository(Inventory)
      .createQueryBuilder("inventory")
      .leftJoinAndSelect("inventory.orders", "orders")
      .andWhere("inventory.quantity > 0")
      .andWhere(category ? "inventory.category = :category" : "1=1", { category })
      .andWhere(subCategory ? "inventory.subCategory = :subCategory" : "1=1", { subCategory })
      .andWhere(inStock ? "inventory.quantity > 0" : "inventory.quantity <= 0");

    if (sortBy === "quantity") {
      queryBuilder.orderBy("inventory.quantity", sortOrder);
    } else if (sortBy === "orders") {
      queryBuilder
      .addSelect(['inventory.productId', 'orders.id'])
      .groupBy('inventory.productId, orders.id')
      .orderBy('COUNT(orders.id)', sortOrder);
    }

    const start = (offset - 1) * size;
    queryBuilder.offset(start).limit(size);

    return await queryBuilder.getMany();
  }
}
