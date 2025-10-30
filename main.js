// initializing variables
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["sword"];

// Where selected choices will be stored
const pastChoices = new Set();

const choicesContainer = document.querySelector("#choicesContainer")
const chapterTitle = document.querySelector("#chapterTitle")
const text = document.querySelector("#text")
const xpText = document.querySelector("#xpText")
const healthText = document.querySelector("#healthText")
const goldText = document.querySelector("#goldText")
const monsterStats = document.querySelector("#monsterStats")
const monsterNameText = document.querySelector("#monsterNameText")
const monsterHealthText = document.querySelector("#monsterHealthText")

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Array for result of story choices
const storyChoices = [
    {
        name: "Chapter 1: Death House",
        "choice text": ["Talk with the children", "Observe the children", "Leave"],
        "choice functions": [talkWithChildren, observeTheChildren, leave],
        text: `You look around and notice that you are on a gravel road, surrounded by an eerie fog.
               The last thing you remember is going to bed after meeting a wandering fortune-teller.
               With nowhere else to go you begin trekking forward. Eventually, you see the signs of a village ahead.
               As you near the village you begin to feel...<em>strange</em>. You lose control of your body, a spectator to your own actions.
               You begin to hear the words of the old fortune-teller in your mind:
               <br><br>
               <span id="dmReading">The gravel road leads to a village, its tall houses dark as tombstones. Nesteled among these solemn dwellings a handful of closed-up shops.
               Even the tavern is shut tight. A soft whimpering draws your eye toward a pair of children standing in the middle of an otherwise lifeless street.
               </span>
               <br><br>
               <strong>Old Fortune-teller: </strong><em>Make your choice!</em>`
    },
    {
        name: "Talk with the Children",
        "choice text": ["Observe the children", "Observe your surroundings", "Leave"],
        "choice functions": [observeTheChildren, observeSurroundings, leave],
        text: `You decide to approach the children and begin to make your way towards them, while waving at them to get their attention. When they notice you the young woman begins to shush the young boy.
               After shushing him, the taller child, a girl by the looks of it, turns to you and, with a scared and quievering voice says,<br>
               <em>"There's a monster in our house!"</em><br>
               <br>
               She then points to a tall brick row house that has seen better days. Its windows are dark. It has a gated portico on the ground floor, and the rusty gate is slightly ajar.
               The houses on either side are abandoned, their windows and doors boarded up.`
    },
    {
        name: "Observe the Children",
        "choice text": ["Ask for more information", "Go inside the house", "Leave"],
        "choice functions": [askForInformation, goInHouse, leave],
        text: "You notice that the oldest of the two children, the young woman, is trying to hush the boy. He is weeping and clutching onto a stuffed doll. From what you can tell they seem to be siblings."
    },
    {
        name: "Observe surroundings",
        "choice text": ["Ask for more information", "Go inside the house", "Leave"],
        "choice functions": [askForInformation, goInHouse, leave],
        text: "Taking in your surroundings you notice the mist from earlier. You see tendrils of the mist slowly begin to coil towards you from afar. It begins to swallow the village house by house. Soon, you won't have much choice, but to seek refuge."
    },
    {
        name: "Ask for more information",
        "choice text": ["Go inside the house", "Leave"],
        "choice functions": [goInHouse, leave],
        text: `
              MC: <em>I need more information children. I have a few questions for you. First, what are your names?</em>
              <p>Older child: <em>I am Rosavalda Durst, I prefer Rose. Our parents name's are Gustav and Elizabeth Durst.</em></p>
              <p>Younger child: <em>And, I am Thornboldt Durst, Thorn for short.</em></p>
              <p>MC: <em>Rose and Thorn, how poetic. Well, Rose and Thorn, what does this monster look like and do you know exactly where it is? Where are your parents?</em></p>
              <p>Rose: <em>We're not sure what it looks like, but we hear terrible howling every night.</em></p>
              <p>Thorn: <em>Our parents are keeping it trapped in the basement right now. We're worried about our baby brother, Walter. He's still on the 3rd floor.</em></p>
              `
    },
    {
        name: "Go inside the house",
        "choice text": ["Walk to the entrance"],
        "choice functions": [entranceArea1A],
        text: "You chosen to go inside the house. You tell the children that if they weren't willing to go inside with you, to wait for them outside the house. You would check out the situation and hopefully resolve it."
    },
    {
        name: "Game Over",
        "choice text": ["Restart Game"],
        "choice functions": [restartGame],
        text: "You chose to leave the village, only to be consumed by the fog. Your journey ends here."
    }
];

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 1st Floor locations
const locations1F = [
    {
        name: "Entrance - Area 1A",
        "choice text": ["See if it's locked", "Turn around and leave"],
        "choice functions": [searchArea1A, leave],
        text: "A wrought-iron gate with hinges on one side and a lock on the other fills the archway of a stone portico."
    },
    {
        name: "Entrance - Area 1B",
        "choice text": ["Continue to Main Hall", "Search the foyer"],
        "choice functions": [mainHallArea2A, searchArea1B],
        text: "Oaken doors open into a grand foyer. At the end of the foyer are a set of mahoganey-framed double doors that lead into what appears to be a main hall."
    },
    {
        name: "Main Hall - Area 2A",
        "choice text": ["Search the main hall"],
        "choice functions": [searchArea2A],
        text: `A wide hall runs the width of the house, with a black marble fireplace at one end and a sweeping, red marble staircase at the other.
               Mounted on the wall above the fireplace is a longsword. The wood-paneled walls are ornately sculpted with images of vines, flowers, nymphs, and satyrs.
               The decorative paneling follows the staircase as it circles upward to the second floor.`
    },
    {
        name: "Main Hall - Area 2B",
        "choice text": ["Check First Door", "Check Second Door"],
        "choice functions": [denOfWolves, kitchenArea4A],
        text: "Opening the door reveals a cloakroom. It has several black cloaks hanging from hooks on the walls. A top hat sits on a high shelf."
    },
    {
        name: "Den of Wolves",
        "choice text": ["Search the room"],
        "choice functions": [searchArea3],
        text: `You notice a door close to the staircase. You decide to try the door and see if it's unlocked. You find that it opens without any trouble.
              Inside you find what appears to be a hunter's den with oak-panels. Mounted above the fireplace is a stag's head, and positioned around the
              outskirts of the room are three stuffed wolves. Two padded chairs draped in animal furs face the hearth, with an oak table between them supporting
              a cask of wine, two carved wooden goblets, a pipe rack, and a candelabrum. A chandelier hangs above a cloth-covered table surrounded by four chairs.
              Two cabinets stand against the walls.`
    },
    {
        name: "Kitchen - Area 4A",
        "choice text": ["Look in the pantry"],
        "choice functions": [kitchenArea4B],
        text: `You find 2 doors in a small hallway off to the south-east. Going inside the first door you find yourself in the kitchen. You notice how tidy it is,
              with dishware, cookware, and utensils neatly plaed on shelves. A worktable has a cutting board and rolling pin atop it. A stone, dome-shaped oven
              stands near the east wall, its ben iron stovepipe connecting to a hole in the ceiling. Behind the stove and to the left is a thin door. You can also
              see what appears to be a smaller and thinner door near the south-west corner of the kitchen.`
    },
    {
        name: "Kitchen - Area 4B",
        "choice text": ["Check Third Door", "Check the Final Door"],
        "choice functions": [diningRoom, diningRoom],
        text: `You finda a fully stocked pantry. Trying some of the food you find it to be bland.
              <br><br>
              <em>That's strange, it shouldn't taste like that at all</em>, you say as you check all the available food. Soon enough you have searched every inch of
              the pantry and head back out into the kitchen and through into the hallway.`
    },
    {
        name: "Dining Room - Area 5",
        "choice text": ["Search Room", "Exit Room"],
        "choice functions": [searchArea5, fightMonster],
        text: `As you walk through the door you notice that the room is in complete darkness. You try to go back through the door but it immediately shuts behind you with a loud
              <strong><em>slam</em><strong>, right before you're blinded by a bright light. It slowly dims down and you're able to see. The candles have in the room had lit up.
              The brightest light is coming from what appears to be a fireplace at one end of the room. Despite being able to see now the suddeness of it and the look of the flames,
              something is definitely wrong. The fire on the candles and fireplace that are bouncing off the chandelier in the middle of the ceiling, is a sickly blue-green.`
    },
    {
        name:"Main Hall - Chapter 1 End",
        "choice text": ["Chapter 1 End"],
        "choice functions": [restartGame],
        text: `You've searched every room on the main floor. You have yet to find any evidence of a monster. In fact, you failed to find any evidence that anyone currently
              lives here. Yes, the rooms are filled with all the trappings of a home lived in. The house is lit up and there's no dust. Yet, you feel no warmth. 
              No signs or sounds of people. No small amount of regret is starting to creep in. And, that relentless and pervaiding
              feeling of being watched, the feel of someone breathing down your neck. It's oppresive and weighs heavily on your shoulders. <br>
              You let out a breath and+e, "<em>I truly hope I can handle this on my own.</em>", you pray as you begin to climb the winding stairs.
              <strong>To be continued</strong>`
    }
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Array for Locations if they are searched.
const searchedLocations1F = [
    {
        name: "Entrance - Area 1A Searched",
        "choice text": ["Open Doors"],
        "choice functions": [entranceArea1B],
        text: "You notice the gate is unlocked and open it. The rusty hinges cause the gate to releae a loud <em>shriek</em> that cause you to flinch for a second. You notice oil lamps haanging from the portico ceiling flanking a set of oaken doors."
    },
    {
        name: "Entrance - Area 1B Searched",
        "choice text": ["Enter next area"],
        "choice functions": [mainHallArea2A],
        text: `Hanging on the south (right) wall of the foyer is a shield emblazoned with a coat-of-arms (a stylized golden windmill on a red field), flanked by
              framed portraits of stony-faced aristocrats (long-dead members of the durst family).`
    },
    {
        name: "Main Hall - Area 2A Searched",
        "choice text": ["Check Area 3", "Check Area 2B", "Check Area 4A"],
        "choice functions": [denOfWolves, mainHallArea2B, kitchenArea4A],
        text: `As you walk around the main hall you notice a door near the spiral staircase, two more doors down a small hallway and 2 doors across from the door you entered from.
               You decide to get a closer look at the flowers and nymphs on the paneling and notice something strange. Inconspicuously woven into the wall's design were serprents and skulls.`
    },
    {
        name: "Den of Wolves - Area 3 Searched",
        "choice text": ["Pick up weapon", "Pick up item", "Exit room"],
        "choice functions": [pickUpWeapon, pickUpMisc, fightMonster],
        text: `After searching the room you notice the east cabinet has a lock. It doesn't look too difficult to pick, so you do. Inside you find a hand crossbow and 20 
              bolts for each one. You continue to look and find that the north cabinet is unlocked and contains what <em>appears</em> to be a
              <em>deck of playing cards</em> and wine glasses.`
    },
    {
        name: "Dining Room - Area 5 Searched",
        "choice text": ["Fight", "Flee"],
        "choice functions": [fightMonster, restartGame],
        text: `The ghastly light has illuminated the room allowing you to see the wood-paneling, a carved mahogany table with 8 high-backed chairs with sculpted armrests and cushioned seats.
              The crystal chandelier above the table shines the light down upon the table covered in resplendent silverware and crystalware. It all looks freshly polished with a dazzling shine.
              Above the marble fireplace is a mahogany-framed painting of an alpine vale. Something catches your eyes on the paneling. You see that carved into it are elegant images of deer among the trees.
              But, among those gorgeous images you find something most disturbing. The trees have faces, twisted and distorted in pain, carved into them. And, wolves hide among the foliage waiting for the deer to come closer
              The sound of laughter, deep and melodic, rings out and you hear a voice say,<br>
              <em>HA HA HA HA...Finally I found you! Hmmm, you are still too weak, but that will change with time. In fact, here's a little gift for you. Emjoy, HAHAHAHAHAHA!!!!!!</em>, the voice fades away just
              something else begins to manifest in front of you. A ghoul stands before you ready to rip you to shreds. It's hideous visage hard to look at and it's stench starts to permeate the air. It jumps to you
              trying to take a bite out of you.`
    }
];



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// functions for choices
function update(storyChoice) {
    
    //Clear the button container first
    choicesContainer.innerHTML = '';
    
    // Loop through the choices and create buttons
    for (let i = 0; i < storyChoice["choice text"].length; i++) {
        const choiceText = storyChoice["choice text"][i];

        console.log(`Current story: ${storyChoice.name}`);
        console.log(`Current choice text: ${choiceText}`);
        console.log(`Function at index ${i}:`, storyChoice["choice functions"][i])

        // Button for each choice
        const newChoices = document.createElement("button");
        newChoices.innerText = choiceText;

        // Adding a class to use with CSS
        newChoices.classList.add("choiceButton");

        //Event listener executes teh function associated with the choice.
        newChoices.addEventListener('click', () => {
            storyChoice["choice functions"][i]();
        });

        //Adds newly created buttons to the container
        choicesContainer.appendChild(newChoices);
    }

    // Update the inner text of the element with id="text"
    text.innerHTML = storyChoice.text;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Restarts the Game and clears the pastChoices set to allow all buttons to reset
function restartGame(){
    // clears pastChoices set
    pastChoices.clear();
    // loads the initial page, first object in the array
    update(storyChoices[0]);
}

function chapter1End() {
    // clears pastChoices set
    pastChoices.clear();
    // loads the initial page, first object in the array
    update(storyChoices[0]);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Each function calls the update function using the argument
storyChoices[i] to grab the correct object within the array
const storyChoices(){}. These are the choices available to you at the
start of the game along w/the consequences/results of each choice.*/

function talkWithChildren() {
    update(storyChoices[1]);
}

function observeTheChildren() {
    update(storyChoices[2]);
}

function observeSurroundings() {
    update(storyChoices[3]);
}

function askForInformation() {
    update(storyChoices[4]);
}

function goInHouse() {
    update(storyChoices[5]);
}

function leave() {
    update(storyChoices[6]);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* These functions work the same as the story choices with the difference being
that they work for different locations inside the house with a description. */

function entranceArea1A() {
    update(locations1F[0]);
}

function entranceArea1B() {
    update(locations1F[1]);
}

function mainHallArea2A(){
    update(locations1F[2]);
}

function mainHallArea2B() {
    update(locations1F[3]);
}

function denOfWolves() {
    update(locations1F[4]);
}

function kitchenArea4A() {
    update(locations1F[5]);
}

function kitchenArea4B() {
    update(locations1F[6]);
}

function diningRoom() {
    update(locations1F[7]);
}

function mainHall() {
    update(locations1F[8]);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions for searching and actions after searching room.
function searchArea1A() {
    update(searchedLocations1F[0])
}

function searchArea1B() {
    update(searchedLocations1F[1])
}

function searchArea2A() {
    update(searchedLocations1F[2])
}

function searchArea3() {
    update(searchedLocations1F[3])
}

function searchArea5() {
    update(searchedLocations1F[4])
}

function pickUpWeapon() {

}

function pickUpMisc() {
    
}

function pickUpConsumable() {

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function for fighting monsters
function fightMonster() {

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Initializes the first dynamic page with buttons using the first object of the array storyChoices
update(storyChoices[0]);