let username = null;

// angular
let app = angular.module("app", []);
app.controller("msgListCtrl", function($scope){
    $scope.users = [];
});

//socket.io
let socket = io();

$("#msg-input").keydown(function(event){
    if(event.keyCode == 13){
        sendMsg($(this));
    }
});

$("#msg-sendbtn").click(function(event){
    sendMsg($("#msg-input"));
});

function sendMsg($inputElem){
    let msg = $inputElem.val();
    if(msg == "") return;
    if(username == null){
        username = msg;
        $("#username").text(msg);
    }
    socket.send(msg);
    $inputElem.val("");
}

socket.on("message", function(msg){
    let $elem = angular.element('[ng-controller=msgListCtrl]');
    let $scope = $elem.scope();
    $scope.users.push(msg);
    $scope.$apply();

    // scroll to the end of message list
    let liElem = $("#msg-list").children().last().get(0);
    liElem.scrollIntoView({block: "end", behavior: "smooth"});
    
});