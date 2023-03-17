document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent page reload on form submission
    const word = document.querySelector('#word').value;
  
    // API 1: Bing Spell Check
    const encodedParams = new URLSearchParams();
    encodedParams.append("Text", word);
    const spellCheckOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '0ff664b409mshdcd19ab5b556249p127e67jsn1cf960986e39',
        'X-RapidAPI-Host': 'bing-spell-check2.p.rapidapi.com'
      },
      body: encodedParams
    };
    const spellCheckResponse = await fetch('https://bing-spell-check2.p.rapidapi.com/spellcheck?mode=proof', spellCheckOptions);
    const spellCheckData = await spellCheckResponse.json();
    const correctedWord = spellCheckData.flaggedTokens.length === 0 ? word : spellCheckData.flaggedTokens[0].suggestions[0].suggestion;
  
    // API 2: Merriam-Webster Dictionary
    const dictionaryRef = "collegiate";
    const dictionaryKey = 'b1cfddca-dfe6-4b7f-8986-b04a339d7946'; // your API key
    const dictionaryOptions = {
      headers: {
        'Accept': 'application/json',
      },
    };
    const dictionaryResponse = await fetch(`https://dictionaryapi.com/api/v3/references/${encodeURIComponent(dictionaryRef)}/json/${encodeURIComponent(correctedWord)}?key=${encodeURIComponent(dictionaryKey)}`, dictionaryOptions);
    const dictionaryData = await dictionaryResponse.json();
    const lexicalEntries = dictionaryData[0]?.hwi?.prs?.map(pronunciation => pronunciation.mw)?.join(', ') || '';
    const partOfSpeech = dictionaryData[0]?.fl || '';
    const firstDefinition = dictionaryData[0]?.shortdef?.[0] || '';
    const originAndHistory = dictionaryData[0]?.et?.[0]?.[1] || '';
    const synonyms = dictionaryData[0]?.meta?.syns?.[0]?.join(', ') || '';
    const antonyms = dictionaryData[0]?.meta?.ants?.[0]?.join(', ') || '';
  
    // Display results
    const resultElement = document.querySelector('#result');
    if (spellCheckData.flaggedTokens.length === 0) {
      resultElement.innerHTML = "Word Spelling is Correct";
    } else {
      resultElement.innerHTML = `Correct Spelling: <strong>${correctedWord}</strong>`;
    }
  
    const definitionDiv = document.getElementById('definition');
    definitionDiv.innerHTML = `
      <p style="word-wrap: break-word;"><strong>Lexical Entries:</strong> ${lexicalEntries}</p>
      <p style="word-wrap: break-word;"><strong>Part of Speech:</strong> ${partOfSpeech}</p>
      <p style="word-wrap: break-word;"><strong>Definition:</strong> ${firstDefinition}</p>
      <p style="word-wrap: break-word;"><strong>Origin and History:</strong> ${originAndHistory}</p>
    `;
  });
  