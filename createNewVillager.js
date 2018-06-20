"use strict";
{
    let createNewVillager = {
        template: `<p>You decided to {{$ctrl.choice}} and {{$ctrl.rewards}}.
        <br>
        <input type="text" placeholder="Name your villager" ng-model="villagerName" />
        <a href=#!/gameplay><button ng-click="$ctrl.newPerson(villagerName); $ctrl.apChecker(); $ctrl.dailyLosses(); $ctrl.winChecker(); $ctrl.lostYet()">Name Villager</button></a>
        `,
        controller: function(gameService){
            let vm = this;
            vm.newPerson = function (villagerName) {
                gameService.addPerson(villagerName);
                vm.resources = gameService.setValues();
            };

            vm.choice = gameService.choiceHandler();
            vm.rewards = gameService.choiceRewards();

            vm.apChecker = function(){
                gameService.actionPrice();
            }

            vm.dailyLosses = function(){
                gameService.actionsChecker();
                vm.resources = gameService.setValues();
            }

            vm.winChecker = function(){
                gameService.checkWin();
            }

            vm.lostYet = function(){
                gameService.checkLoss();
            }
            
        }
    }

    createNewVillager.$inject = ["gameService"];

    angular
        .module("game")
        .component("createNewVillager", createNewVillager);
}