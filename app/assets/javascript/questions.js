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
    let $questions = $('.wrapquestion .custom-range')
    for (i = 0; i < $questions.length; i++) {
        scores.push($questions[i].value);
    };

    // Initiate newFriend object via createFriend constructor
    var newFriend = new createFriend(name, photo, scores);

    // Now Post successfully instantiated friend to API

    $.post("/api/friends", newFriend, (data) => {
            //Calling selectors
            let $matchName = $("#match-name");
            let $matchImg = $("#match-img");
            let $resultsModal = $("#results-modal");

            // If response returns true, post has succeeded
            if (data) {
                // Collect result from the AJAX post to show users name and profile img were received
                $matchName.text(data.name);
                $matchImg.attr("src", data.photo);

                // Display the best match modal
                $resultsModal.modal("toggle");
            }
        });//End callback fct
});//End API POST req