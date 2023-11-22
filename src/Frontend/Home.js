import React from 'react';
import './Home.css'; // Import der CSS-Stildefinitionen
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* Hauptcontainer mit Hintergrundbild */}
      <div className="background">
          <div className="align-items-center">
            <div className="hallo">
              <div>
                {/* Überschrift und Begrüßungstext */}
                <h1>Krankenhaus ZLI</h1>
                <p>
                  Willkommen zu unserer Website! Vor kurzem hat das neue Krankenhaus in der Nähe des Sihlcity neu eröffnet. Wir freuen uns auf Ihren Besuch.
                  Mit insgesamt 120 Mitarbeitern sorgen wir uns gut um Sie. Bei uns ist Ihre Gesundheit gut aufgehoben.<br /> <br />Wir freuen uns auf Ihren Besuch!<br />
                  Bei uns sind Sie sicher! <br /><br /><br />
                  Freundliche Grüße <br />
                  Ihr Krankenhaus ZLI Team<br /><br /><br />
                  {/* Verknüpfungen zu anderen Seiten */}
                  <Link to="./about">
                    <button className='button-1'>Weitere Informationen vom Krankenhaus ZLI</button>
                  </Link>
                  <Link to="./patienten">
                    <button className='button-1'>Erkunden Sie die Daten von Patienten und Ärzten</button>
                  </Link>
                </p>
              </div>
            </div>
            <div>
              {/* Bild zur Seite hinzufügen */}
              <img src="https://static.wixstatic.com/media/99ec7c_69f79e09b45f449a894447a23f12a101~mv2.png/v1/crop/x_285,y_0,w_934,h_851/fill/w_500,h_456,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/skip-the-internet-search-come-see-me-portrait-of-2022-09-30-21-50-31-utc_edited.png" className="img-fluid" alt="Geeks UI Learning Application" />
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
