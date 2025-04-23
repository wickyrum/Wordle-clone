import { makeItAsObj } from "/objMaker.js"

const urlGet = "https://words.dev-apis.com/word-of-the-day?random=1"
const urlPost = "https://words.dev-apis.com/validate-word"
const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const response = await fetch(urlGet)
const wordOfTheDay = await response.json()
let gridCount = 1
let word = ""
let rowNum = 1



async function isaValidWord(word) {
    const response = await fetch(urlPost, {
        method: 'POST',
        body: JSON.stringify({ word: word }),
    })
    let result = await response.json()
    return result.validWord
}


function characterCheck(letter) {
    console.log("hello")
    if (alphabets.includes(letter.key.toUpperCase())) {
        enterLetter(letter.key)
    }
    if (letter.key === "Backspace" || letter.key === "Enter") {
        otherChar(letter.key)
    }
}
function enterLetter(alphabet) {
    const box =  document.getElementsByClassName(`row${rowNum}`)[gridCount-1]
    box.textContent = alphabet.toUpperCase()
    gridCount += 1
    word += alphabet
}

async function otherChar(char) {
    if (char === "Backspace" && gridCount > 1) {
        gridCount -= 1
        const box = document.getElementsByClassName(`row${rowNum}`)[gridCount-1]
        box.textContent = ""
        word = word.slice(0, -1)
    }
    if (char === "Enter" && word.length === 5) {
        const validity = await isaValidWord(word.toLowerCase());
        if (validity) {
            console.log("valid")
            gridCount = 1
            returnHints(word)
            console.log(word, wordOfTheDay)
            if (word === wordOfTheDay.word) {
                alert("you fucking won")
                const head = document.querySelector(`.heading`)
                head.classList.add("colory")
            }
            rowNum++
            word = ""
        } else {
            const currentRow = document.querySelectorAll(`.row${rowNum}`)
            console.log("invalid")
            currentRow.forEach(el => {
                el.classList.add("blink")

            });
            word = ""
            setTimeout(() => {
                currentRow.forEach(el => {
                    el.classList.remove("blink")
                });
            }, 1200);



        }


        }

async function returnHints(guessWord) {
    const correctWord = wordOfTheDay.word
    let objOfGuessWord = makeItAsObj(guessWord) // {'t': 2, 'r': 1, 'e': 1, 'a': 1}
    let objOfCorrectWord = makeItAsObj(correctWord) // {'h': 2, 'i': 1, 't': 1, 'c': 1}
    for (let i=0; i < guessWord.length; i++) {
        console.log(objOfCorrectWord)
        const box = document.getElementsByClassName(`row${rowNum}`)[i]
        if (guessWord[i] === correctWord[i]) {
            box.classList.add("green")
        }
        if (correctWord[i].includes(guessWord[i])) {
            objOfCorrectWord[guessWord[i]] -= 1
    }
    }
    for (let i=0; i < guessWord.length; i++) {
        if (correctWord.includes(guessWord[i]) && objOfCorrectWord[guessWord[i]] > 0) {
            const box = document.getElementsByClassName(`row${rowNum}`)[i]
            box.classList.add("yellow")
            objOfCorrectWord[guessWord[i]] -= 1
        }
        else if (!(guessWord[i] === correctWord[i])){
            const box = document.getElementsByClassName(`row${rowNum}`)[i]
            box.classList.add("red")
        }
    }

}


}
function init() {
    document.addEventListener("keydown", characterCheck)
    console.log("script started")
    console.log(wordOfTheDay.word)
}
init()
