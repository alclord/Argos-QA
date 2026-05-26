/**
 * cy.login() — autentica no ambiente canário usando cy.session() para cache entre specs.
 *
 * Login page: /login
 *   - input#email
 *   - input#password
 *   - button "Login"
 *
 * A sessão é mantida no localStorage (auth-storage, user_token_login_info, user-storage).
 */
Cypress.Commands.add('login', () => {
  cy.session(
    'operador-canario',
    () => {
      cy.visit('/login');
      cy.get('input#email').type(Cypress.env('CANARY_EMAIL'));
      cy.get('input#password').type(Cypress.env('CANARY_PASSWORD'), { log: false });
      cy.contains('button', 'Login').click();
      cy.url().should('include', '/chat');
      cy.get('.tiptap, [data-testid="tab-filter-trigger"]').should('exist');
    },
    {
      cacheAcrossSpecs: true,
      validate() {
        // Valida que a sessão ainda existe no localStorage
        cy.window().its('localStorage').invoke('getItem', 'auth-storage').should('not.be.null');
      },
    }
  );
});

/**
 * cy.typeMessage(text) — digita no editor TipTap (ProseMirror).
 *
 * O editor é um div[contenteditable] com classe .tiptap.ProseMirror.
 * É necessário clicar antes de digitar para garantir o foco.
 */
Cypress.Commands.add('typeMessage', (text) => {
  cy.get('.tiptap.ProseMirror').click().type(text);
});

/**
 * cy.sendMessage(text) — digita e envia uma mensagem via Enter.
 * Retorna um alias @sentText com o texto enviado para uso em asserções.
 */
Cypress.Commands.add('sendMessage', (text) => {
  cy.wrap(text).as('sentText');
  cy.typeMessage(text);
  cy.get('.tiptap.ProseMirror').type('{enter}');
});
