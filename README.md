# Laurea Nicola — GTA VI Edizione Laurea

Sito-regalo per la laurea di Nicola: in regalo c'è GTA VI, quindi il sito riprende l'atmosfera di Vice City e Leonida.

Sito statico: niente build, niente dipendenze. Basta aprire `index.html`.

## Personalizzazione

| Cosa | Dove |
| --- | --- |
| Testi, nomi dei partecipanti | `index.html` |
| Statistiche di Nicola (barre) | `index.html`, attributo `style="--value: …"` |
| Immagini | cartella `assets/` |
| Colori e font | variabili in cima a `styles.css` |
| Data di sblocco del codice (timer) | `releaseDate` in cima a `script.js` |
| Codice di GTA VI | `redeemCode` in cima a `script.js` |

## Il codice di GTA VI

Il timer compare dopo l'apertura del pacco; allo scadere mostra il codice. La repository è pubblica, quindi **il codice vero va inserito solo il giorno dello sblocco**: chiunque può leggere il sorgente, e il timer gira sull'orologio del dispositivo di chi guarda.

Finché `redeemCode` resta il segnaposto `XXXXX-XXXXX-XXXXX`, a timer scaduto compare "In consegna…".

Per vedere in anteprima la pagina a timer scaduto, aggiungi `?anteprima` all'indirizzo.
