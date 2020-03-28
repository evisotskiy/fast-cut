import React from 'react';

export const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Link</h2>

      <p>
        Original:{' '}
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>
      <p>
        Shortcut:{' '}
        <a href={link.to} target="_blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        Link clicks amount: <strong>{link.clicks}</strong>
      </p>
      <p>
        Creation date: <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </>
  );
};
