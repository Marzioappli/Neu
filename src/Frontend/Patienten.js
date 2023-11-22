import React, { useEffect, useState } from "react";
import "whatwg-fetch";
import "./patienten.css";

const Verwaltung = () => {
  // Zustände für die verschiedenen Daten
  const [patienten, setPatienten] = useState([]);
  const [arzteData, setAerzteData] = useState([]);
  const [abteilungen, setAbteilungen] = useState([]);
  const [zimmer, setZimmer] = useState([]);
  const [behandlungen, setBehandlungen] = useState([]);
  const [behandlungenpa, setBehandlungenpa] = useState([]);
  const [behandlungenar, setBehandlungenar] = useState([]);
  const [editRowIndex, setEditRowIndex] = useState(-1);


  const [userCredentials, setUserCredentials] = useState({
    // Benutzereingaben
    Vorname: "",
    Nachname: "",
    Alter: "",
    Fach: "",
  });

  // Daten beim Laden der Komponente abrufen
  useEffect(() => {
    const fetchData = async () => {
      // Verschiedene Datenquellen
      try {
        const responsePatienten = await fetch(
          "http://localhost:5000/patienten"
        );
        const responseArzte = await fetch("http://localhost:5000/arzte");
        const responseAbteilungen = await fetch(
          "http://localhost:5000/abteilungen"
        );
        const responseZimmer = await fetch("http://localhost:5000/zimmer");
        const responseBehandlungen = await fetch(
          "http://localhost:5000/behandlungen"
        );
        const responseBehandlungenPatienten = await fetch(
          "http://localhost:5000/behandlungen_patienten"
        );
        const responseBehandlungenArzte = await fetch(
          "http://localhost:5000/behandlungen_arzte"
        );
        // Daten in JSON konvertieren und in den Zuständen speichern
        const dataPatienten = await responsePatienten.json();
        const dataArzte = await responseArzte.json();
        const dataAbteilungen = await responseAbteilungen.json();
        const dataZimmer = await responseZimmer.json();
        const dataBehandlungen = await responseBehandlungen.json();
        const dataBehandlungenPatienten = await responseBehandlungenPatienten.json();
        const dataBehandlungenArzte = await responseBehandlungenArzte.json();

        setPatienten(dataPatienten);
        setAerzteData(dataArzte);
        setAbteilungen(dataAbteilungen);
        setZimmer(dataZimmer);
        setBehandlungen(dataBehandlungen);
        setBehandlungenpa(dataBehandlungenPatienten);
        setBehandlungenar(dataBehandlungenArzte);
      } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
      }
    };

    fetchData();
  }, []);

  // Funktionen zur Bearbeitung, Speicherung und Löschung von Daten
  const handleEdit = (index, table) => {
    setEditRowIndex(index);
  };

  const handleSave = async (index, table) => {
    try {
      let updatedData = [];
      let updatedRow = {};

      switch (table) {
        case "patienten":
          updatedData = [...patienten];
          updatedRow = {
            ...updatedData[index],
            Vorname: document.getElementById(`vorname-${index}`).value,
            Nachname: document.getElementById(`nachname-${index}`).value,
            Geburtsdatum: document.getElementById(`geburtsdatum-${index}`).value,
            Geschlecht: document.getElementById(`geschlecht-${index}`).value,
          };
          updatedData[index] = updatedRow;
          setPatienten(updatedData);
          break;

        case "arzte":
          updatedData = [...arzteData];
          updatedRow = {
            ...updatedData[index],
            Vorname: document.getElementById(`vorname-${index}`).value,
            Nachname: document.getElementById(`nachname-${index}`).value,
            Fachgebiet: document.getElementById(`fachgebiet-${index}`).value,
          };
          updatedData[index] = updatedRow;
          setAerzteData(updatedData);
          break;

        case "abteilungen":
          updatedData = [...abteilungen];
          updatedRow = {
            ...updatedData[index],
            Name: document.getElementById(`name-${index}`).value,
          };
          updatedData[index] = updatedRow;
          setAbteilungen(updatedData);
          break;

        case "zimmer":
          updatedData = [...zimmer];
          updatedRow = {
            ...updatedData[index],
            Typ: document.getElementById(`typ-${index}`).value,
          };
          updatedData[index] = updatedRow;
          setZimmer(updatedData);
          break;

        case "behandlungen":
          updatedData = [...behandlungen];
          updatedRow = {
            ...updatedData[index],
            Art: document.getElementById(`art-${index}`).value,
            Datum: document.getElementById(`datum-${index}`).value,
          };
          updatedData[index] = updatedRow;
          setBehandlungen(updatedData);
          break;

        case "behandlungenpa":
          updatedData = [...behandlungenpa];
          updatedRow = {
            ...updatedData[index],
            PatientID: document.getElementById(`patientid-${index}`).value,
          };
          updatedData[index] = updatedRow;
          setBehandlungenpa(updatedData);
          break;

        case "behandlungenar":
          updatedData = [...behandlungenar];
          updatedRow = {
            ...updatedData[index],
            ArztID: document.getElementById(`arztid-${index}`).value,
          };
          updatedData[index] = updatedRow;
          setBehandlungenar(updatedData);
          break;

        default:
          break;
      }

      setEditRowIndex(-1); // Zurücksetzen des Bearbeitungsmodus
    } catch (error) {
      console.error("Fehler beim Speichern der Daten:", error);
    }
  };

  const handleCancel = () => {
    setEditRowIndex(-1); // Abbrechen der Bearbeitung
  };

  const handleDelete = async (index, table) => {
    try {
      let newData = [];

      switch (table) {
        case "patienten":
          newData = [...patienten];
          break;

        case "arzte":
          newData = [...arzteData];
          break;

        case "abteilungen":
          newData = [...abteilungen];
          break;

        case "zimmer":
          newData = [...zimmer];
          break;

        case "behandlungen":
          newData = [...behandlungen];
          break;

        case "behandlungenpa":
          newData = [...behandlungenpa];
          break;

        case "behandlungenar":
          newData = [...behandlungenar];
          break;

        default:
          break;
      }
      newData.splice(index, 1);
      switch (table) {
        case "patienten":
          setPatienten(newData);
          break;

        case "arzte":
          setAerzteData(newData);
          break;

        case "abteilungen":
          setAbteilungen(newData);
          break;

        case "zimmer":
          setZimmer(newData);
          break;

        case "behandlungen":
          setBehandlungen(newData);
          break;

        case "behandlungenpa":
          setBehandlungenpa(newData);
          break;

        case "behandlungenar":
          setBehandlungenar(newData);
          break;

        default:
          break;
      }
    } catch (error) {
      console.error("Fehler beim Löschen der Daten:", error);
    }
  };

