/**
 * Suite: Autenticação — Login e Logout (Canário)
 *
 * Cobre fluxos críticos de autenticação do operador.
 * Seletores validados contra /login da interface canário.
 *
 * Critérios de aceite cobertos:
 *   - Login com credenciais válidas redireciona para /chat
 *   - Login com credenciais inválidas exibe mensagem de erro
 *   - Logout limpa a sessão e redireciona para /login
 *   - Rota protegida sem sessão redireciona para /login
 */

describe('Autenticação - Login e Logout', () => {
  // ─────────────────────────────────────────────
  // CT-AUTH-001 — Login com credenciais válidas
  // ─────────────────────────────────────────────
  it('CT-AUTH-001 - deve autenticar operador com credenciais válidas e redirecionar para /chat', () => {
    cy.visit('/login');
    cy.get('input#email').type(Cypress.env('CANARY_EMAIL'));
    cy.get('input#password').type(Cypress.env('CANARY_PASSWORD'), { log: false });
    cy.contains('button', 'Login').click();

    cy.url().should('include', '/chat');
    cy.get('.tiptap, [data-testid="tab-filter-trigger"]').should('exist');
  });

  // ─────────────────────────────────────────────
  // CT-AUTH-002 — Login com senha inválida
  // ─────────────────────────────────────────────
  it('CT-AUTH-002 - deve exibir erro ao logar com senha incorreta', () => {
    cy.visit('/login');
    cy.get('input#email').type(Cypress.env('CANARY_EMAIL'));
    cy.get('input#password').type('senha-invalida-argos-qa', { log: false });
    cy.contains('button', 'Login').click();

    cy.url().should('include', '/login');
    cy.get('body').should('contain.text', /incorret|inválid|erro|unauthorized/i);
  });

  // ─────────────────────────────────────────────
  // CT-AUTH-003 — Login com email inválido
  // ─────────────────────────────────────────────
  it('CT-AUTH-003 - deve exibir erro ao logar com email que não existe', () => {
    cy.visit('/login');
    cy.get('input#email').type('email-inexistente-argos@example.com');
    cy.get('input#password').type('qualquer-senha', { log: false });
    cy.contains('button', 'Login').click();

    cy.url().should('include', '/login');
    cy.get('body').should('contain.text', /incorret|inválid|erro|unauthorized/i);
  });

  // ─────────────────────────────────────────────
  // CT-AUTH-004 — Logout limpa sessão
  // ─────────────────────────────────────────────
  it('CT-AUTH-004 - deve fazer logout, limpar sessão e redirecionar para /login', () => {
    cy.login();
    cy.visit('/chat');
    cy.url().should('include', '/chat');

    // Abre menu de usuário e clica em logout
    cy.get('[data-testid="user-menu-trigger"], [aria-label*="usuário"], [aria-label*="perfil"]')
      .first()
      .click();
    cy.contains(/sair|logout/i).click();

    cy.url().should('include', '/login');

    // Sessão deve estar limpa no localStorage
    cy.window().its('localStorage').invoke('getItem', 'auth-storage').should('be.null');
  });

  // ─────────────────────────────────────────────
  // CT-AUTH-005 — Rota protegida redireciona para login
  // ─────────────────────────────────────────────
  it('CT-AUTH-005 - acesso direto a /chat sem sessão deve redirecionar para /login', () => {
    // Garante que não há sessão ativa
    cy.clearLocalStorage();
    cy.clearCookies();

    cy.visit('/chat', { failOnStatusCode: false });
    cy.url().should('include', '/login');
  });
});
