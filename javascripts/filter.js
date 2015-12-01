define(["jquery", "lodash", "firebase-get-ajax"], function($, _, firebaseGetAjax) {
  return function(uid) {

// promise that gets uid's movies from firebase via log-in
  	firebaseGetAjax(uid).then(function (movies) {

// // initially populates page once you log in (this version is not alphabetized currently, but doesn't rewrite each time the value changes in firebase)
// 	      require(['hbs!../templates/unadded-poster'], function (handlebars) {
// 	        $("#home-page .row").html(handlebars({movie: movies}));
// 	      });


			var read = false;

  		// snapshot
      // var ref = new Firebase("https://originalidea.firebaseio.com/userprofiles/" + uid + "/movies/");
      var ref = new Firebase("https://originalidea.firebaseio.com/userprofiles");
      console.log("ref", ref);
      // console.log("ref.movies", ref.movies);
      ref.child(uid).on("value", function(snapshot) { 

// creates object of stored firebase movies
        var firebaseMoviesObject = snapshot.child("movies").val();


	  		var unwatchedMovies =[];
	  		var watchedMovies = [];
	  		var favoriteMovies = [];
	  		var favoriteMovies1 = [];
	  		var favoriteMovies2 = [];
  			var favoriteMovies3 = [];
  			var favoriteMovies4 = [];
  			var favoriteMovies5 = [];
  			var favoriteMovies6 = [];
  			var favoriteMovies7 = [];
  			var favoriteMovies8 = [];
  			var favoriteMovies9 = [];
  			var favoriteMovies10 = [];

	  		console.log("movies from filter, gets info from firebaseGetAjax", movies);
	  		console.log("movies from filter, but from snapshot", firebaseMoviesObject);

	// turns object of objects into array of objects
	  		var firebaseMoviesArray = $.map(firebaseMoviesObject, function(el) { return el; });
	  		console.log("firebaseMoviesArray", firebaseMoviesArray);

	// sort by Title function
	        function compare(a,b) {
	          if (a.Title < b.Title)
	            return -1;
	          if (a.Title > b.Title)
	            return 1;
	          return 0;
	        }

	// sorts firebase movies by Title key, alphabetizes them
	        var alphaFirebaseMovies = firebaseMoviesArray.sort(compare);
	        var initialPop = alphaFirebaseMovies;
	        console.log("alphaFirebaseMovies", alphaFirebaseMovies);
	        console.log("initialPop", initialPop);

	// loops over alphabetized firebase movies and if Poster is "N/A", sets it to false.  it does this so handlebars will recognize it
	        for (var k = 0; k < alphaFirebaseMovies.length; k++) {
	          if (alphaFirebaseMovies[k].Poster === "N/A") {
	            alphaFirebaseMovies[k].Poster = false;
	            console.log("poster is false", alphaFirebaseMovies[k]);
	          }
	        }

	// loops over alphabetized firebase movies and pushes unwatched movies and watched movies into separate arrays
	        for (var i = 0; i < alphaFirebaseMovies.length; i++) {
	        	if (alphaFirebaseMovies[i].watched === false) {
	        		unwatchedMovies.push(alphaFirebaseMovies[i]);
	        	} else if (alphaFirebaseMovies[i].watched === true) {
	        		watchedMovies.push(alphaFirebaseMovies[i]);
	        	} 
	        }

	// loops over alphabetized firebase movies and pushes movies with a rating of 0-10 into corresponding favorite movies arrays
	        for (var j = 0; j < alphaFirebaseMovies.length; j++) {
	        	if (alphaFirebaseMovies[j].rating > 0) {
	        		favoriteMovies.push(alphaFirebaseMovies[j]);
	        	}
	        	var rating = alphaFirebaseMovies[j].rating;
				// console.log("rating", rating);
				switch (rating) { 
					case 1: console.log("switch rating 1!"); 
							favoriteMovies1.push(alphaFirebaseMovies[j]);
						break;
					case 2: console.log("switch rating 2!"); 
							favoriteMovies2.push(alphaFirebaseMovies[j]);
						break;
					case 3: console.log("switch rating 3!"); 
							favoriteMovies3.push(alphaFirebaseMovies[j]);
						break;
					case 4: console.log("switch rating 4!"); 
							favoriteMovies4.push(alphaFirebaseMovies[j]);
						break;
					case 5: console.log("switch rating 5!"); 
							favoriteMovies5.push(alphaFirebaseMovies[j]);
						break;
					case 6: console.log("switch rating 6!");
							favoriteMovies6.push(alphaFirebaseMovies[j]);
						break;
					case 7: console.log("switch rating 7!"); 
							favoriteMovies7.push(alphaFirebaseMovies[j]);
						break;
					case 8: console.log("switch rating 8!"); 
							favoriteMovies8.push(alphaFirebaseMovies[j]);
						break;
					case 9: console.log("switch rating 9!");  
							favoriteMovies9.push(alphaFirebaseMovies[j]);
						break;
					case 10: console.log("switch rating 10!");
							favoriteMovies10.push(alphaFirebaseMovies[j]);
						break;
					// default: console.log(""); 
				} 	
	        }

	        console.log("unwatchedMovies", unwatchedMovies);
	        console.log("watchedMovies", watchedMovies);
	        console.log("favoriteMovies", favoriteMovies);


	// initially populates page once you log in (i do it here to alphabetize it)
	// right now i'm testing this if statement
				if (read === false) {
		      require(['hbs!../templates/unadded-poster'], function (handlebars) {
		        $("#home-page .row").html(handlebars({movie: initialPop}));
		        read = true;
		      });
				}

	// click All button to display all firebase movies
				$("#allButton").click(function () {
				  require(['hbs!../templates/unadded-poster'], function (handlebars) {
				    $("#home-page .row").html(handlebars({movie: alphaFirebaseMovies}));
				  });
				});

	// click Unwatched button to display unwatched firebase movies
				$("#unwatchedButton").click(function () {
				  require(['hbs!../templates/unadded-poster'], function (handlebars) {
				    $("#home-page .row").html(handlebars({movie: unwatchedMovies}));
				  });
				});

	// click Watched button to display watched firebase movies
				$("#watchedButton").click(function () {
				  require(['hbs!../templates/unadded-poster'], function (handlebars) {
				    $("#home-page .row").html(handlebars({movie: watchedMovies}));
				  });
				});

	// click Favorites slider to display favorites firebase movies with rating of 0-10
	// RED NOTES:
	// SWITCH STATEMENT WOULD NOT WORK
	// === WOULD NOT WORK -- HAS TO BE ==
				$("#favoritesSlider").click(function () {
					var sliderValue = favoritesSlider.value;
					// console.log("favoritesSlider is", sliderValue);
					if (sliderValue == 0) {
				    require(['hbs!../templates/unadded-poster'], function (handlebars) {
				    $("#home-page .row").html(handlebars({movie: favoriteMovies}));
				  })
				}
					if (sliderValue == 1) {
				    require(['hbs!../templates/unadded-poster'], function (handlebars) {
				    $("#home-page .row").html(handlebars({movie: favoriteMovies1}));
				  })
				}
					if (sliderValue == 2) {
				    require(['hbs!../templates/unadded-poster'], function (handlebars) {
				    $("#home-page .row").html(handlebars({movie: favoriteMovies2}));
				  })
				}
					if (sliderValue == 3) {
				    require(['hbs!../templates/unadded-poster'], function (handlebars) {
				    $("#home-page .row").html(handlebars({movie: favoriteMovies3}));
				  })
				}
					if (sliderValue == 4) {
				    require(['hbs!../templates/unadded-poster'], function (handlebars) {
				    $("#home-page .row").html(handlebars({movie: favoriteMovies4}));
				  })
				}
					if (sliderValue == 5) {
				    require(['hbs!../templates/unadded-poster'], function (handlebars) {
				    $("#home-page .row").html(handlebars({movie: favoriteMovies5}));
				  })
				}
					if (sliderValue == 6) {
				    require(['hbs!../templates/unadded-poster'], function (handlebars) {
				    $("#home-page .row").html(handlebars({movie: favoriteMovies6}));
				  })
				}
					if (sliderValue == 7) {
				    require(['hbs!../templates/unadded-poster'], function (handlebars) {
				    $("#home-page .row").html(handlebars({movie: favoriteMovies7}));
				  })
				}
					if (sliderValue == 8) {
				    require(['hbs!../templates/unadded-poster'], function (handlebars) {
				    $("#home-page .row").html(handlebars({movie: favoriteMovies8}));
				  })
				}
					if (sliderValue == 9) {
				    require(['hbs!../templates/unadded-poster'], function (handlebars) {
				    $("#home-page .row").html(handlebars({movie: favoriteMovies9}));
				  })
				}
					if (sliderValue == 10) {
				    require(['hbs!../templates/unadded-poster'], function (handlebars) {
				    $("#home-page .row").html(handlebars({movie: favoriteMovies10}));
				  })
				}

				});



				// switch (sliderValue) { 
				// 	case 1: console.log("case 1!"); 

				// 		break;
				// 	case 2: console.log("case 2!"); 
							
				// 		break;
				// 	case 3: console.log("case 3!"); 
							
				// 		break;
				// 	case 4: console.log("case 4!"); 
							
				// 		break;
				// 	case 5: console.log("case 5!"); 
							
				// 		break;
				// 	case 6: console.log("case 6!");
							 
				// 		break;
				// 	case 7: console.log("case 7!"); 
							
				// 		break;
				// 	case 8: console.log("case 8!"); 
							
				// 		break;
				// 	case 9: console.log("case 9!");  
							
				// 		break;
				// 	case 10: console.log("case 10!");
							
				// 		break;
				// 	// default: console.log(""); 
				// };


      });
  	});
  }
});