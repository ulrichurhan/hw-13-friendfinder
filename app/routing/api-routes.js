// var friends = require("../data/friends.js");
var friends = [
    {
        "name":"Keanu Reeves",
        "photo":"https://www.myagecalculator.com/images/keanu-reeves.jpg",
        "scores":[5,1,4,4,5,1,2,5,4,1]
    },
    {
        "name":"Robbie Williams",
        "photo":"https://www.myagecalculator.com/images/robbie-williams.jpg",
        "scores":[1,5,3,4,1,5,5,2,3,2]
    },
    {
        "name":"Emmanuelle Chriqui",
        "photo":"https://www.myagecalculator.com/images/emmanuelle-chriqui.jpg",
        "scores":[3,2,3,5,1,3,2,5,4,2]
    },
    {
        "name":"Lucy Liu",
        "photo":"https://https://www.myagecalculator.com/images/lucy-liu.jpg",
        "scores":[2,1,3,4,5,2,3,5,1,1]
    },
    {
        "name":"Shailene Woodley",
        "photo":"https://www.myagecalculator.com/images/shailene-woodley.jpg",
        "scores":[2,5,2,4,3,5,3,2,5,2]
    },
    {
        "name":"Bruce Lee",
        "photo":"https://www.myagecalculator.com/images/bruce-lee.jpg",
        "scores":[5,1,4,2,3,5,3,2,1,3]
    },
    {
        "name":"Winona Ryder",
        "photo":"https://www.myagecalculator.com/images/winona-ryder.jpg",
        "scores":[5,4,3,2,1,1,2,3,4,5]
    },
    {
        "name":"George Clooney",
        "photo":"https://www.myagecalculator.com/images/george-clooney.jpg",
        "scores":[1,3,5,2,4,1,4,2,2,2]
    },
    {
        "name":"Blake Lively",
        "photo":"https://www.myagecalculator.com/images/blake-lively.jpg",
        "scores":[2,5,3,5,2,3,4,5,4,3]
    }
];

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        console.log(friends);
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        var totalDifference = 0;
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };
        var userData = req.body;
        var userName = userData.name;
        var userScores = userData.scores;

        var b = userScores.map(function(item) {
            return parseInt(item, 10);
        });
        userData = {
            name: req.body.name, 
            photo: req.body.photo,
            scores: b
        };
        console.log("Name: " + userName);
        console.log("User scores: " + userScores);

        var sum = b.reduce((a,b) => a + b ,0);
        console.log("Sum of users score: " + sum);
        console.log("Best match friend diff: " + bestMatch.friendDifference);
        console.log("+++---+++---+++");
        console.log("Friends Length: " + friends.length);
        // console.log("Friend Name 0: " + friends[0].name);

        for (var i=0; i < friends.length; i++) {
            console.log(friends[i].name);
            totalDifference = 0;
            console.log("Total Diff: " + totalDifference);
            console.log("Best match friend diff: " + bestMatch.friendDifference);

            var bfriendScore = friends[i].scores.reduce((a,b) => a + b, 0);
            console.log("Total friend score: " + bfriendScore);
            totalDifference += Math.abs(sum - bfriendScore);
            console.log("+++---+++---+++---> " + totalDifference);

            if (totalDifference <= bestMatch.friendDifference) {
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDifference = totalDifference;
            }

            console.log(totalDifference + " Total Difference");
        }

        console.log(bestMatch);
        // friends.push(userData);
        // console.log("New User added");
        console.log(userData);
        res.json(bestMatch);

    });

};