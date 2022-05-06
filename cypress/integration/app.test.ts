describe('App', () => {
  it('Card CreateボタンをクリックしBoardにCardの作成', () => {
    cy.visit('/signin', { log: true })
    cy.title().should('eq', 'React App')
    // eslint-disable-next-line testing-library/await-async-utils
    cy.wait(100)
    let _csrf: any
    cy.getCookie('_csrf', { log: true })
      .should('exist')
      .then((c: any) => {
        _csrf = c
      })

    cy.get('[data-testid=signin-button]')
      .click()
      .then(() => {
        cy.request({
          url: '  http://localhost:8888/api/v1/auth/signin',
          headers: {
            _csrf: _csrf.value,
          },
        })
      })

    // TODO: _csrfの渡し方
    cy.get('[data-testid=card-create-button]').click()
    // cy.get('[data-testid=title-input]').type('test title')
    // cy.get('[data-testid=body-textarea]').type('test body')
    // cy.get('select').select('todo')
    // cy.get('[data-testid=card-modal-create-and-update-button').click()
  })
  // it('Cardをマウスオーバー', () => {
  //   cy.get('[data-testid=card-1]').trigger('mouseover')
  // })
  // it('Cardをクリックしupdateモーダルの表示', () => {
  //   cy.get('[data-testid=card-1]').click()
  //   cy.get('[data-testid=card-modal-close-button').click()
  // })
})
