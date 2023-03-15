// This function grabs the definition of a word in JSON format.
async function grab_json_definition(word, ref, key) {
    const uri = `https://dictionaryapi.com/api/v3/references/${encodeURIComponent(ref)}/json/${encodeURIComponent(word)}?key=${encodeURIComponent(key)}`;
    const response = await fetch(uri);
    return response.json();
  }
  
  // Handle the form submission and API call.
  const form = document.getElementById('dictionary-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // prevent the form from submitting
  
    const word = document.getElementById('word').value;
    const ref = document.getElementById('reference').value;
    const key = 'b1cfddca-dfe6-4b7f-8986-b04a339d7946'; // your API key
  
    try {
      const definition = await grab_json_definition(word, ref, key);
  
      // extract the desired data fields from the API response
      const lexicalEntries = definition[0]?.hwi?.prs?.map(pronunciation => pronunciation.mw)?.join(', ') || '';
      const partOfSpeech = definition[0]?.fl || '';
      const firstDefinition = definition[0]?.shortdef?.[0] || '';
      const originAndHistory = definition[0]?.et?.[0]?.[1] || '';
      const synonyms = definition[0]?.meta?.syns?.[0]?.join(', ') || '';
      const antonyms = definition[0]?.meta?.ants?.[0]?.join(', ') || '';
  
      // display the extracted data in the HTML page
      const definitionDiv = document.getElementById('definition');
      definitionDiv.innerHTML = `
        <p><strong>Lexical Entries:</strong> ${lexicalEntries}</p>
        <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
        <p><strong>Definition:</strong> ${firstDefinition}</p>
        <p><strong>Origin and History:</strong> ${originAndHistory}</p>
      `;
    } catch (error) {
      console.error(error);
    }
  });
  