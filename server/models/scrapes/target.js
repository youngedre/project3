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
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(website+'/s?searchTerm='+searchBarTerm, {waitUntil: 'load'});
    const bodyHandle = await page.$('body');
    const { height } = await bodyHandle.boundingBox();
    await bodyHandle.dispose();
    const viewportHeight = page.viewport().height;
    let viewportIncr = 0;
    while(viewportIncr + viewportHeight < height ){
        await page.evaluate(_viewportHeight => {
            window.scrollBy(0, _viewportHeight);
        }, viewportHeight);
        await wait(7000);
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
    // const grabInfo = (item) => {
    //   console.log(titleTextSearch)
    //   console.log(priceTextSearch)
    //   console.log(imageTextSearch)
    //   title = item.querySelector(titleTextSearch) !== (undefined || null) ? item.querySelector(titleTextSearch).alt.trim() : "Failed";
    //   price = item.querySelector(priceTextSearch) !== (undefined || null) ? item.querySelector(priceTextSearch).innerText.trim() : "Failed";
    //   image = item.querySelector(imageTextSearch) !== (undefined || null) ? item.querySelector(imageTextSearch).srcset.trim() : "Failed";
    //   itemLink = item.querySelector(itemLinkSearch) !== (undefined || null) ? item.querySelector(itemLinkSearch).href.trim() : "Failed";
    // }
    const allItems = document.querySelectorAll('li.Col-favj32-0.bkaXIn');
  //   for(b of allItems) {
  //     console.log(b)
  //     grabInfo(b);
  //     data.push({
  //       title,
  //       price,
  //       image,
  //       itemLink,
  //       storeSource,
  //       searchedTerm: searchBarTerm
  //   });
  // }
  return allItems
  // return data;
  }, searchBarTerm);
  console.log("Target array: ",items)
  // for (let k=0; k<Math.min(items.length, 15); k++) {
  //   try{
  //     if((items[k].title !== 'Failed') && (items[k].price.charAt(0) === '$')){db.create(items[k]);}}
  //   catch(err){console.log(err);}
  // }
  console.log("Check database")
  await browser.close();
  return items;
}catch (err){console.log(err);}}

module.exports = targetSearch;