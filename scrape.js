var puppeteer = require('puppeteer');
const SearchTerm = "men's watch";
async function amazonSearch() {
  try{
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.amazon.com');
  await page.click('#twotabsearchtextbox');
  await page.keyboard.type(SearchTerm);
  await page.click('.nav-input');
  await page.waitFor(750);
  await page.screenshot({path: './screenshots/amazon.png'});
  await browser.close();
}catch(err){console.log(err)};
}
async function walmartSearch() {
  try{
  const website = 'https://www.walmart.com';
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(website);
  await page.click('#global-search-input');
  await page.keyboard.type(SearchTerm);
  await page.click('#global-search-submit');
  await page.waitFor(750);
  await page.screenshot({path: './screenshots/walmart.png'});
  const items = await page.evaluate(() => {
    const data = [];
    const titleTextSearch = 'a.product-title-link';
    const priceTextSearch = 'div.product-price-with-fulfillment span.price-main-block span.visuallyhidden';
    const imageTextSearch = 'img';
    const grabInfo = (item) => {
      if(item.querySelector(titleTextSearch) && item.querySelector(priceTextSearch)){
      title = item.querySelector(titleTextSearch).title.trim();
      price = item.querySelector(priceTextSearch).innerText.trim();
      image = item.querySelector(imageTextSearch).src.trim();
      sourcePage = "https://walmart.com/"+item.querySelector(titleTextSearch).href.trim();
    }};
    const allItems = document.querySelectorAll('li.u-size-6-12');
    let i=0;
    for(const a of allItems) {
      i++;
      grabInfo(a);
      console.log('title: ',a.title);
      data.push({
        count: i,
        title,
        price,
        image,
        sourcePage
    });
  }
  return data;
  });
  console.log(JSON.stringify(items));
  await browser.close();
}catch (err){console.log(err)}}
walmartSearch();
amazonSearch();