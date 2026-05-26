/**
 * Suite: Perfil e Status do Operador (Canário)
 *
 * Cobre os fluxos de visualização e alteração de status de presença do operador.
 *
 * Critérios de aceite cobertos:
 *   - Operador pode visualizar seu perfil
 *   - Operador pode alterar status de disponibilidade
 *   - Status alterado persiste após reload
 *   - Status exibido na interface reflete o estado atual
 */

describe('Perfil e Status do Operador', () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/chat');
    cy.get('[data-testid="tab-filter-trigger"], .tiptap').should('exist');
  });

  // ─────────────────────────────────────────────
  // CT-PERFIL-001 — Visualizar perfil do operador
  // ─────────────────────────────────────────────
  it('CT-PERFIL-001 - deve exibir informações do perfil ao acessar menu do usuário', () => {
    cy.get('[data-testid="user-menu-trigger"], [aria-label*="usuário"], [aria-label*="perfil"]')
      .first()
      .click();

    // O email do operador deve aparecer no menu/perfil
    cy.get('body').should('contain.text', Cypress.env('CANARY_EMAIL'));
  });

  // ─────────────────────────────────────────────
  // CT-PERFIL-002 — Alterar status para Indisponível
  // ─────────────────────────────────────────────
  it('CT-PERFIL-002 - deve alterar status do operador para Indisponível', () => {
    // Abre seletor de status
    cy.get('[data-testid="presence-selector"], [data-testid="status-selector"], [aria-label*="status"]')
      .first()
      .click();

    // Seleciona "Indisponível"
    cy.contains(/indisponível|offline|ausente/i).click();

    // Interface deve refletir o novo status
    cy.get('[data-testid="presence-indicator"], [data-testid="status-badge"]')
      .should('contain.text', /indisponível|offline|ausente/i);
  });

  // ─────────────────────────────────────────────
  // CT-PERFIL-003 — Alterar status para Disponível
  // ─────────────────────────────────────────────
  it('CT-PERFIL-003 - deve alterar status do operador de volta para Disponível', () => {
    // Garante que o status está como Indisponível primeiro
    cy.get('[data-testid="presence-selector"], [data-testid="status-selector"], [aria-label*="status"]')
      .first()
      .click();
    cy.contains(/indisponível|offline|ausente/i).click();

    // Agora altera para Disponível
    cy.get('[data-testid="presence-selector"], [data-testid="status-selector"], [aria-label*="status"]')
      .first()
      .click();
    cy.contains(/disponível|online|ativo/i).click();

    cy.get('[data-testid="presence-indicator"], [data-testid="status-badge"]')
      .should('contain.text', /disponível|online|ativo/i);
  });

  // ─────────────────────────────────────────────
  // CT-PERFIL-004 — Status persiste após reload
  // ─────────────────────────────────────────────
  it('CT-PERFIL-004 - status definido deve persistir após reload da página', () => {
    // Define status como Indisponível
    cy.get('[data-testid="presence-selector"], [data-testid="status-selector"], [aria-label*="status"]')
      .first()
      .click();
    cy.contains(/indisponível|offline|ausente/i).click();

    // Recarrega a página
    cy.reload();
    cy.get('[data-testid="tab-filter-trigger"], .tiptap').should('exist');

    // Status deve manter Indisponível
    cy.get('[data-testid="presence-indicator"], [data-testid="status-badge"]')
      .should('contain.text', /indisponível|offline|ausente/i);

    // Cleanup: volta para Disponível
    cy.get('[data-testid="presence-selector"], [data-testid="status-selector"], [aria-label*="status"]')
      .first()
      .click();
    cy.contains(/disponível|online|ativo/i).click();
  });
});
