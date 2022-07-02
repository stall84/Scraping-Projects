import puppeteer = require('puppeteer');

async function scrapeProduct(url:any) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [ele] = await page.$x('//*[@id="imgBlkFront"]')           // Using the xpath for the element we want ( an image of a book in this case ).. 
                                                                    // it will return an array, destructure out the element
    const src = await ele.getProperty('src');                       // Since we just have the element, we need to pull out the actual source attribute (which will be a hyperlink and not a string)
    const imageURL = await src.jsonValue();                           // Since we have a hyperlink we neet to 'stringify' it using jsonValue()

    const [ele2] = await page.$x('//*[@id="productTitle"]');        // Same as above but this time for a test value .. the title of the book.
    const text = await ele2.getProperty('textContent');
    const title = await text.jsonValue();

    const [ele3] = await page.$x('//*[@id="newBuyBoxPrice"]');
    const text3 = await ele3.getProperty('textContent');
    const price = await text3.jsonValue();

    console.log({title, price, imageURL})                                   // Log out an object of the props we want to scrape

    browser.close()             // Close the browser
}

scrapeProduct('https://www.amazon.com/Stick-Rudder-Explanation-Art-Flying/dp/0070362408/ref=sr_1_1?keywords=stick+and+rudder+book&qid=1656803663&sprefix=stick+and+rudder+%2Caps%2C73&sr=8-1');
