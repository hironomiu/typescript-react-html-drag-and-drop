# typescript-react-html-drag-and-drop

HTML Drag & Drop API を利用したドラッグ&ドロップ

## Run

```
npm start
```

## Testing

### testing-library/react

```
npm test -- --coverage .
```

### Cypress

```
npm run cy:open
```

```
npm run cy:run
```

## Install Memo

```
npx create-react-app . --template typescript
```

## Tailwind

[Tailwind create-react-app](https://tailwindcss.com/docs/guides/create-react-app)

### Testing

React v18 に対応させるためバージョンアップさせる

```
npm install --save-dev @testing-library/react@latest
npm install --save-dev @testing-library/jest-dom@latest
npm install --save-dev @testing-library/user-event@latest
```

#### Cypress

```
npm install --save-dev cypress
```

`package.json` -> `scripts`

```
  "cy:open": "cypress open",
  "cy:run": "cypress run",
  "cy:run:chrome": "cypress run --browser chrome",
  "cy:run:firefox": "cypress run --browser firefox"
```

open(`./cypress`が作成されること。されたら開いた cypress ブラウザは閉じる)

```
npm run cy:open
```

`cypress.json` port は適時修正する

```
{
    "baseUrl": "http://localhost:3000"
}
```

GUI での sample テスト(`./cypress/integration/`配下にあるサンプルは削除し改めて`sample.test.ts`を配置)

```
// cli用（ワーニングは一旦無視）
import { cli } from 'cypress'

describe('Cypress', () => {
  it('Cypress動作確認', () => {
    expect(true).equal(true)
  })

  it('アプリの表示', () => {
    cy.visit('/')
  })
})
```

アプリの起動

```
npm start
```

Cypress を open しテスト

```
npm run cy:open
```

cli run

```
npm run cy:run
```

### redux-toolkit

```
npm install react-redux @types/react-redux @reduxjs/toolkit @types/node redux @types/redux
```
