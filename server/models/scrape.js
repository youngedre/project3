const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const db = require("./StoreSearch");
const searchFunctions = {amazonSearch, walmartSearch};
mongoose.connect("mongodb://localhost/ShoppingDatabase", { useNewUrlParser: true });
const SearchTerm = "mens watch";
async function amazonSearch(searchedTerm) {
  try{
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.amazon.com');
  await page.click('#twotabsearchtextbox');
  await page.keyboard.type(searchedTerm);
  await page.click('.nav-input');
  await page.waitFor(750);
  await page.screenshot({path: './screenshots/amazon.png'});
  await browser.close();
}catch(err){console.log(err);}
}
async function walmartSearch(searchedTerm) {
  try{
    // console.log(a);
    // let searchedTerm = a;
    const website = 'https://www.walmart.com';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(website);
    await page.click('#global-search-input');
    await page.keyboard.type(searchedTerm);
    await page.click('#global-search-submit');
    await page.waitFor(750);
    await page.screenshot({path: './screenshots/walmart.png'});
  const items = await page.evaluate((searchedTerm) => {
    // console.log(a);
    let storeSource = 'Walmart';
    let data = [];
    const titleTextSearch = 'a.product-title-link';
    const priceTextSearch = 'div.product-price-with-fulfillment span.price-main-block span.visuallyhidden';
    const imageTextSearch = 'img';
    const grabInfo = (item) => {
      if(item.querySelector(titleTextSearch) && item.querySelector(priceTextSearch)){
      title = item.querySelector(titleTextSearch).title.trim();
      price = item.querySelector(priceTextSearch).innerText.trim();
      image = item.querySelector(imageTextSearch).src.trim();
      itemLink = item.querySelector(titleTextSearch).href.trim();
    }};
    const allItems = document.querySelectorAll('li.u-size-6-12');
    for(b of allItems) {
      grabInfo(b);
      // console.log('title: ',a.title);
      data.push({
        title,
        price,
        image,
        itemLink,
        storeSource,
        searchedTerm
    });
    // console.log(data);
  }
  return data;
  }, searchedTerm);
  // console.log(items);
  for (let k=0; k<Math.min(items.length, 15); k++) {
    // console.log("Element test: ", element);
    try{db.create(items[k]);}
    catch(err){console.log(err);}
  }
  // items.forEach(element => {db.StoreSearch.create(element).then(res => console.log(res)).catch(err => console.log(err));});
  console.log("Check database")
  await browser.close();
  return items
}catch (err){console.log(err);}}
// walmartSearch("watches");
// walmartSearch("chicken");
// walmartSearch("phones");
// amazonSearch();
module.exports = searchFunctions