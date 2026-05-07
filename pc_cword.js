"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 3

   Crossword Puzzle Script
   
   Author: Craig Adamson
   Date:   5/7/2026
   
   Global Variables
   ================
   allLetters
      References all of the letter cells in the crossword table#crossword
   
   currentLetter
      References the letter currently selected in the puzzleLetter
      
   wordLetters
      References the across and down letters in the word(s) associated with the current letter
   
   acrossClue
      References the across clue associated with the current letter
      
   downClue
      References the down clue associated with the current letter
      
         
   Functions
   =========
   
   init()
      Initializes the puzzle, setting up the event handlers and the variable values
       
   formatPuzzle(puzzleLetter)
      Formats the appearance of the puzzle given the selected puzzle letter
      
   selectLetter(e)
      Applies keyboard actions to select a letter or modify the puzzle navigation
      
   switchTypeDirection()
      Toggles the typing direction between right and down
      
   getChar(keyNum)
      Returns the text character associated with the key code value, keyNum


*/


// Global variables
var allLetters;
var currentLetter;
var wordLetters;
var acrossClue;
var downClue;
var typeDirection = "right";

// Run init function when page loads
window.onload = init;

function init() {
   // Reference all crossword puzzle letters
   allLetters = document.querySelectorAll("table#crossword span");

   // Select the first letter in the puzzle
   currentLetter = allLetters[0];

   // Get the first letter's across and down clue IDs
   var acrossID = currentLetter.dataset.clueA;
   var downID = currentLetter.dataset.clueD;

   // Reference the across and down clues
   acrossClue = document.getElementById(acrossID);
   downClue = document.getElementById(downID);

   // Format the first selected letter
   formatPuzzle(currentLetter);

   // Allow users to select letters with the mouse
   for (var i = 0; i < allLetters.length; i++) {
      allLetters[i].style.cursor = "pointer";

      allLetters[i].onmousedown = function(e) {
         formatPuzzle(e.target);
      };
   }

   // Allow keyboard navigation and typing
   document.onkeydown = selectLetter;

   // Set up typing direction image
   var typeImage = document.getElementById("directionImg");
   typeImage.style.cursor = "pointer";
   typeImage.onclick = switchTypeDirection;

   // Show user errors
   document.getElementById("showErrors").onclick = function() {
      for (var i = 0; i < allLetters.length; i++) {
         if (allLetters[i].textContent !== allLetters[i].dataset.letter) {
            allLetters[i].style.color = "red";
         }
      }

      setTimeout(function() {
         for (var i = 0; i < allLetters.length; i++) {
            allLetters[i].style.color = "";
         }
      }, 3000);
   };

   // Show puzzle solution
   document.getElementById("showSolution").onclick = function() {
      for (var i = 0; i < allLetters.length; i++) {
         allLetters[i].textContent = allLetters[i].dataset.letter;
      }
   };
}

function formatPuzzle(puzzleLetter) {
   // Update the current selected letter
   currentLetter = puzzleLetter;

   // Remove background colors from all letters
   for (var i = 0; i < allLetters.length; i++) {
      allLetters[i].style.backgroundColor = "";
   }

   // Remove clue highlighting
   if (acrossClue) {
      acrossClue.style.color = "";
   }

   if (downClue) {
      downClue.style.color = "";
   }

   // Highlight the across clue and across letters
   if (currentLetter.dataset.clueA !== undefined) {
      acrossClue = document.getElementById(currentLetter.dataset.clueA);
      acrossClue.style.color = "blue";

      wordLetters = document.querySelectorAll(
         "[data-clue-a='" + currentLetter.dataset.clueA + "']"
      );

      for (var i = 0; i < wordLetters.length; i++) {
         wordLetters[i].style.backgroundColor = "rgb(231, 231, 255)";
      }
   }

   // Highlight the down clue and down letters
   if (currentLetter.dataset.clueD !== undefined) {
      downClue = document.getElementById(currentLetter.dataset.clueD);
      downClue.style.color = "red";

      wordLetters = document.querySelectorAll(
         "[data-clue-d='" + currentLetter.dataset.clueD + "']"
      );

      for (var i = 0; i < wordLetters.length; i++) {
         wordLetters[i].style.backgroundColor = "rgb(255, 231, 231)";
      }
   }

   // Highlight the active letter based on typing direction
   if (typeDirection === "right") {
      currentLetter.style.backgroundColor = "rgb(191, 191, 255)";
   } else {
      currentLetter.style.backgroundColor = "rgb(255, 191, 191)";
   }
}

function selectLetter(e) {
   // Reference neighboring letters
   var leftLetter = document.getElementById(currentLetter.dataset.left);
   var upLetter = document.getElementById(currentLetter.dataset.up);
   var rightLetter = document.getElementById(currentLetter.dataset.right);
   var downLetter = document.getElementById(currentLetter.dataset.down);

   // Get the key code
   var userKey = e.keyCode;

   if (userKey === 37 && leftLetter) {
      formatPuzzle(leftLetter);
   } else if (userKey === 38 && upLetter) {
      formatPuzzle(upLetter);
   } else if ((userKey === 39 || userKey === 9) && rightLetter) {
      formatPuzzle(rightLetter);
   } else if ((userKey === 40 || userKey === 13) && downLetter) {
      formatPuzzle(downLetter);
   } else if (userKey === 8 || userKey === 46) {
      currentLetter.textContent = "";
   } else if (userKey === 32) {
      switchTypeDirection();
   } else if (userKey >= 65 && userKey <= 90) {
      currentLetter.textContent = getChar(userKey);

      if (typeDirection === "right" && rightLetter) {
         formatPuzzle(rightLetter);
      } else if (typeDirection === "down" && downLetter) {
         formatPuzzle(downLetter);
      }
   }

   // Prevent browser default key actions
   e.preventDefault();
}

function switchTypeDirection() {
   // Reference the direction image
   var typeImage = document.getElementById("directionImg");

   // Toggle typing direction
   if (typeDirection === "right") {
      typeDirection = "down";
      typeImage.src = "pc_right.png";
      currentLetter.style.backgroundColor = "rgb(255, 191, 191)";
   } else {
      typeDirection = "right";
      typeImage.src = "pc_down.png";
      currentLetter.style.backgroundColor = "rgb(191, 191, 255)";
   }
}

/*====================================================*/

function getChar(keyNum) {
   return String.fromCharCode(keyNum);
}
