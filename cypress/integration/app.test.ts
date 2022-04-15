describe('App', () => {
  it('Card CreateボタンをクリックしBoardにCardの作成', () => {
    cy.visit('/')
    cy.get('[data-testid=card-create-button]').click()
  })
})
