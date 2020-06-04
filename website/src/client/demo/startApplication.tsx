import GDemo from '@glorious/demo';
import { clearDemo } from './util';

const startApplication = ({ setApplicationStarted, setCurrentDemo }): void => {
  clearDemo();
  setCurrentDemo('start');
  const demo = new GDemo('#demo');

  demo
    .openApp('terminal', {
      minHeight: '482px',
      promptString: '$',
      windowTitle: 'create-mern-application',
    })
    .command('cd cool-app')
    .command('npm run build && npm start', {
      onCompleteDelay: 1000,
      promptString: 'cool-app/$',
    })
    .end()
    .then(() => setApplicationStarted(true));
};

export default startApplication;
