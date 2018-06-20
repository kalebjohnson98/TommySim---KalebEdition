"use strict";
{
    let gameService = function(){
        let vm = this;
        //sets up city name
        vm.setVillaName = function(result){
            vm.resources.town = result;
        }
        
        //initial starting resources
        vm.resources = {
        town: "",
        villagers: [],
        wood: 0,
        food: 6,
        water: 6,
        houses: 1,
        wells: 0,
        days: 1,
        actionPoints: 0,
        weapons: 0,
        bows: 0,
        spears: 0,
        woodSwords: 0,
        sticks: 0,
        largeWSword: 0
        }

        vm.setValues = function(){
            return vm.resources;
        }

        //daily losses
        vm.losses = function(){
            vm.resources.food -= vm.resources.villagers.length*1;
            vm.resources.water += vm.resources.wells
            vm.resources.water -= vm.resources.villagers.length*2;
        }
        //action point cost
        vm.actionPrice = function(){
            vm.resources.actionPoints--;
        }

        //action points checker
        vm.actionsChecker = function(){
            if(vm.resources.actionPoints === 0){
                vm.losses();
                vm.resources.days++;
                vm.resources.actionPoints = vm.resources.villagers.length;
            }
            else{
                console.log("keep playing");
            }
        }


        //check win
        vm.checkWin = function(){
            if(vm.resources.villagers.length >= 5){
                alert("Congratulations! You beat TommySim2.0!");
            }
            else{
                console.log("continue playing");
            }
        }

        vm.checkLoss = function(){
            if(vm.resources.food <= 0 || vm.resources.water <= 0 || vm.resources.villagers.length <= 0){
                if(vm.resources.villagers.length > 0){
                    vm.villagerRemoved = vm.resources.villagers.splice(-1);
                    vm.resources.actionPoints--;
                    vm.resources.houses--;
                    alert(`${vm.villagerRemoved} has died due to lack of resources, plus they left the stove on and their house burned down too...`);
                }
                else{
                    alert("Your village has crumbled and now has a population of 0, click 'OK' to see how far you made it then head to the home page to play again.");

                }
            }
        }

        //adding villagers
        vm.addPerson = function(villagerName){
            vm.resources.villagers.push(villagerName);
            vm.resources.actionPoints++;
        }

        //the current turns choice option
        vm.thisTurn = function(choice){
            if(choice === "get wood"){
                vm.woodGathered = Math.floor(Math.random() * 5) + 1;
                vm.resources.wood += vm.woodGathered;

                vm.choiceChosen = choice;
                return vm.choiceChosen,
                    vm.woodGathered;
            }
            else if(choice === "get food"){
                vm.foodGathered = Math.floor(Math.random() * 5);
                vm.resources.food += vm.foodGathered;

                vm.choiceChosen = choice;
                return vm.choiceChosen,
                    vm.foodGathered;
            }
            else if(choice === "get water"){
                vm.waterGathered = Math.floor(Math.random() * 5) + 1;
                vm.resources.water += vm.waterGathered;

                vm.choiceChosen = choice;
                return vm.choiceChosen,
                    vm.waterGathered;
            }
            else if(choice === "build a house"){
                if(vm.resources.wood >= 5){
                    vm.resources.houses++;
                    vm.resources.wood -= 5;

                    vm.choiceChosen = choice;
                    return vm.choiceChosen,
                        vm.resources.houses;
                }
                else{
                    alert("Sorry, you don't have enough wood for that..");
                    $("a").click(function( event ) {
                        event.preventDefault();
                    }); 
                }
            }
            else if(choice === "build a well"){
                if(vm.resources.wood >= 6){
                    vm.resources.wells++;
                    vm.resources.wood -= 6;

                    vm.choiceChosen = choice;
                    return vm.choiceChosen,
                        vm.resources.wells;
                }
                else{
                    alert("Sorry, you don't have enough wood for that..");
                    $("a").click(function( event ) {
                        event.preventDefault();
                    }); 
                }
            }

            //random explore events
            else if(choice === "explore"){
                vm.randomEvent = Math.floor(Math.random() * 100) + 1;
                console.log(vm.randomEvent);
                if(vm.randomEvent <= 6){
                    vm.waterGathered = Math.floor(Math.random() * 10) + 2;
                    vm.resources.food += vm.waterGathered;
                    vm.reward = vm.waterGathered + " food";

                    vm.choiceChosen = choice;
                    return vm.choiceChosen,
                        vm.reward;
                }
                else if(vm.randomEvent <= 12 && vm.randomEvent >= 7){
                    vm.foodGathered = Math.floor(Math.random() * 9) + 1;
                    vm.resources.water += vm.foodGathered;
                    vm.reward = vm.foodGathered + " water";

                    vm.choiceChosen = choice;
                    return vm.choiceChosen,
                        vm.reward;
                }
                else if(vm.randomEvent === 13){
                    vm.resources.villagers.splice(0, 100);
                    vm.reward = "some cool stuff, but your village got nuked while you were gone... GG...";

                    vm.choiceChosen = choice;
                    return vm.choiceChosen,
                        vm.reward;
                }
                else if(vm.randomEvent >= 14 && vm.randomEvent <= 40){
                    vm.reward = "nothing";

                    vm.choiceChosen = choice;
                    return vm.choiceChosen,
                        vm.reward;
                }
                else if(vm.randomEvent >= 41 && vm.randomEvent <= 48){
                    vm.woodGathered = Math.floor(Math.random() * 10) + 2;
                    vm.resources.wood += vm.woodGathered;
                    vm.reward = vm.woodGathered + " wood";

                    vm.choiceChosen = choice;
                    return vm.choiceChosen,
                        vm.reward;
                }
                else if(vm.randomEvent >= 49 && vm.randomEvent <= 59){
                    vm.foodGathered = Math.floor(Math.random() * 9) + 1;
                    vm.resources.food += vm.foodGathered;
                    vm.waterGathered = Math.floor(Math.random() * 10) + 2;
                    vm.resources.water += vm.waterGathered;

                    vm.reward = vm.foodGathered + " food and " + vm.waterGathered + " water";

                    vm.choiceChosen = choice;
                    return vm.choiceChosen,
                        vm.reward;
                }
                else if(vm.randomEvent >= 60 && vm.randomEvent <= 70){
                    vm.reward = "nothing";

                    vm.choiceChosen = choice;
                    return vm.choiceChosen,
                        vm.reward;
                }
                else if(vm.randomEvent >= 71 && vm.randomEvent <= 79){
                    if(vm.resources.weapons >= 1){
                        if(vm.resources.largeWSword >= 1){
                            vm.survivalChance = Math.floor(Math.random() * 2) + 1;
                            if(vm.survivalChance === 1){
                                vm.resources.food += 10;
                                vm.reward = "into a fight with bear. You were able to kill it and take home a good supply of food. Good thing you had that large wood sword"
                                return vm.reward;
                            }
                            else{
                                vm.villagerKilled = vm.resources.villagers.splice(-1);
                                vm.resources.houses--;
                                vm.reward = `${vm.villagerKilled} was killed by a bear.. your large wood sword failed to protect you`;
                                return vm.reward;
                            }
                        }
                        else if(vm.resources.bows >= 1){
                            vm.survivalChance = Math.floor(Math.random() * 3) + 1;
                            if(vm.survivalChance === 1){
                                vm.resources.food += 10;
                                vm.reward = "into a fight with bear. You were able to kill it and take home a good supply of food. Good thing you had that bow and arrow"
                                return vm.reward;
                            }
                            else{
                                vm.villagerKilled = vm.resources.villagers.splice(-1);
                                vm.resources.houses--;
                                vm.reward = `${vm.villagerKilled} was killed by a bear.. your large wood sword failed to protect you`;
                                return vm.reward;
                            }
                        }
                        else if(vm.resources.spear >= 1){
                            vm.survivalChance = Math.floor(Math.random() * 4) + 1;
                            if(vm.survivalChance === 1){
                                vm.resources.food += 10;
                                vm.reward = "into a fight with bear. You were able to kill it and take home a good supply of food. Good thing you had that spear"
                                return vm.reward;
                            }
                            else{
                                vm.villagerKilled = vm.resources.villagers.splice(-1);
                                vm.resources.houses--;
                                vm.reward = `${vm.villagerKilled} was killed by a bear.. your large wood sword failed to protect you`;
                                return vm.reward;
                            }
                        }
                        else if(vm.resources.woodSwords >= 1){
                            vm.survivalChance = Math.floor(Math.random() * 5) + 1;
                            if(vm.survivalChance === 1){
                                vm.resources.food += 10;
                                vm.reward = "into a fight with bear. You were able to kill it and take home a good supply of food. Good thing you had that wood sword"
                                return vm.reward;
                            }
                            else{
                                vm.villagerKilled = vm.resources.villagers.splice(-1);
                                vm.resources.houses--;
                                vm.reward = `${vm.villagerKilled} was killed by a bear.. your large wood sword failed to protect you`;
                                return vm.reward;
                            }
                        }
                        else if(vm.resources.sticks >= 1){
                            vm.survivalChance = Math.floor(Math.random() * 6) + 1;
                            if(vm.survivalChance === 1){
                                vm.resources.food += 10;
                                vm.reward = "into a fight with bear. You were able to kill it and take home a good supply of food. Good thing you had that sharp stick"
                                return vm.reward;
                            }
                            else{
                                vm.villagerKilled = vm.resources.villagers.splice(-1);
                                vm.resources.houses--;
                                vm.reward = `${vm.villagerKilled} was killed by a bear.. your large wood sword failed to protect you`;
                                return vm.reward;
                            }
                        }
                    }
                    else{
                        vm.villagerKilled = vm.resources.villagers.splice(-1);
                        vm.resources.houses--;
                        vm.reward = `${vm.villagerKilled} was killed by a bear`;
                    }
                        vm.choiceChosen = choice;
                        return vm.choiceChosen,
                            vm.reward
                    }
                else if(vm.randomEvent >= 80 && vm.randomEvent <= 84){
                    vm.woodGathered = Math.floor(Math.random() * 10) + 2;
                    vm.resources.wood += vm.woodGathered;
                    vm.waterGathered = Math.floor(Math.random() * 10) + 2;
                    vm.resources.water += vm.waterGathered;

                    vm.reward = vm.woodGathered + " wood and " + vm.waterGathered + " water";

                    vm.choiceChosen = choice;
                    return vm.choiceChosen,
                        vm.reward;
                }
                else if(vm.randomEvent >= 85 && vm.randomEvent <= 89){
                    vm.woodGathered = Math.floor(Math.random() * 10) + 2;
                    vm.resources.wood += vm.woodGathered;
                    vm.foodGathered = Math.floor(Math.random() * 9) + 1;
                    vm.resources.food += vm.foodGathered;

                    vm.reward = vm.woodGathered + " wood and " + vm.foodGathered + " food";

                    vm.choiceChosen = choice;
                    return vm.choiceChosen,
                        vm.reward;
                }
                else if(vm.randomEvent >= 90 && vm.randomEvent <= 100){
                    if(vm.resources.weapons >= 1){
                        if(vm.resources.largeWSword >= 1){
                            vm.survivalChance = Math.floor(Math.random() * 2) + 1;
                            if(vm.survivalChance === 1){
                                vm.resources.food += 10;
                                vm.reward = "into a fight with bear. You were able to kill it and take home a good supply of food. Good thing you had that large wood sword"
                                return vm.reward;
                            }
                            else{
                                vm.villagerKilled = vm.resources.villagers.splice(-1);
                                vm.resources.houses--;
                                vm.reward = `${vm.villagerKilled} was killed by a bear.. your large wood sword failed to protect you`;
                                return vm.reward;
                            }
                        }
                        else if(vm.resources.bows >= 1){
                            vm.survivalChance = Math.floor(Math.random() * 3) + 1;
                            if(vm.survivalChance === 1){
                                vm.resources.food += 10;
                                vm.reward = "into a fight with bear. You were able to kill it and take home a good supply of food. Good thing you had that bow and arrow"
                                return vm.reward;
                            }
                            else{
                                vm.villagerKilled = vm.resources.villagers.splice(-1);
                                vm.resources.houses--;
                                vm.reward = `${vm.villagerKilled} was killed by a bear.. your large wood sword failed to protect you`;
                                return vm.reward;
                            }
                        }
                        else if(vm.resources.spear >= 1){
                            vm.survivalChance = Math.floor(Math.random() * 4) + 1;
                            if(vm.survivalChance === 1){
                                vm.resources.food += 10;
                                vm.reward = "into a fight with bear. You were able to kill it and take home a good supply of food. Good thing you had that spear"
                                return vm.reward;
                            }
                            else{
                                vm.villagerKilled = vm.resources.villagers.splice(-1);
                                vm.resources.houses--;
                                vm.reward = `${vm.villagerKilled} was killed by a bear.. your large wood sword failed to protect you`;
                                return vm.reward;
                            }
                        }
                        else if(vm.resources.woodSwords >= 1){
                            vm.survivalChance = Math.floor(Math.random() * 5) + 1;
                            if(vm.survivalChance === 1){
                                vm.resources.food += 10;
                                vm.reward = "into a fight with bear. You were able to kill it and take home a good supply of food. Good thing you had that wood sword"
                                return vm.reward;
                            }
                            else{
                                vm.villagerKilled = vm.resources.villagers.splice(-1);
                                vm.resources.houses--;
                                vm.reward = `${vm.villagerKilled} was killed by a bear.. your large wood sword failed to protect you`;
                                return vm.reward;
                            }
                        }
                        else if(vm.resources.sticks >= 1){
                            vm.survivalChance = Math.floor(Math.random() * 8) + 1;
                            if(vm.survivalChance === 1){
                                vm.resources.food += 10;
                                vm.reward = "into a fight with bear. You were able to kill it and take home a good supply of food. Good thing you had that sharp stick"
                                return vm.reward;
                            }
                            else{
                                vm.villagerKilled = vm.resources.villagers.splice(-1);
                                vm.resources.houses--;
                                vm.reward = `${vm.villagerKilled} was killed by a bear.. your large wood sword failed to protect you`;
                                return vm.reward;
                            }
                        }
                    }
                    else{
                        vm.villagerKilled = vm.resources.villagers.splice(-1);
                        vm.resources.houses--;
                        vm.reward = `${vm.villagerKilled} was killed by a bear`;
                    }
                        vm.choiceChosen = choice;
                        return vm.choiceChosen,
                            vm.reward
                    }
            }
            else if(choice === "build a weapon"){
                vm.x = Math.floor(Math.random() * 4) + 1;
                console.log(vm.x);
                if(vm.resources.wood >= 3 && vm.x === 0){
                    vm.resources.bows++;
                    vm.resources.wood -= 3;
                    vm.resources.weapons++;
                    vm.reward = "a bow and some arrows";

                    vm.choiceChosen = choice;
                    return vm.choiceChosen,
                        vm.reward; 
                }
                else if(vm.resources.wood >= 3 && vm.x === 1){
                    vm.resources.woodSwords++;
                    vm.resources.wood -= 3;
                    vm.resources.weapons++;
                    vm.reward = "a basic wood sword";

                    vm.choiceChosen = choice;
                    return vm.choiceChosen,
                        vm.reward;
                }
                else if(vm.resources.wood >= 3 && vm.x === 2){
                    vm.resources.largeWSword++;
                    vm.resources.wood -= 3;
                    vm.resources.weapons++;
                    vm.reward = "a large wood sword";

                    vm.choiceChosen = choice;
                    return vm.choiceChosen,
                        vm.reward;
                }
                else if(vm.resources.wood >= 3 && vm.x === 3){
                    vm.resources.sticks++;
                    vm.resources.wood -= 3;
                    vm.resources.weapons++;
                    vm.reward = "a sharp stick";

                    vm.choiceChosen = choice;
                    return vm.choiceChosen,
                        vm.reward;
                }
                else if(vm.resources.wood >= 3 && vm.x === 4){
                    vm.resources.spears++;
                    vm.resources.wood -= 3;
                    vm.resources.weapons++;
                    vm.reward = "a wood spear";

                    vm.choiceChosen = choice;
                    return vm.choiceChosen,
                        vm.reward;
                }
            }
        }

        vm.choiceHandler = function(){
            return vm.choiceChosen;
        }

        vm.choiceRewards = function(){
            if(vm.choiceChosen === "get wood"){
                vm.reward = vm.woodGathered;
                return vm.reward;
            }
            else if(vm.choiceChosen === "get food"){
                vm.reward = vm.foodGathered
                return vm.reward;
            }
            else if(vm.choiceChosen === "get water"){
                vm.reward = vm.waterGathered;
                return vm.reward;
            }
            else if(vm.choiceChosen === "build a house"){
                vm.reward = "got a new villager";
                return vm.reward;
            }
            else if(vm.choiceChosen === "build a well"){
                vm.reward = "gained 1 passive water per turn";
                return vm.reward;
            }
            else if(vm.choiceChosen === "explore"){
                return vm.reward;
            }
            else if(vm.choiceChosen === "build a weapon"){
                return vm.reward;
            }
        }
    }
    
    angular
        .module("game")
        .service("gameService", gameService)
}