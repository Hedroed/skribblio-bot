function suggest(currentWord) {

    const len = currentWord.length.toString()
    const wordsCount = currentWord.split(' ').length
    const composedWordsCount = currentWord.split('-').length

    const hints = currentWord.split('').map((l, i) => ({ letter: l, index: i })).filter(l => l.letter !== '_')

    return lazyLoadWords(len)
    .then(data => {
        return data.default.filter(w => {
            const matchHints = hints.every(h => w[h.index] === h.letter)
            const matchWordsCount = w.split(' ').length === wordsCount
            const matchComposedWordsCount = w.split('-').length === composedWordsCount
            return matchHints && matchComposedWordsCount && matchWordsCount
        })
    })
}

function lazyLoadWords(len) {
    return import(`./words/words-${len.padStart(2, '0')}.json`)
    // switch (len) {
    //     case "2":
    //         return import('./words/words-02.json')
    //     case "3":
    //         return import('./words/words-03.json')
    //     case "4":
    //         return import('./words/words-04.json')
    //     case "5":
    //         return import('./words/words-05.json')
    //     case "6":
    //         return import('./words/words-06.json')
    //     case "7":
    //         return import('./words/words-07.json')
    //     case "8":
    //         return import('./words/words-08.json')
    //     case "9":
    //         return import('./words/words-09.json')
    //     case "10":
    //         return import('./words/words-10.json')
    //     case "11":
    //         return import('./words/words-11.json')
    //     case "12":
    //         return import('./words/words-12.json')
    //     case "13":
    //         return import('./words/words-13.json')
    //     case "14":
    //         return import('./words/words-14.json')
    //     case "15":
    //         return import('./words/words-15.json')
    //     case "16":
    //         return import('./words/words-16.json')
    //     case "17":
    //         return import('./words/words-17.json')
    //     case "18":
    //         return import('./words/words-18.json')
    //     case "19":
    //         return import('./words/words-19.json')
    //     case "20":
    //         return import('./words/words-20.json')
    //     case "21":
    //         return import('./words/words-21.json')
    //     case "22":
    //         return import('./words/words-22.json')
    //     case "23":
    //         return import('./words/words-23.json')
    //     case "26":
    //         return import('./words/words-26.json')
    //     case "27":
    //         return import('./words/words-27.json')
    //     default:
    //         break;
    // }
}

export default suggest