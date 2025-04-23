export function makeItAsObj(word) {
    let objOfCorrectWord = {}
    for (let i = 0; i < word.length; i++) {
        Object.assign(objOfCorrectWord, {[word[i]]: 0})
        if (word[i] in objOfCorrectWord) {
            let count = word.split(word[i]).length-1
            objOfCorrectWord[word[i]] += count

        }

    }
    return objOfCorrectWord;
}



