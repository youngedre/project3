const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const db = require("../StoreSearch");
mongoose.connect("mongodb://localhost/ShoppingDatabase", { useNewUrlParser: true });

function wait (ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms))
}

async function walmartSearch(searchBarTerm) {
  try{
    const website = 'https://www.walmart.com';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(website+'/search/?query='+searchBarTerm, {waitUntil: 'load'});
    const bodyHandle = await page.$('body');
    const { height } = await bodyHandle.boundingBox();
    await bodyHandle.dispose();

    const viewportHeight = page.viewport().height;
    let viewportIncr = 0;
    while(viewportIncr +viewportHeight <height ){
        await page.evaluate(_viewportHeight => {
            window.scrollBy(0, _viewportHeight);
        }, viewportHeight);
        await wait(20);
        viewportIncr = viewportIncr + viewportHeight
    }
    await page.evaluate(_ => {
        window.scrollTo(0, 0)
    });
    await wait(100);
  const items = await page.evaluate((searchBarTerm) => {
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
      data.push({
        title,
        price,
        image,
        itemLink,
        storeSource,
        searchedTerm: searchBarTerm
    });
  }
  return data;
  }, searchBarTerm);
  for (let k=0; k<Math.min(items.length, 15); k++) {
    try{db.create(items[k]);}
    catch(err){console.log(err);}
  }
  console.log("Check database")
  await browser.close();
  return items
}catch (err){console.log(err);}}

module.exports = walmartSearch