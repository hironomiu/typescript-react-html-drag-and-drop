// cli用（ワーニングは一旦無視）
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { cli } from 'cypress'

describe('Cypress', () => {
  it('Cypress動作確認', () => {
    expect(true).equal(true)
  })

  it('アプリの表示', () => {
    cy.visit('/')
  })
})
