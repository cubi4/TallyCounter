# immoflowCodeChallenge

Verwendete Packages:
Vue, Vite, Typescript, PrimeVue, PrimeFlex, Primeicon, Pinia, uuid

Zum Starten:

    npm install
    npm run dev

Types:
Meter = Zähler

MeterReadings = Zählerstände

Allgemein:
Der Zählername ist auf eine 14-stellige Zahl begrenzt (hatte mich an echten Zählern orientiert, die nur Nummern statt Namen haben).
Bei der Zählerart habe ich eine Vorauswahl getroffen (statt dem User freie Artdefinition zu geben), die natürlich noch ergänzt werden kann.
Die Listenansicht enthält einen Pfeil zum Ein- und Ausklappen der Zählerstände, sodass sowohl bestimmte Zähler als auch alle vorhandenen Zählerstände angezeigt werden können.
Der Einfachheit halber habe ich für Fehler/Löschen Browser-Alerts verwendet, diese können jedoch noch durch richtige Pop-ups ersetzt werden.
