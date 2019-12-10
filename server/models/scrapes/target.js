const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const db = require("../StoreSearch");
mongoose.connect("mongodb://localhost/ShoppingDatabase", { useNewUrlParser: true });

function wait (ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}

async function targetSearch(searchBarTerm) {
  try{
    const website = 'https://www.target.com';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(website+'/s?searchTerm='+searchBarTerm, {waitUntil: 'load'});
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
        viewportIncr = viewportIncr + viewportHeight;
    }
    await page.evaluate(_ => {
        window.scrollTo(0, 0);
    });
    await wait(100);
  const items = await page.evaluate((searchBarTerm) => {
    let storeSource = 'Target';
    let data = [];
    const titleTextSearch = 'picture.Images__FadePrimaryOnHover-sc-1gcxa3z-0 img';
    console.log("Target title: ", titleTextSearch)
    const priceTextSearch = 'span[data-text="product-price"]';
    console.log("Target price: ",priceTextSearch)
    const imageTextSearch = 'picture Images__FadePrimaryOnHover-sc-1gcxa3z-0';
    const itemLinkSearch = 'h3.Col-favj32-0 a';
    const grabInfo = (item) => {
      console.log(titleTextSearch)
      console.log(priceTextSearch)
      console.log(imageTextSearch)
      if(item.querySelector(titleTextSearch)){
      title = item.querySelector(titleTextSearch).alt.trim();
      price = item.querySelector(priceTextSearch).innerText.trim();
      image = item.querySelector(imageTextSearch).srcset.trim();
      itemLink = item.querySelector(itemLinkSearch).href.trim();
    }};
    const allItems = document.querySelectorAll('li.h-display-flex.Col-favj32-0');
    console.log('target items: ',allItems)
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
    try{
      if((items[k].title !== 'failedTitle') && (items[k].price.charAt(0) === '$')){db.create(items[k]);}}
    catch(err){console.log(err);}
  }
  console.log("Check database")
  await browser.close();
  return items;
}catch (err){console.log(err);}}

module.exports = targetSearch;