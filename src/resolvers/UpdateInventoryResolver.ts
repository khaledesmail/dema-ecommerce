import { Resolver, Mutation, Arg } from "type-graphql";
import { getRepository } from "typeorm";

import { Inventory } from "../entities/Inventory";

@Resolver()
export class UpdateInventoryResolver {
  @Mutation(() => Inventory)
  async updateInventory(
    @Arg("productId") productId: string,
    @Arg("name", { nullable: true }) name: string,
    @Arg("quantity", { nullable: true }) quantity: number,
    @Arg("category", { nullable: true }) category: string,
    @Arg("subCategory", { nullable: true }) subCategory: string
  ): Promise<Inventory> {
    const inventoryRepository = getRepository(Inventory);

    let inventory = await inventoryRepository.findOne({ where: { productId }, relations: ["orders"] });

    if (!inventory) {
      inventory = inventoryRepository.create({ productId });
    }

    inventory = {
      ...inventory,
      ...(name !== undefined && { name }),
      ...(quantity !== undefined && { quantity }),
      ...(category !== undefined && { category }),
      ...(subCategory !== undefined && { subCategory }),
    };

    return await inventoryRepository.save(inventory);
  }
}
