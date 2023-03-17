const form = document.getElementById('translation-form');
      const input = document.getElementById('input-text');
      const button = document.getElementById('translate-button');
      const output = document.getElementById('output');

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const text = input.value;
        translateText(text);
      });

      function translateText(text) {
        const languages = ['ja', 'kn', 'ko', 'la', 'pt', 'es', 'fr', 'de', 'hi', 'ru'];
        output.innerHTML = ''; // clear previous output
      
        languages.forEach((lang) => {
          const encodedParams = new URLSearchParams();
          encodedParams.append("q", text);
          encodedParams.append("target", lang);
          encodedParams.append("source", "en");
      
          const options = {
            method: 'POST',
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              'Accept-Encoding': 'application/gzip',
              'X-RapidAPI-Key': '0ff664b409mshdcd19ab5b556249p127e67jsn1cf960986e39',
              'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            },
            body: encodedParams
          };
      
          fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
            .then(response => response.json())
            .then(data => {
              const translation = data.data.translations[0].translatedText;
              output.innerHTML += `<p>${lang.toUpperCase()}: ${translation}</p>`;
            })
            .catch(err => console.error(err));
        });
      }
      