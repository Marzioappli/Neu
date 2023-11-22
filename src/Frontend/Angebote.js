import React from 'react';
import './front.css';

function Angebotsseite() {
   // Liste von Angeboten mit Titel, Beschreibung und Preis
    const angebote = [
        {
        title: 'Ganzkörpercheck',
        description: 'Dies ist ein Angebot für Sie, um Ihren Körper auf mögliche Erkrankungen zu testen!',
        price: '800.-',
        },
        {
        title: 'Operationen',
        description: 'Wir bieten verschiedene chirurgische Eingriffe in unserem Krankenhaus an.',
        price: 'Variiert zwischen 1000 bis 10000.-',
        },
        {
        title: 'Psychische Hilfe',
        description: 'Wir bieten psychische Unterstützung für Patienten mit postoperativen oder anderen medizinischen Bedenken.',
        price: '250.-',
        },
        {
        title: 'Röntgenuntersuchung',
        description: 'Unsere hochmoderne Röntgenabteilung bietet präzise Bildgebungsdienste für die Diagnose und Überwachung von Gesundheitszuständen.',
        price: '350.-',
        },
        {
        title: 'Blutuntersuchung',
        description: 'Eine umfassende Blutuntersuchung zur Überprüfung von Blutbild und Gesundheitszustand.',
        price: '120.-',
        },
        {
        title: 'Kardiologische Untersuchung',
        description: 'Eine gründliche kardiologische Untersuchung, um Herz-Kreislauf-Erkrankungen zu diagnostizieren und zu behandeln.',
        price: '500.-',
        },
    ];

  return (
    <div className="angebotsseite"> {/* Container für die Angebotsseite */}
      <h1>Unsere Angebote</h1>
      <div className="angebote-liste"> {/* Liste der Angebote */}
        {angebote.map((angebot, index) => (
          <div key={index} className="angebot">
            <h2>{angebot.title}</h2>
            <p>{angebot.description}</p>
            <p>{angebot.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Angebotsseite;