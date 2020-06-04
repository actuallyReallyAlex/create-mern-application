import GDemo from '@glorious/demo';
import { clearDemo } from './util';

const createApplication = ({ setApplicationCreated, setCurrentDemo }): void => {
  clearDemo();
  setCurrentDemo('create');
  const demo = new GDemo('#demo');

  demo
    .openApp('terminal', {
      minHeight: '506px',
      promptString: '$',
      windowTitle: 'create-mern-application',
    })
    .command('create-mern-application cool-app', { onCompleteDelay: 500 })
    .end()
    .then(() => setApplicationCreated(true));
};

export default createApplication;
