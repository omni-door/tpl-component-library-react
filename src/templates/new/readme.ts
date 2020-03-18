export default function (config: {
  componentName: string;
  ts: boolean;
}) {
  const { componentName, ts } = config;

  return `# ${componentName}

## Example

\`\`\`${ts ? 'typescript' : 'javascript'}
<${componentName} />
\`\`\``;
}

