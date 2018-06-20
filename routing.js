"use strict";
{
    angular
      .module("game")
      .config(($routeProvider) => {
        $routeProvider
          .when("/gameStart", {
            template: "<game-start></game-start>"
          })
          .when("/gameplay", {
            template: "<gameplay></gameplay>"
          })
          .when("/yourMove", {
            template: "<your-move></your-move>"
          })
          .when("/createNewVillager", {
            template: "<create-new-villager></create-new-villager>"
          })
          .otherwise({ redirectTo: "/gameStart" })
      });
  }