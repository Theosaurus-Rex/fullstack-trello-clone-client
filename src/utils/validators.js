export const validateInput = (input) => {
    const bannedWords = ["bum"]
    bannedWords.forEach((word) => {
        if (input.includes(word)) {
            return false
        } else {
            return true
        }
    })
}