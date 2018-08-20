//Executed on submition of form in

$("#submit").on("click", function (event) {

    event.preventDefault();

    function createFriend(name, photo, scores) {
        this.name = name;
        this.photo = photo;
        this.scores = scores
    }

    // collect img and name of new user
    let photo = $('#photo').val().trim();
    let name = $('#name').val().trim();

    //Data validation to prevent incomplete submition
    if (photo == "" || name == "" ) {
        alert("Please provide your name and a profile picture to use.");
        return false
    }

    // Extract all answers from questionaire and push them to scores array
    let scores = [];
    let questions = $('.wrapquestion .custom-range')
    for (i = 0; i < questions.length; i++) {
        scores.push(questions[i].value);
    };

    // Initiate newFriend object via createFriend constructor
    var newFriend = new createFriend(name, photo, scores);

    // post the successfully validated request to server

    $.post("/api/friends", newFriend,
        function (data) {

            // response receive as true, we are successful.
            if (data) {
                // Grab the result from the AJAX post to show match's name and photo are displayed.
                $("#match-name").text(data.name);
                $("#match-img").attr("src", data.photo);

                // Show the modal with the best match
                $("#results-modal").modal("toggle");
            }

        });

});