"use strict";
{
    let gameplay = {
        templateUrl: "gameView.html",
        controller: function(gameService){
            let vm = this;

            vm.resources = gameService.setValues();
            
            vm.choiceSelect = function(choice){
                gameService.thisTurn(choice);
                vm.resources = gameService.setValues(); 
            }

            vm.minusOneAction = function(){
                gameService.actionPrice();
                vm.resources = gameService.setValues();
            }

        }   
    };

    gameplay.$inject = ["gameService"];

    angular
        .module("game")
        .component("gameplay", gameplay)
}