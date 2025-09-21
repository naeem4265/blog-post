import React, { useState, useEffect } from 'react';
import { getVersion } from '../services/api';

export default function Version() {
  const [version, setVersion] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const data = await getVersion();
        setVersion(data.version);
      } catch (err) {
        console.error('Error fetching version:', err);
        setError('Failed to load version information');
      } finally {
        setLoading(false);
      }
    };

    fetchVersion();
  }, []);

  if (loading) return <div>Loading version information...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Application Version</h2>
      <div style={{
        display: 'inline-block',
        padding: '1rem 2rem',
        margin: '1rem 0',
        backgroundColor: '#f0f0f0',
        borderRadius: '4px',
        fontFamily: 'monospace',
        fontSize: '1.2rem'
      }}>
        {version}
      </div>
      <p>
        <a href="/">Back to Home</a>
      </p>
    </div>
  );
}
