export default function (config: {
  name: string;
}) {
  const { name } = config;

  return `---
name: -${name}
route: /
---
# ${name}

## 导航
| 组件 | 开发/维护 |
| --- | --- |
`;
}