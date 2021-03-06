import { ManufacturableThingKind } from "core/src/templateinterfaces/ManufacturableThing";
import { TitanPrototype, TitanPrototypeSaveData } from "./TitanPrototype";
import { Unit } from "core/src/unit/Unit";
import { Item } from "core/src/items/Item";
import { coreManufacturableThingKinds } from "core/src/production/coreManufacturableThingKinds";


export const manufacturableThingKinds =
{
  titanFromPrototype: <ManufacturableThingKind<TitanPrototype, Unit, TitanPrototypeSaveData>>
  {
    key: "titanFromPrototype",
    buildFromTemplate: (prototype, manufactory) =>
    {
      const unit = Unit.fromTemplate(
      {
        template: prototype.chassis,
        race: manufactory.star.localRace,
        name: prototype.name,
      });

      const items = prototype.components.map(componentTemplate => new Item(componentTemplate));
      items.forEach(item => unit.items.addItem(item));
      coreManufacturableThingKinds.item.afterBuilt(items, manufactory);

      return unit;
    },
    afterBuilt: coreManufacturableThingKinds.unit.afterBuilt,
    serialize: (prototype) => prototype.serialize(),
    deserialize: (saveData) => TitanPrototype.fromData(saveData),
  }
};
