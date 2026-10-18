# Accesso riservato

Il sito è temporaneamente protetto da nome utente e password: `index.html` contiene la pagina cifrata (AES-GCM, chiave derivata con PBKDF2), immagini comprese.

Per togliere la protezione, `index.html` va sostituito con la versione decifrata (si ottiene con le stesse credenziali).
