"use strict";
{
    let yourMove ={

        template: `<p>You decided to {{$ctrl.choice}} and got {{$ctrl.rewards}}.</p>
        

        <a href=#!/gameplay><button ng-click="$ctrl.dailyLosses(); $ctrl.checkPlayerLoss()">Continue</button></a>
        `,
        controller: function(gameService){
            let vm = this;
            vm.choice = gameService.choiceHandler();
            vm.rewards = gameService.choiceRewards();

            vm.dailyLosses = function(){
                gameService.actionsChecker();
                vm.resources = gameService.setValues();
            }

            vm.checkPlayerLoss = function(){
                gameService.checkLoss();
                vm.resources = gameService.setValues();
            }
        }
    };

    yourMove.$inject = ["gameService"];


    angular
        .module("game")
        .component("yourMove", yourMove);
}