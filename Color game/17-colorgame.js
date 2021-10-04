// The way to win this game is to do clicked color=picked color.

// rgb(1,112,146) awesome color
// rgb(248,61,91) awesome color
// rgb(3,98,171)  awesome color

var numSquares=6
var colors=[];
var pickedColor=pickColor();

// select all squares
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay=document.getElementById("message")
var h1=document.querySelector("h1")
var resetButton=document.querySelector("#reset")
var modeButtons=document.querySelectorAll(".mode")

init();


// Code to run when the page first loads
function init()
{
	setupModeButtons();
	setupSquares();
	reset(); // now we are calling reset for actual when the page loads. it is not inside an event listener
	// so it will execute as soon as the page loads.
}

function setupModeButtons()
{
	//mode buttons-easy hard
	for (var i=0; i<modeButtons.length; i++)
	{
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected")
			modeButtons[1].classList.remove("selected")
			this.classList.add("selected")
			// ternary operator if easy then 3 squares else 6 squares
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset(); // we are adding reset in event listener so executes 
			// only when easy or hard button is clicked. Does not execute when the page loads. When the page
			// loads, it Just sets up to run when the mode buttons are clicked.
		})
	}
}

function setupSquares()
{
	for(var i = 0; i < squares.length; i++)
	{
	// add click listeners to squares to assign colors to each square
	// Initially the for loop will add the event listener to each of the sqaures. After exiting the loop, at any
	// time, a square is clicked, all code inside the below function will be executed at that moment again.
		squares[i].addEventListener("click", function()
		{
			// grab color of the clicked square
			var clickedColor=this.style.backgroundColor;  // this.style.backgroundColor="rgb(0,0,0)" -> it is string
			// compare grabbed color with picked color
			if(clickedColor===pickedColor)
			{
				h1.style.backgroundColor=pickedColor;
				messageDisplay.textContent="Correct!"
				changeColors(pickedColor)
				resetButton.textContent="Play again?"
			}
			else
			{
				// alert("Wrong color");
				this.style.backgroundColor="#232323"
				messageDisplay.textContent="Try again"
			}
		})
	}
}


// easyBtn.addEventListener("click", function(){
// 	numSquares=3
// 	easyBtn.classList.add("selected");
// 	hardBtn.classList.remove("selected");
// 	colors=generateRandomColors(numSquares);
// 	pickedColor=pickColor();
// 	colorDisplay.textContent=pickedColor

// 	for(var i = 0; i < colors.length; i++) // colors.length=3 now
// 	{
// 		// added colors to each of the squares
// 		squares[i].style.backgroundColor=colors[i];
// 	}

// 	// set remaining bottom three elements display as hidden
// 	for(var i = 3; i < squares.length; i++)
// 	{
// 		squares[i].style.display="none";
// 	}
// })
// hardBtn.addEventListener("click", function(){
// 	numSquares=6
// 	easyBtn.classList.remove("selected");
// 	hardBtn.classList.add("selected");
// 	colors=generateRandomColors(numSquares);
// 	pickedColor=pickColor();
// 	colorDisplay.textContent=pickedColor
// 	for(var i = 0; i < colors.length; i++) // colors.length=6 now
// 	{
// 		// added colors to each of the squares
// 		squares[i].style.backgroundColor=colors[i];
// 		squares[i].style.display="block";
// 	}
// })


// Reset generates a new game. It has to do three main tasks. Generate random colors and assign to array.
// Select picked color from the array. Change colors of sqaures to colors in the "colors" array
function reset()
{
	// Once reset/new colors is clicked, correct/play again is replaced with an empty string
	messageDisplay.textContent=""
	// Once new game has started new colors should be shown instead of play again, correct, ect.
	resetButton.textContent = "New Colors"
	// generate colors and assign
	colors=generateRandomColors(numSquares);
	// Select picked color from array
	pickedColor=pickColor();
	// Change heading display color to match picked color
	colorDisplay.textContent=pickedColor
	// Add colors of squares from "colors" array
	for(var i = 0; i < squares.length; i++)
	{
		if(colors[i]) // if colors array has 3 then on 4th index this will evaluate to false and will goto else
		{
			squares[i].style.display="block";
			squares[i].style.backgroundColor=colors[i];
		}
		else
			squares[i].style.display="none";
	}
	h1.style.backgroundColor="steelblue";

}

resetButton.addEventListener("click", function(){
	reset();
})

// Change all colors of all square to the clicked color because clicked color=picked color => you won
function changeColors(color){
	//loop through all squares
	for(var i = 0; i < squares.length; i++){
		//change each color to match given color because the color chosen is correct
		squares[i].style.backgroundColor = color;
	}
}

// Assign picked color to one of the colors from the "colors" array
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

// Fill the color array with num random colors
function generateRandomColors(num){
	//make an array
	var arr = []
	//repeat num times
	for(var i = 0; i < num; i++){
		//get random color and push into arr
		arr.push(randomColor())
	}
	//return that array
	return arr;
}

// generate a random color
function randomColor(){
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from  0 -255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from  0 -255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}