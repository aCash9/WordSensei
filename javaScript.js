

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page reload on form submission
    const word = document.querySelector('#word').value;
    const encodedParams = new URLSearchParams();
    encodedParams.append("Text", word);
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '0ff664b409mshdcd19ab5b556249p127e67jsn1cf960986e39',
            'X-RapidAPI-Host': 'bing-spell-check2.p.rapidapi.com'
        },
        body: encodedParams
    };
    fetch('https://bing-spell-check2.p.rapidapi.com/spellcheck?mode=proof', options)
        .then(response => response.json())
        .then(response => {
            if (response.flaggedTokens.length === 0) {
                const resultElement = document.querySelector('#result');
                resultElement.innerHTML = "Word Spelling is Correct";
            } else {
                const correctedWord = response.flaggedTokens[0].suggestions[0].suggestion;
                const resultElement = document.querySelector('#result');
                resultElement.innerHTML = `Correct Spelling: <strong>${correctedWord}</strong>`;
            }
        })
        .catch(err => console.error(err));
});

