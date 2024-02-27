import { Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn } from 'typeorm';
  import { Inventory } from './Inventory';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  orderId!: string;

  @Column()
  productId!: string;

  @Column()
  currency!: string;

  @Column()
  quantity!: number;

  @Column('double precision')
  shippingCost!: number;

  @Column('double precision', { nullable: true })
  amount!: number;

  @Column()
  channel!: string;

  @Column()
  channelGroup!: string;

  @Column()
  campaign!: string;

  @Column()
  dateTime!: string;

  @ManyToOne(() => Inventory, inventory => inventory.orders, { eager: true })
  @JoinColumn({ name: 'productId', referencedColumnName: 'productId' })
  inventory!: Inventory;

}
