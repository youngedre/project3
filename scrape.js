const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const db = require("./models/StoreSearch");


mongoose.connect("mongodb://localhost/ShoppingDatabase", { useNewUrlParser: true });

const SearchTerm = "mens shoes";
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
}catch(err){console.log(err);}
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
    const storeSource = 'Walmart';
    let data = [];
    const titleTextSearch = 'a.product-title-link';
    const priceTextSearch = 'div.product-price-with-fulfillment span.price-main-block span.visuallyhidden';
    const imageTextSearch = 'img';
    const grabInfo = (item) => {
      if(item.querySelector(titleTextSearch) && item.querySelector(priceTextSearch)){
      title = item.querySelector(titleTextSearch).title.trim();
      price = item.querySelector(priceTextSearch).innerText.trim();
      image = item.querySelector(imageTextSearch).src.trim();
      itemLink = "https://walmart.com/"+item.querySelector(titleTextSearch).href.trim();
    }};
    const allItems = document.querySelectorAll('li.u-size-6-12');
    let i=0;
    for(a of allItems) {
      grabInfo(a);
      // console.log('title: ',a.title);
      data.push({
        title,
        price,
        image,
        itemLink,
        storeSource 
    });
    // console.log(data);
  }
  return data;
  });
  console.log(items);

  for (let k=0; k<Math.min(items.length, 15); k++) {
    // console.log("Element test: ", element);
    try{db.create(items[k]);}
    catch(err){console.log(err);}
  }
  // items.forEach(element => {db.StoreSearch.create(element).then(res => console.log(res)).catch(err => console.log(err));});
  console.log("Check database");
  await browser.close();
}catch (err){console.log(err);}}
walmartSearch();
// amazonSearch();