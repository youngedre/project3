const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const db = require("../StoreSearch");
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

function wait (ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}

async function targetSearch(searchBarTerm) {
  try{
    const website = 'https://www.target.com';
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.goto(website+'/s?searchTerm='+searchBarTerm, {waitUntil: 'load', timeout: 0});
    const bodyHandle = await page.$('body');
    const { height } = await bodyHandle.boundingBox();
    await bodyHandle.dispose();
    const viewportHeight = page.viewport().height;
    let viewportIncr = 0;
    while(viewportIncr + viewportHeight < height ){
        await page.evaluate(_viewportHeight => {
            window.scrollBy(0, _viewportHeight);
        }, viewportHeight);
        await wait(600);
        viewportIncr = viewportIncr + viewportHeight;
    }
    await page.evaluate(_ => {
        window.scrollTo(0, 0);
    });
    await wait(40);

const titleArray = await page.$$eval('li.h-display-flex.Col-favj32-0 div.h-flex-direction-col a.h-display-block',e => e.map(el => el.innerText.trim()))
const priceArray = await page.$$eval('li.h-display-flex.Col-favj32-0 div.styles__StyledPricePromoWrapper-e5kry1-13 span.h-text-bs',e=>e.map(el => el.innerText.trim()))
const hrefArray = await page.$$eval('li.h-display-flex.Col-favj32-0 div.h-flex-direction-col a.h-display-block',e => e.map(el => el.href.trim()))
const imgArray = await page.$$eval('li.h-display-flex.Col-favj32-0 div.Images__ImageContainer-sc-1gcxa3z-2 picture',e => e.map(el => el.firstChild.srcset.trim()))

    // const titleArray = await page.$$eval('li.sku-item div.shop-sku-list-item div.list-item.lv div.image-column a img', e => e.map(el => el.alt.trim()))
    // const priceArray = await page.$$eval('li.sku-item div.shop-sku-list-item div.list-item.lv div.right-column div.price-block div.priceView-customer-price span[aria-hidden="true"]', e => e.map(el => el.innerText.trim()))
    // const hrefArray = await page.$$eval('li.sku-item div.shop-sku-list-item div.list-item.lv div.image-column a.image-link', e => e.map(el => el.href.trim()))
    // const imgArray = await page.$$eval('li.sku-item div.shop-sku-list-item div.list-item.lv div.image-column a img', e => e.map(el => el.src.trim()))
    
    const allItems = []
    for(let i=0; i<titleArray.length; i++){
      allItems.push({
        title: titleArray[i],
        price: priceArray[i],
        image: imgArray[i],
        itemLink: hrefArray[i],
        storeSource: "Target",
        searchedTerm: searchBarTerm
      })
    }

  //  const items = await page.$eval('li.sku-item div.shop-sku-list-item div.list-item.lv', e => e.map(el =>
  //   {
  //    el.querySelector('div.image-column a').href.trim()
  //  })) => {
  //   let storeSource = 'Best Buy';
  //   let data = [];
  //   // const grabInfo = (item) => {
  //   //   console.log(titleTextSearch)
  //   //   console.log(priceTextSearch)
  //   //   console.log(imageTextSearch)
  //   //   title = item.querySelector(titleTextSearch) !== (undefined || null) ? item.querySelector(titleTextSearch).alt.trim() : "Failed";
  //   //   price = item.querySelector(priceTextSearch) !== (undefined || null) ? item.querySelector(priceTextSearch).innerText.trim() : "Failed";
  //   //   image = item.querySelector(imageTextSearch) !== (undefined || null) ? item.querySelector(imageTextSearch).srcset.trim() : "Failed";
  //   //   itemLink = item.querySelector(itemLinkSearch) !== (undefined || null) ? item.querySelector(itemLinkSearch).href.trim() : "Failed";
  //   // }
  //   const allItems = document.querySelectorAll('li.sku-item div.shop-sku-list-item div.list-item.lv');
  // //   for(b of allItems) {
  // //     console.log(b)
  // //     grabInfo(b);
  // //     data.push({
  // //       title,
  // //       price,
  // //       image,
  // //       itemLink,
  // //       storeSource,
  // //       searchedTerm: searchBarTerm
  // //   });
  // // }
  // return allItems
  // // return data;
  // }, searchBarTerm);
  // for (let k=0; k<Math.min(items.length, 15); k++) {
  //   try{
  //     if((items[k].title !== 'Failed') && (items[k].price.charAt(0) === '$')){db.create(items[k]);}}
  //   catch(err){console.log(err);}
  // }
  console.log("Check database")
  for (let k=0; k<Math.min(allItems.length, 15); k++) {
    try{db.create(allItems[k]);}
    catch(err){console.log(err);}
  }
  await browser.close();
  return allItems;
}catch (err){console.log(err);}}

module.exports = targetSearch;