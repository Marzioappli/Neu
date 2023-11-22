import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import Home from './Frontend/Home';
import About from './Frontend/About';
import Patienten from './Frontend/Patienten';
import Angebote from './Frontend/Angebote';
import './App.css';

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    alter: '',
    fachrichtung: '',
    passwort: '',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleResize = () => {
    setShowHamburger(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validUsers = [
    {
      vorname: 'Max',
      nachname: 'Mustermann',
      alter: '30',
      fachrichtung: 'Medizin',
      passwort: 'geheim',
    },
    {
      vorname: 'Anna',
      nachname: 'Musterfrau',
      alter: '28',
      fachrichtung: 'Medizin',
      passwort: 'geheim',
    },
    {
      vorname: 'John',
      nachname: 'Doe',
      alter: '32',
      fachrichtung: 'Verwaltung',
      passwort: 'geheim',
    },
    {
      vorname: 'Jane',
      nachname: 'Smith',
      alter: '35',
      fachrichtung: 'Verwaltung',
      passwort: 'geheim',
    },
    {
      vorname: 'Alice',
      nachname: 'Johnson',
      alter: '25',
      fachrichtung: 'IT',
      passwort: 'geheim',
    },
    {
      vorname: 'Bob',
      nachname: 'Smith',
      alter: '28',
      fachrichtung: 'IT',
      passwort: 'geheim',
    },
    {
      vorname: 'Emily',
      nachname: 'Brown',
      alter: '29',
      fachrichtung: 'Externe Dienstleister',
      passwort: 'geheim',
    },
    {
      vorname: 'David',
      nachname: 'Jones',
      alter: '31',
      fachrichtung: 'Externe Dienstleister',
      passwort: 'geheim',
    },
  ];

  const handleAccessSubmit = () => {
    const matchedUser = validUsers.find(
      (user) =>
        user.vorname === formData.vorname &&
        user.nachname === formData.nachname &&
        user.alter === formData.alter &&
        user.fachrichtung === formData.fachrichtung &&
        user.passwort === formData.passwort
    );

    if (matchedUser) {
      setIsAuthenticated(true);
      alert(`Erfolgreich angemeldet. Willkommen Herr/Frau: ${matchedUser.vorname} ${matchedUser.nachname}`);
    } else {
      alert('Die eingegebenen Informationen sind ungültig. Keine Personen mit Zugang zu den Patientendaten erkannt. Versuche es erneut!');
    }
  };

  return (
    <div>
      <Router>
        <div className="navbar">
          <div className="navbar-logo">
            <img src="https://mein-sicheres-krankenhaus.de/wp-content/uploads/2022/07/Logo-Mein-sicheres-Krankenhaus-weiss-rot-final.png" alt="Krankenhaus ZLI" />
          </div>
          {showHamburger && (
            <div className="hamburger" onClick={toggleMenu}>
              <FaBars />
            </div>
          )}
          <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
            <li className="nav">
              <Link to="/" className="navto">
                Home
              </Link>
            </li>
            <li className="nav">
              <Link to="/about" className="navto">
                Über uns
              </Link>
            </li>
            <li className="nav">
              <Link to="/angebote" className="navto">
                Angebote
              </Link>
            </li>
            <li className="nav">
              <Link to="/patienten" className="navto" onClick={() => setIsAuthenticated(false)}>
                Daten
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/angebote" element={<Angebote />} />
            <Route
              path="/patienten"
              element={
                isAuthenticated ? (
                  <Patienten />
                ) : (
                  <AccessForm formData={formData} handleInputChange={handleInputChange} handleAccessSubmit={handleAccessSubmit} />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

function AccessForm({ formData, handleInputChange, handleAccessSubmit }) {
  return (
    <div className="access-form">
      <p className="titel">
        <strong>Zugriff haben nur das Medizinisches Personal, das Verwaltungspersonal, das IT-Personal und Externe Dienstleister:</strong>
      </p>
      <input //jedes einzelne Input Feld
        type="text"
        name="vorname"
        className="input-field"
        placeholder="Vorname"
        value={formData.vorname}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="nachname"
        className="input-field"
        placeholder="Nachname"
        value={formData.nachname}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="alter"
        className="input-field"
        placeholder="Alter"
        value={formData.alter}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="fachrichtung"
        className="input-field"
        placeholder="Fachrichtung"
        value={formData.fachrichtung}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="passwort"
        className="input-field"
        placeholder="Passwort"
        value={formData.passwort}
        onChange={handleInputChange}
      />
      <button className="datenbutton" onClick={handleAccessSubmit}>Bestätigen</button>
    </div>
  );
}

export default App;
