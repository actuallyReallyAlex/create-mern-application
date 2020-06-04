import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import useMedia from '../hooks/useMedia';

const Info: React.SFC<{}> = () => {
  const columnSize = useMedia(
    ['(min-width: 1000px)', '(min-width: 600px)'],
    ['column-40', ''],
    '',
  );

  return (
    <div
      className={`column ${columnSize} flex-center ${
        columnSize === '' && 'margin-bottom-md margin-top-lg'
      }`}
    >
      <h1 className="blue" style={{ fontSize: '4.2rem' }}>
        create-mern-application
      </h1>
      <blockquote className="purple-quote">
        A bootstrapper for creating a MERN application.
      </blockquote>
      <span className="badge margin-bottom-md">
        <FontAwesomeIcon icon={faBox} />
        <span className="margin-left-sm">21.8kb gzipped</span>
      </span>
      <a
        className="blue"
        href="https://github.com/alexlee-dev/create-mern-application"
        rel="noopener noreferrer"
        target="_blank"
      >
        <FontAwesomeIcon icon={faExternalLinkAlt} />
        <span className="margin-left-sm">View Documentation</span>
      </a>
    </div>
  );
};

export default Info;
