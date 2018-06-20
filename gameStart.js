"use strict";
{
    let gameStart = {
        controller: function (gameService) {
            let vm = this;
            vm.cityName = function(villageName){
                gameService.setVillaName(villageName);
            }

            vm.newPerson = function (villagerName) {
                gameService.addPerson(villagerName);
                vm.resources = gameService.setValues();
            };
        },
        template: `<h3>To Play TommySim2.0 - Fill Out the Boxes Below</h3>
        <br>
        <div>
        <input type="text" placeholder="Name Your Village" ng-hide="vilName" ng-model="villageName" />
        <button ng-hide="vilName" ng-click="vilName=true; vName=true; $ctrl.cityName(villageName)">Name Your Village</button>
        <p ng-show="vName">Welcome to {{villageName}}</p>
        </div>
        <br>
        <div>
        <input ng-show="vName" type="text" placeholder="Name your villager" ng-model="villagerName" />
        <a href=#!/gameplay><button ng-show="vName" ng-click="pName=true; btn2=true; $ctrl.newPerson(villagerName)">Name Starting Villager</button></a>
        </div>
        `
    }

    gameStart.$inject = ["gameService"];

    angular
        .module("game")
        .component("gameStart", gameStart);
}