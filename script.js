import React, { useState } from 'react';

const SKOLER = {
  'haugaland-vgs': {
    navn: 'Haugaland VGS',
    utganger: ['C', 'B', 'F', 'D', 'A', 'J']
  }
};

function FireDrillApp() {
  const [skoleId, setSkoleId] = useState('');
  const [alarmType, setAlarmType] = useState('Test');
  const [klasser, setKlasser] = useState([]);
  const [nyttNavn, setNyttNavn] = useState('');
  const valgtSkole = SKOLER[skoleId];

  const toggleTilstede = (id) => {
    setKlasser(klasser.map(k => k.id === id ? { ...k, tilstede: !k.tilstede } : k));
  };

  const endreUtgang = (id, utgang) => {
    setKlasser(klasser.map(k => k.id === id ? { ...k, utgang } : k));
  };

  const leggTilKlasse = (e) => {
    e.preventDefault();
    if (!nyttNavn.trim()) return;
    const nyKlasse = { id: Date.now(), navn: nyttNavn.toUpperCase(), tilstede: false, utgang: '' };
    setKlasser([...klasser, nyKlasse]);
    setNyttNavn('');
  };

  const slettKlasse = (id) => {
    setKlasser(klasser.filter(k => k.id !== id));
  };

  const isEkte = alarmType === 'Ekte';

  return (
    <div className={`container ${isEkte ? 'emergency-mode' : ''}`}>
      <div className="header">
        <h1>Brann-alarm check</h1>
        <p>Registrering av klasser under brannøvelse</p>
      </div>

      <section className="school-box">
        <div>
          <label htmlFor="schoolSelect">Skole</label>
          <p>Velg skole for å vise skolens godkjente utganger</p>
        </div>
        <select id="schoolSelect" value={skoleId} onChange={e => {
          setSkoleId(e.target.value);
          setKlasser(klasser.map(k => ({ ...k, utgang: '' })));
        }}>
          <option value="">Velg skole</option>
          {Object.entries(SKOLER).map(([id, skole]) => (
            <option key={id} value={id}>{skole.navn}</option>
          ))}
        </select>
      </section>

      <div className={`alarm-box ${isEkte ? 'emergency-box' : ''}`}>
        <div>
          <label>Alarmtype</label>
          <p>Velg om dette er en test eller ekte alarm</p>
        </div>
        <div className="alarm-options" role="group" aria-label="Alarmtype">
          <button type="button" className={`alarm-option ${!isEkte ? 'active' : ''}`} aria-pressed={!isEkte} onClick={() => setAlarmType('Test')}>Test / Øvelse</button>
          <button type="button" className={`alarm-option ${isEkte ? 'active' : ''}`} aria-pressed={isEkte} onClick={() => setAlarmType('Ekte')}>Ekte Alarm</button>
        </div>
      </div>

      <form onSubmit={leggTilKlasse} className="add-form">
        <input
          type="text"
          placeholder="Legg til ny klasse"
          aria-label="Klassenavn"
          value={nyttNavn}
          onChange={e => setNyttNavn(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary">Legg til</button>
      </form>

      <div className="section-title">Klasseliste</div>
      <div className="class-list">
        {klasser.length === 0 ? (
          <div className="empty-state">Ingen klasser lagt til ennå.</div>
        ) : (
          klasser.map(kl => (
            <div key={kl.id} className={`class-item ${kl.tilstede ? 'present' : ''}`}>
              <div className="class-info">
                <span className="class-name">{kl.navn}</span>
                <span className={`status-badge ${kl.tilstede ? 'present' : 'absent'}`}>
                  {kl.tilstede ? 'På plass (Ja)' : 'Ikke på plass (Nei)'}
                </span>
                {valgtSkole && (
                  <label className="exit-label">
                    Utgang
                    <select aria-label={`Utgang for ${kl.navn}`} value={kl.utgang} onChange={e => endreUtgang(kl.id, e.target.value)}>
                      <option value="">Velg utgang</option>
                      {valgtSkole.utganger.map(utgang => (
                        <option key={utgang} value={utgang}>Utgang {utgang}</option>
                      ))}
                    </select>
                  </label>
                )}
              </div>
              <div className="class-actions">
                <button type="button" onClick={() => toggleTilstede(kl.id)} className={`btn-toggle ${kl.tilstede ? 'make-absent' : 'make-present'}`}>
                  {kl.tilstede ? 'Endre til Nei' : 'Kryss av (Ja)'}
                </button>
                <button type="button" onClick={() => slettKlasse(kl.id)} className="btn-delete" title="Slett klasse" aria-label={`Slett ${kl.navn}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 01-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FireDrillApp;
