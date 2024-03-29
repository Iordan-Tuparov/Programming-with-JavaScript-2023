function emojiDetector(input) {

    let text = input.shift();
    let pattern = /(\:{2}|\*{2})(?<emoji>[A-Z][a-z]{2,})\1/g;
    let allDigits = /[0-9]/;

    let threshHold = 1;

    text.split('').forEach(ch => {
        if (ch.match(allDigits) !== null) {
            threshHold *= Number(ch.match(allDigits)[0]);
        }
    });
    console.log(`Cool threshold: ${threshHold}`);

    let matches = text.matchAll(pattern);
    let count = 0;
    let ress = [];

    for (let current of matches) {
        count++;
        let coolness = (current.groups.emoji).split('')
        .map(x => x.charCodeAt(0))
        .reduce((a,b) => a + b,0);
        if (coolness > threshHold) {
            ress.push(current[0]);
        }
    }

    console.log(`${count} emojis found in the text. The cool ones are:`);
    ress.forEach(emoji => console.log(emoji));
}

emojiDetector(['In the Sofia Zoo there are 311 animals in total! ::Smiley:: This includes 3 **Tigers**, 1 ::Elephant:, 12 **Monk3ys**, a **Gorilla::, 5 ::fox:es: and 21 different types of :Snak::Es::. ::Mooning:: **Shy**']);
emojiDetector(["5, 4, 3, 2, 1, go! The 1-th consecutive banana-eating contest has begun! ::Joy:: **Banana** ::Wink:: **Vali** ::valid_emoji::"]);
emojiDetector(["It is a long established fact that 1 a reader will be distracted by 9 the readable content of a page when looking at its layout. The point of using ::LoremIpsum:: is that it has a more-or-less normal 3 distribution of 8 letters, as opposed to using 'Content here, content 99 here', making it look like readable **English**."]);