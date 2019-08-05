 $(function() {
     // Initial array of animals
     let animals = ["Bunny", "Cat", "Chinchilla", "Dog", "Ferret", "Guinea Pig", "Hampster", "Mouse", "Parakeet", "Sugar Glider"];

     // displayAnimalInfo function re-renders the HTML to display the appropriate content
     function displayAnimalInfo() {

         let animal = $(this).attr("data-name");

         let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal +
             "&api_key=5So5epfwI3dmGtCmgCN4TrUfMj17TtiA&limit=10";

         // Creating an AJAX call for the specific animal button being clicked
         $.ajax({
             url: queryURL,
             method: "GET"
         }).then(function(response) {

             // Retrieving the URL for the image
             let data = response.data;
             $("#animal-view").empty();
             console.log(data);

             for (let index in data) {
                 let gifObject = data[index];
                 let gifUrl = gifObject.images.original.url;
                 let imageUrl = gifObject.images.original_still.url;
                 let rating = gifObject.rating;
                 let title = gifObject.title;

                 // Div to hold the animal
                 let animalDiv = $("<div class='animal'>");

                 // Creating a heading to display the title
                 let pOne = $("<h4>").text(title);

                 // Creating an element to display the rating
                 let pTwo = $("<p>").text("Rating: " + rating.toUpperCase());

                 // Creating opening element tag for jQuery function
                 let image = $("<img>");
                 image.addClass('displayGiphy');
                 image.attr("src", imageUrl)
                     .attr("alt", 'random placeholder');
                 image.attr("gif-src", gifUrl);

                 // Diplaying the title
                 animalDiv.append(pOne);

                 // Appending the gif
                 animalDiv.append(image);

                 // Displaying the rating
                 animalDiv.append(pTwo);

                 // Placing the animal above the previous animals
                 $("#animal-view").prepend(animalDiv);
             }

         });
     }

     // Function for displaying animal data
     function renderButtons() {

         // Deleting the animals prior to adding new animals
         // (this is necessary otherwise you will have repeat buttons)
         $("#buttons-view").empty();

         // Looping through the array of animals
         for (let i = 0; i < animals.length; i++) {

             // Then dynamicaly generating buttons for each animal in the array
             // This code $("<button>") is all jQuery needs to create the beginning and end button tags.
             let a = $("<button>");
             // Adding a class of animal-btn to our button
             a.addClass("animal-btn");
             // Adding a data-attribute
             a.attr("data-name", animals[i]);
             // Providing the initial button text
             a.text(animals[i]);
             // Adding the button to the buttons-view div
             $("#buttons-view").append(a);
         }
     }

     // This function handles events where an animal button is clicked
     $("#add-animal").on("click", function(event) {
         event.preventDefault();
         // Gets input from textbox
         let animal = $("#animal-input").val().trim();

         // Add animal from textbox to array
         animals.push(animal);

         // Call renderButtons to handle processing of animal array
         renderButtons();

         // Clear field after value is gathered
         $('#animal-input').val('');

     });

     // Adding a click event listener to all elements with a class of "animal-btn"
     $(document).on("click", ".animal-btn", displayAnimalInfo);

     // Calling the renderButtons function to display the initial buttons
     renderButtons();

     $(document).on("click", ".displayGiphy", function(event) {
         // Need jQuery object of 'this'
         let $this = $(this);

         // Retrieve attribute values with jQuery helper methods
         let currentSrc = $this.attr('src');
         let secondarySrc = $this.attr('gif-src');

         // Swap values of attributes with jQuery
         $this.attr('src', secondarySrc)
             .attr('gif-src', currentSrc)
     });
 });