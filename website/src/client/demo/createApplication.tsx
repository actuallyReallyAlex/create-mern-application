import GDemo from '@glorious/demo';
import { clearDemo } from './util';

const createApplication = ({ setApplicationCreated, setCurrentDemo }): void => {
  clearDemo();
  setCurrentDemo('create');
  const demo = new GDemo('#demo');

  demo
    .openApp('terminal', {
      minHeight: '500px',
      promptString: '$',
      windowTitle: 'create-cli-application',
    })
    .command('create-mern-application cool-app', { onCompleteDelay: 500 })
    .respond(
      `<div>Creating a new MERN app in <span class="blue">/cool-app</span>`,
    )
    .respond(`<div>Source Language: <span class="blue">JavaScript</span>`)
    .respond(
      `<div><span class="green">✔</span> Application Directory and package.json created successfully`,
      {
        onCompleteDelay: 1250,
      },
    )
    .respond(
      `<div><span class="green">✔</span> Dependencies installed successfully`,
      {
        onCompleteDelay: 1250,
      },
    )
    .respond(
      `<div><span class="green">✔</span> DevDependencies installed successfully`,
      {
        onCompleteDelay: 1250,
      },
    )
    .respond(
      `<div><span class="green">✔</span> Template files copied successfully`,
      {
        onCompleteDelay: 1250,
      },
    )
    .respond(
      `<div><span class="green">✔</span> Source files built successfully`,
      {
        onCompleteDelay: 1250,
      },
    )
    .respond(
      `<div><span class="green">✔</span> Dependencies cleaned successfully`,
      {
        onCompleteDelay: 1250,
      },
    )
    .respond(
      `<div><span class="green">✔</span> Values in template files replaced successfully`,
      {
        onCompleteDelay: 1250,
      },
    )
    .respond(
      `<div><span class="green">Success!</span> Created <span class="blue">cool-app</span> at <span class="blue">/cool-app</span>`,
    )
    .respond(`Inside that directory, you can run several commands:`)
    .respond(`<div><span class="blue margin-left-sm">npm run build</span>`)
    .respond(`   Creates a local build.`)
    .respond(`<div><span class="blue margin-left-sm">  npm start</span>`)
    .respond(`   Starts the application on your machine.`)
    .respond(`We suggest that you begin by typing:`)
    .respond(`<div><span class="blue termninal-margin">  cd /cool-app</span>`)
    .respond(
      `<div><span class="blue margin-left-sm">  npm run build && npm start</span>`,
    )
    .respond(
      `<div><span class="blue">NOTE</span>: Please be sure to have your MongoDB instance running, prior to starting your application.</div>`,
    )
    .respond(`<div><span class="blue">Happy creating!</span>`)
    .command('')
    .end()
    .then(() => setApplicationCreated(true));
};

export default createApplication;
