const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  const delay = ms => new Promise(res => setTimeout(res, ms));

  console.log('Visiting /');
  await page.goto('http://localhost:3000/');
  await delay(1000);

  console.log('Visiting /admin');
  await page.goto('http://localhost:3000/admin');
  await delay(1000);

  console.log('Visiting /events');
  await page.goto('http://localhost:3000/events');
  await delay(1000);

  console.log('Visiting /event/1');
  await page.goto('http://localhost:3000/event/1');
  await delay(1000);

  console.log('Visiting /creator/1');
  await page.goto('http://localhost:3000/creator/1');
  await delay(1000);

  console.log('Visiting /article/test/1');
  await page.goto('http://localhost:3000/article/test/1');
  await delay(1000);

  await browser.close();
})();
