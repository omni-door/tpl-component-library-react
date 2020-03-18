export default function (config: {
  name: string;
  configFileName: string;
}) {
  const { name, configFileName } = config;

  return `# ${name}

## Run your project

\`\`\`shell
npm start
\`\`\`
or
\`\`\`shell
npm run dev
\`\`\`

## Create a Component by the Template

### Class Component
\`\`\`shell
npm run new [componentName]
\`\`\`

### Functional Component
\`\`\`shell
npm run new [componentName] -- -f
\`\`\`

## Build your project

\`\`\`shell
npm run build
\`\`\`

### Ignore pre-check
\`\`\`shell
npm run build -- -n
\`\`\`

## Release your project

\`\`\`shell
npm run release
\`\`\`

### Ignore automatic iteration of version
\`\`\`shell
npm run release -- -i
\`\`\`

### Manual iteration of version
\`\`\`shell
npm run release -- -m 0.3.25
\`\`\`

### Ignore pre-check
\`\`\`shell
npm run release -- -n
\`\`\`

**More powerful customizations is in [${configFileName}]**
`;
}

