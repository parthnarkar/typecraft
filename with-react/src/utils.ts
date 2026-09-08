import { words } from "./words"

// refactoring this function which we were repeating in the 
export function getRandomIndex(arr: string[]): number {
    return Math.floor(Math.random() * arr.length);
}

export function getRandomWord() : string {
    const randomIndex = getRandomIndex(words);
    return words[randomIndex]
}

export function getFarewellText(language: string): string {
    const options: string[] = [
        `Farewell, ${language}`,
        `Adios, ${language}`,
        `R.I.P., ${language}`,
        `We'll miss you, ${language}`,
        `Oh no, not ${language}!`,
        `${language} bites the dust`,
        `Gone but not forgotten, ${language}`,
        `The end of ${language} as we know it`,
        `Off into the sunset, ${language}`,
        `${language}, it's been real`,
        `${language}, your watch has ended`,
        `${language} has left the building`
    ];

    const randomIndex = getRandomIndex(words);
    return options[randomIndex];
}