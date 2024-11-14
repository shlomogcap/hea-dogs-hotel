#!/bin/bash

name=$1
path=${2:-"./src/lib/components/"}

mkdir -p "${path}/${name}"
touch "${path}/${name}/${name}.styled.ts"
touch "${path}/${name}/${name}.tsx"
touch "${path}/${name}/${name}.types.ts"
touch "${path}/${name}/${name}.utils.ts"
touch "${path}/${name}/${name}.consts.ts"
touch "${path}/${name}/index.ts"

echo "Folder structure created at ${path}/${name}"

# Add contents to created files
echo "import { I${name}Props } from './${name}.types';

export const ${name} = (props: I${name}Props) => {
  return <></>;
};" > "${path}/${name}/${name}.tsx"

echo "export type I${name}Props = {};" > "${path}/${name}/${name}.types.ts"

echo "import styled from 'styled-components';

export const Styled${name} = styled.div\`\`;" > "${path}/${name}/${name}.styled.ts"

echo "export { ${name} } from './${name}';

export * from './${name}.types';" > "${path}/${name}/index.ts"


echo "Default data added to files"