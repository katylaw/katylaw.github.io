// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen

(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.binding();
			this.paused = false;
     	this.guess = null;
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- http://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/codepen-logo.png"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "php",
			img: "http://s8.postimg.org/yd6xdvy2t/cat_1_1.png",
			id: 1,
		},
		{
			name: "css3",
			img: "http://www.butcherspetcare.com/img/porady/kot_4.png",
			id: 2
		},
		{
			name: "html5",
			img: "http://mvshospital.com/wp-content/uploads/revslider/homepage/cat.png",
			id: 3
		},
		{
			name: "jquery",
			img: "http://i1.wp.com/consciouscat.net/wp-content/uploads/2012/01/Mr.-Chewy-cat.png",
			id: 4
		}, 
		{
			name: "javascript",
			img: "http://pngimg.com/upload/cat_PNG118.png",
			id: 5
		},
		{
			name: "node",
			img: "http://www.pngall.com/wp-content/uploads/2016/03/Cat-PNG-2.png",
			id: 6
		},
		{
			name: "photoshop",
			img: "http://scisoc.org.au/wp-content/uploads/2010/07/cute-cat-wallpaper-1400x1050.png",
			id: 7
		},
		{
			name: "python",
			img: "http://www.cwbk.net/bloguploads/20150131/49843001422691269.jpg",
			id: 8
		},
		{
			name: "rails",
			img: "http://www.qugouhui.com/uploads/allimg/150411/1-150411111200209.jpg",
			id: 9
		},
		{
			name: "sass",
			img: "http://focus.hk.88db.com/wp-content/uploads/2013/10/lab_pup.jpg",
			id: 10
		},
		{
			name: "sublime",
			img: "http://www.lovethispic.com/uploaded_images/53451-Cute-Dog.jpg",
			id: 11
		},
		{
			name: "wordpress",
			img: "http://static.tumblr.com/20a4c8aee3d0537a2011b5c5b6ca1576/q1wef1u/Tb6nz6g97/tumblr_static_4as76szjpk6cc4wogoow0cw08.jpg",
			id: 12
		},
	];
    
	Memory.init(cards);


})();