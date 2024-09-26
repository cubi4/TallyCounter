/* -----------Zähler-----------

Name:
    String
    Darf nicht null oder leer sein
Zählertyp:
    String
    Darf nicht null oder leer sein.


-----------Zählerstand-----------
Ablesedatum:
    Datumformat: dd.mm.yyyy
    Darf nicht leer sein

Ableser
    String
    Darf nicht null oder leer sein

Ablesewert
    Dezimalzahl mit Dreinachkommastellen
    Darf nicht null oder leer sein
*/

export interface Meter {
    meterName: string;
    type: string;
    readings: MeterReading[];
}

export interface MeterReading {
    readerName: string;
    date: Date; // dd.mm.yyyy
    value: number | null;
    // photoUrl?: string; // Optionales Feld für das Foto
}

// export type MeterType = "Strom" | "Gas" | "Wasser" | "Heizung" | "Sonstiges";


// export interface Meter {
//     meterName: string;
//     type: string;
//     readingCount: number | null;
//     date: Date;
//     readerName: string;
// }



