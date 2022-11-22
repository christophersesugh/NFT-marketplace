import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  ItemBought as ItemBoughtEvent,
  ItemCancelled as ItemCancelledEvent,
  ItemListed as ItemListedEvent,
} from "../generated/NftMarketplace/NftMarketplace";
import {
  ActiveItem,
  ItemBought,
  ItemCancelled,
  ItemListed,
} from "../generated/schema";

export function handleItemBought(event: ItemBoughtEvent): void {
  let activeItemEntity = ActiveItem.load(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  // let entity = ItemBought.load(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // );
  let entity = new ItemBought(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  activeItemEntity = new ActiveItem(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.buyer = event.params.buyer;
  entity.nftAddress = event.params.nftAddress;
  entity.tokenId = event.params.tokenId;
  entity.price = event.params.price;
  activeItemEntity.buyer = event.params.buyer;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
  activeItemEntity.save();
}

export function handleItemCancelled(event: ItemCancelledEvent): void {
  let activeItemEntity = ActiveItem.load(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  let entity = new ItemCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  if (!activeItemEntity) {
    activeItemEntity = new ActiveItem(
      event.transaction.hash.concatI32(event.logIndex.toI32())
    );
  }

  entity.seeller = event.params.seeller;
  activeItemEntity.seller = event.params.seeller;

  entity.nftAddress = event.params.nftAddress;
  activeItemEntity.nftAddress = event.params.nftAddress;

  entity.tokenId = event.params.tokenId;
  activeItemEntity.tokenId = event.params.tokenId;

  activeItemEntity.buyer = Address.fromString(
    "0x000000000000000000000000000000000000dEaD"
  );

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
  activeItemEntity.save();
}

export function handleItemListed(event: ItemListedEvent): void {
  // let entity = ItemListed.load(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // );
  let activeItemEntity = ActiveItem.load(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  let entity = new ItemListed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  if (!activeItemEntity) {
    activeItemEntity = new ActiveItem(
      event.transaction.hash.concatI32(event.logIndex.toI32())
    );
  }
  entity.seller = event.params.seller;
  activeItemEntity.seller = event.params.seller;

  entity.nftAddress = event.params.nftAddress;
  activeItemEntity.nftAddress = event.params.nftAddress;

  entity.tokenId = event.params.tokenId;
  activeItemEntity.tokenId = event.params.tokenId;

  entity.price = event.params.price;
  activeItemEntity.price = event.params.price;

  activeItemEntity.buyer = Address.fromString(
    "0x0000000000000000000000000000000000000000"
  );

  // activeItemEntity.tokenId = 0;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
  activeItemEntity.save();
}
