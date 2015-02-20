// handles assignment of all dynamic properties for templates


/// <reference path="templates/abilitytemplates.ts" />

module Rance
{
  export function setAllDynamicTemplateProperties()
  {
    setAbilityGuardAddition();
  }
  function setAbilityGuardAddition()
  {
    function checkIfAbilityAddsGuard(ability: Templates.IAbilityTemplate)
    {
      var effects = [ability.mainEffect];
      if (ability.secondaryEffects)
      {
        effects = effects.concat(ability.secondaryEffects);
      }

      var dummyUser = new Unit(getRandomProperty(Templates.ShipTypes));
      var dummyTarget = new Unit(getRandomProperty(Templates.ShipTypes));

      for (var i = 0; i < effects.length; i++)
      {
        effects[i].effect(dummyUser, dummyTarget);
        if (dummyUser.battleStats.guardAmount)
        {
          return true;
        }
      }

      return false;
    }

    for (var abilityName in Templates.Abilities)
    {
      var ability = Templates.Abilities[abilityName];
      ability.addsGuard = checkIfAbilityAddsGuard(ability);
    }
  }
}
