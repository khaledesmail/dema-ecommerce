import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Order } from './Order';

@Entity()
export class Inventory {
  @PrimaryColumn()
  productId!: string;

  @Column()
  name!: string;

  @Column()
  quantity!: number;

  @Column()
  category!: string;

  @Column()
  subCategory!: string;

  @OneToMany(() => Order, order => order.inventory)
  orders!: Order[];

}
