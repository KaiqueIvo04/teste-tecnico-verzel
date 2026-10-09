import { test, expect } from '@playwright/test';

test('CT-001 - Aplicar cupom de desconto válido na compra', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('article', { name: 'Mochila Urbana 20L' }).getByRole('button').click();

  await page.getByRole('link', { name: 'Carrinho 1 itens no carrinho' }).click();

  await page.getByRole('textbox', { name: 'Cupom de desconto' }).click();
  await page.getByRole('textbox', { name: 'Cupom de desconto' }).fill('BEMVINDO10');
  await page.getByRole('textbox', { name: 'Cupom de desconto' }).press('Enter');

  // Validar aplicação do cupom
  await expect(
    page.getByText('Cupom BEMVINDO10 aplicado.')
  ).toBeVisible();

  // Validar desconto
  await expect(
    page.getByText('Desconto (BEMVINDO10)')
  ).toBeVisible();

  await expect(
    page.getByText('- R$ 10,00')
  ).toBeVisible();

  // Validar total
  await expect(
    page.getByText('R$ 109,90', { exact: true })
  ).toBeVisible();
});

