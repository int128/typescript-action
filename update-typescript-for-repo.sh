#!/bin/bash
set -eux

cd ~/repo

if gh repo clone "$1"; then
  cd "$1"
else
  cd "$1"
  git fom
fi

git cob update-typescript-config

cp -v ../typescript-action/tsconfig.json .
yarn add -D @tsconfig/node16@1.0.2
git add .
git commit -m 'Update tsconfig.json' || true

cp -v ../typescript-action/.eslintrc.js .
rm -fv .eslintrc.json
yarn lint
git add .
git commit -m 'Update .eslintrc.js' || true

yarn remove jest-circus
git add .
git commit -m 'yarn remove jest-circus' || true

gh pr create -f --title 'Update TypeScript config' --body '
- Update tsconfig.json
- Update .eslintrc.js
- yarn remove jest-circus
'
