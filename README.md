# Grand Theft Laurea VI

Sito-regalo per la laurea di Nicola: in regalo c'è GTA VI, quindi il sito riprende l'atmosfera di Vice City e Leonida (tramonto, palme, neon, tipografia condensata).

Sito statico: niente build, niente dipendenze. Basta aprire `index.html`.

## Pubblicazione su GitHub Pages

1. **Settings → Pages**.
2. In **Build and deployment** scegli **Deploy from a branch**.
3. Seleziona il branch `main`, cartella `/ (root)`, e salva.

## Personalizzazione

| Cosa | Dove |
| --- | --- |
| Testi, nome, mittenti del regalo | `index.html` |
| Statistiche di Nicola (barre) | `index.html`, attributo `style="--value: …"` |
| Colori e font | variabili in cima a `styles.css` |
| Data di uscita del conto alla rovescia | prima riga di `script.js` |

> Pagina personale e celebrativa, non affiliata né approvata da Rockstar Games o Take-Two Interactive.
> Nessun asset ufficiale è incluso: grafica, palme e logo "VI" sono ricreati in CSS/SVG.
