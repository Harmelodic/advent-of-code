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
    let remainder = generate(previousValueForA, factorA);
    previousValueForA = remainder;
    return remainder.toString(2);
}

function generatorB() {
    let remainder = generate(previousValueForB, factorB);
    previousValueForB = remainder;
    return remainder.toString(2);
}

let judgedMatched = 0;
function judge(binaryNumberGeneratedFromA, binaryNumberGeneratedFromB) {
    if (binaryNumberGeneratedFromA.substr(-16) === binaryNumberGeneratedFromB.substr(-16)) {
        judgedMatched++;
    }
}

for (let i = 0; i <= 40000000; i++) {
    let binaryA = generatorA();
    let binaryB = generatorB();
    judge(binaryA, binaryB);
}

console.log(judgedMatched);