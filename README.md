# Accesso riservato

Il sito è temporaneamente protetto da nome utente e password: `index.html` contiene la pagina cifrata (AES-GCM, chiave derivata con PBKDF2).

Per togliere la protezione basta annullare il commit che l'ha aggiunta (`git revert`), che ripristina i file originali.
