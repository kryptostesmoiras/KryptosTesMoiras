# Portail public Kryptos Tēs Moiras

Copie statique autonome : HTML, CSS, JavaScript, vingt langues et quatre thèmes plus le mode système. Les chemins prennent en charge un hébergement à la racine ou sous un sous-dossier GitHub Pages.

## Voir le site localement

Depuis la racine du dépôt :

```sh
python3 -m http.server 8080 --directory github/pages
```

Ouvrir le serveur avec un navigateur. Un double-clic sur un HTML ne suffit pas pour charger les traductions JSON : utiliser un serveur HTTP.

## GitHub Pages

Ce dossier contient les fichiers à publier ; sa présence dans GitHub ne l’active pas comme site. GitHub Pages accepte les sources de branche à la racine ou dans `docs/`. Pour publier précisément `github/pages/`, choisir une publication par GitHub Actions et utiliser ce dossier comme artefact Pages.

## Accès privé

Le portail public ne contient aucun formulaire de connexion. La démo utilise exclusivement des projets fictifs en mémoire. Le serveur Rust, l’application privée, les bases, les comptes réels et les dépôts privés ne sont pas inclus.

L’adresse onion reste vide par défaut. Le propriétaire peut la renseigner dans `config.js` ; aucune clé privée ne doit y figurer. Le portail n’est pas un proxy vers Tor et le simple lien n’ouvre pas Tor Browser automatiquement.