// Darstellung der Tabellen für die verschiedenen Daten
  return (
    <div>
      {/* Patienten */}
      <div className="center-content">
        <h2>Patienten</h2>
        <table>
          <thead>
            <tr>
              <th>PatientID</th>
              <th>Vorname</th>
              <th>Nachname</th>
              <th>Geburtsdatum</th>
              <th>Geschlecht</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {patienten.map((item, index) => (
              <tr key={item.PatientID}>
                <td>{item.PatientID}</td>
                {editRowIndex === index ? (
                  <>
                    <td>
                      <input
                        id={`vorname-${index}`}
                        type="text"
                        defaultValue={item.Vorname}
                      />
                    </td>
                    <td>
                      <input
                        id={`nachname-${index}`}
                        type="text"
                        defaultValue={item.Nachname}
                      />
                    </td>
                    <td>
                      <input
                        id={`geburtsdatum-${index}`}
                        type="text"
                        defaultValue={item.Geburtsdatum}
                      />
                    </td>
                    <td>
                      <input
                        id={`geschlecht-${index}`}
                        type="text"
                        defaultValue={item.Geschlecht}
                      />
                    </td>
                    <td>
                      <button
                        className="save-button"
                        onClick={() => handleSave(index, "patienten")}
                      >
                        Speichern
                      </button>
                      <button
                        className="cancel-button"
                        onClick={() => handleCancel()}
                      >
                        Abbrechen
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.Vorname}</td>
                    <td>{item.Nachname}</td>
                    <td>{item.Geburtsdatum}</td>
                    <td>{item.Geschlecht}</td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(index, "patienten")}
                      >
                        Bearbeiten
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(index, "patienten")}
                      >
                        Löschen
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ärzte */}
      <div className="center-content">
        <h2>Ärzte</h2>
        <table>
          <thead>
            <tr>
              <th>ArztID</th>
              <th>Vorname</th>
              <th>Nachname</th>
              <th>Fachgebiet</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {arzteData.map((item, index) => (
              <tr key={item.ArztID}>
                <td>{item.ArztID}</td>
                {editRowIndex === index ? (
                  <>
                    <td>
                      <input
                        id={`vorname-${index}`}
                        type="text"
                        defaultValue={item.Vorname}
                      />
                    </td>
                    <td>
                      <input
                        id={`nachname-${index}`}
                        type="text"
                        defaultValue={item.Nachname}
                      />
                    </td>
                    <td>
                      <input
                        id={`fachgebiet-${index}`}
                        type="text"
                        defaultValue={item.Fachgebiet}
                      />
                    </td>
                    <td>
                      <button
                        className="save-button"
                        onClick={() => handleSave(index, "arzte")}
                      >
                        Speichern
                      </button>
                      <button
                        className="cancel-button"
                        onClick={() => handleCancel()}
                      >
                        Abbrechen
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.Vorname}</td>
                    <td>{item.Nachname}</td>
                    <td>{item.Fachgebiet}</td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(index, "arzte")}
                      >
                        Bearbeiten
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(index, "arzte")}
                      >
                        Löschen
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Abteilungen */}
      <div className="center-content">
        <h2>Abteilungen</h2>
        <table>
          <thead>
            <tr>
              <th>AbteilungsID</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {abteilungen.map((item, index) => (
              <tr key={item.AbteilungsID}>
                <td>{item.AbteilungsID}</td>
                {editRowIndex === index ? (
                  <>
                    <td>
                      <input
                        id={`name-${index}`}
                        type="text"
                        defaultValue={item.Name}
                      />
                    </td>
                    <td>
                      <button
                        className="save-button"
                        onClick={() => handleSave(index, "abteilungen")}
                      >
                        Speichern
                      </button>
                      <button
                        className="cancel-button"
                        onClick={() => handleCancel()}
                      >
                        Abbrechen
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.Name}</td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(index, "abteilungen")}
                      >
                        Bearbeiten
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(index, "abteilungen")}
                      >
                        Löschen
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Zimmer */}
      <div className="center-content">
        <h2>Zimmer</h2>
        <table>
          <thead>
            <tr>
              <th>ZimmerID</th>
              <th>Typ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {zimmer.map((item, index) => (
              <tr key={item.ZimmerID}>
                <td>{item.ZimmerID}</td>
                {editRowIndex === index ? (
                  <>
                    <td>
                      <input
                        id={`typ-${index}`}
                        type="text"
                        defaultValue={item.Typ}
                      />
                    </td>
                    <td>
                      <button
                        className="save-button"
                        onClick={() => handleSave(index, "zimmer")}
                      >
                        Speichern
                      </button>
                      <button
                        className="cancel-button"
                        onClick={() => handleCancel()}
                      >
                        Abbrechen
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.Typ}</td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(index, "zimmer")}
                      >
                        Bearbeiten
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(index, "zimmer")}
                      >
                        Löschen
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Behandlungen */}
      <div className="center-content">
        <h2>Behandlungen</h2>
        <table>
          <thead>
            <tr>
              <th>BehandlungsID</th>
              <th>Art</th>
              <th>Datum</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {behandlungen.map((item, index) => (
              <tr key={item.BehandlungsID}>
                <td>{item.BehandlungsID}</td>
                {editRowIndex === index ? (
                  <>
                    <td>
                      <input
                        id={`art-${index}`}
                        type="text"
                        defaultValue={item.Art}
                      />
                    </td>
                    <td>
                      <input
                        id={`datum-${index}`}
                        type="text"
                        defaultValue={item.Datum}
                      />
                    </td>
                    <td>
                      <button
                        className="save-button"
                        onClick={() => handleSave(index, "behandlungen")}
                      >
                        Speichern
                      </button>
                      <button
                        className="cancel-button"
                        onClick={() => handleCancel()}
                      >
                        Abbrechen
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.Art}</td>
                    <td>{item.Datum}</td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(index, "behandlungen")}
                      >
                        Bearbeiten
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(index, "behandlungen")}
                      >
                        Löschen
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Behandlungen_Patienten */}
      <div className="center-content">
        <h2>Behandlungen_Patienten</h2>
        <table>
          <thead>
            <tr>
              <th>Behandlungs_Patienten_ID</th>
              <th>PatientID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {behandlungenpa.map((item, index) => (
              <tr key={item.Behandlungs_Patienten_ID}>
                <td>{item.Behandlungs_Patienten_ID}</td>
                {editRowIndex === index ? (
                  <>
                    <td>
                      <input
                        id={`patientid-${index}`}
                        type="text"
                        defaultValue={item.PatientID}
                      />
                    </td>
                    <td>
                      <button
                        className="save-button"
                        onClick={() => handleSave(index, "behandlungenpa")}
                      >
                        Speichern
                      </button>
                      <button
                        className="cancel-button"
                        onClick={() => handleCancel()}
                      >
                        Abbrechen
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.PatientID}</td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(index, "behandlungenpa")}
                      >
                        Bearbeiten
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(index, "behandlungenpa")}
                      >
                        Löschen
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Behandlungen_Ärzte */}
      <div className="center-content">
        <h2>Behandlungen_Ärzte</h2>
        <table>
          <thead>
            <tr>
              <th>Behandlungs_Ärzte_ID</th>
              <th>ArztID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {behandlungenar.map((item, index) => (
              <tr key={item.Behandlungs_arzte_ID}>
                <td>{item.Behandlungs_arzte_ID}</td>
                {editRowIndex === index ? (
                  <>
                    <td>
                      <input
                        id={`arztid-${index}`}
                        type="text"
                        defaultValue={item.ArztID}
                      />
                    </td>
                    <td>
                      <button
                        className="save-button"
                        onClick={() => handleSave(index, "behandlungenar")}
                      >
                        Speichern
                      </button>
                      <button
                        className="cancel-button"
                        onClick={() => handleCancel()}
                      >
                        Abbrechen
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.ArztID}</td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(index, "behandlungenar")}
                      >
                        Bearbeiten
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(index, "behandlungenar")}
                      >
                        Löschen
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Verwaltung;
