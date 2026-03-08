import { expect, test } from '@playwright/test';

const STORAGE_KEY = 'tc-v2';

async function loadWithState(page, state) {
  await page.addInitScript(
    ([key, value]) => {
      window.localStorage.clear();
      if (value !== null) {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    },
    [STORAGE_KEY, state]
  );

  await page.goto('/');
}

test('fresh load shows a clean default state', async ({ page }) => {
  await loadWithState(page, null);

  await expect(page.locator('#from-inp')).toHaveValue('');
  await expect(page.locator('#origin-tz')).toHaveText('e.g. UTC+09:00');
  await expect(page.locator('#err-city')).not.toBeVisible();
  await expect(page.locator('.dest-card')).toHaveCount(1);
});

test('malformed saved state is ignored on restore', async ({ page }) => {
  await loadWithState(page, {
    cityName: '',
    tz: 'Asia/Shanghai',
    fmt: 24,
    date: '',
    time: '',
    dests: [
      { cityName: '', tz: 'Asia/Tokyo', fmt: 24, permanent: true },
      { cityName: 'New York, USA', tz: '', fmt: 12, permanent: false }
    ]
  });

  await expect(page.locator('#from-inp')).toHaveValue('');
  await expect(page.locator('#origin-tz')).toHaveText('e.g. UTC+09:00');
  await expect(page.locator('#err-city')).not.toBeVisible();
  await expect(page.locator('.dest-card')).toHaveCount(1);
});

test('valid saved state restores the session cleanly', async ({ page }) => {
  await loadWithState(page, {
    cityName: 'Shanghai, China',
    tz: 'Asia/Shanghai',
    fmt: 24,
    date: '2026-03-08',
    time: '09:30',
    dests: [
      { cityName: 'Tokyo, Japan', tz: 'Asia/Tokyo', fmt: 24, permanent: true }
    ]
  });

  await expect(page.locator('#from-inp')).toHaveValue('Shanghai, China');
  await expect(page.locator('#origin-tz')).toHaveText('UTC+08:00');
  await expect(page.locator('#err-city')).not.toBeVisible();
  await expect(page.locator('.dest-card')).toHaveCount(1);
  await expect(page.locator('.c-city-inp')).toHaveValue('Tokyo, Japan');
  await expect(page.locator('.c-tz')).not.toHaveText('e.g. UTC+09:00');
  await expect(page.locator('.c-time')).not.toHaveText('e.g. 09:00');
});

test('clearing the origin does not resurrect stale saved state on reload', async ({ page }) => {
  await loadWithState(page, {
    cityName: 'Shanghai, China',
    tz: 'Asia/Shanghai',
    fmt: 24,
    date: '2026-03-08',
    time: '09:30',
    dests: [
      { cityName: 'Tokyo, Japan', tz: 'Asia/Tokyo', fmt: 24, permanent: true }
    ]
  });

  await page.locator('#from-inp').fill('');
  await page.reload();

  await expect(page.locator('#from-inp')).toHaveValue('');
  await expect(page.locator('#origin-tz')).toHaveText('e.g. UTC+09:00');
  await expect(page.locator('#err-city')).not.toBeVisible();
  await expect(page.locator('.dest-card')).toHaveCount(1);
});
