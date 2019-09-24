const inputForGeneratorA = 699;
const inputForGeneratorB = 124;

const factorA = 16807;
const factorB = 48271;
const remainderDivider = 2147483647;

previousValueForA = inputForGeneratorA;
previousValueForB = inputForGeneratorB;

function generate(input, factor) {
    const product = input * factor;
    const remainder = product % remainderDivider;
    return remainder;
}

function generatorA() {
    let waitingForAValidNumber = true;
    let remainder;
    while (waitingForAValidNumber) {
        remainder = generate(previousValueForA, factorA);
        previousValueForA = remainder;

        if (remainder % 4 === 0) {
            waitingForAValidNumber = false;
        }
    }
    return remainder.toString(2);
}

function generatorB() {
    let waitingForAValidNumber = true;
    let remainder;
    while (waitingForAValidNumber) {
        remainder = generate(previousValueForB, factorB);
        previousValueForB = remainder;

        if (remainder % 8 === 0) {
            waitingForAValidNumber = false;
        }
    }
    return remainder.toString(2);
}

let judgedMatched = 0;
function judge(binaryNumberGeneratedFromA, binaryNumberGeneratedFromB) {
    if (binaryNumberGeneratedFromA.substr(-16) === binaryNumberGeneratedFromB.substr(-16)) {
        judgedMatched++;
    }
}

for (let i = 0; i <= 5000000; i++) {
    let binaryA = generatorA();
    let binaryB = generatorB();
    judge(binaryA, binaryB);
}

console.log(judgedMatched);