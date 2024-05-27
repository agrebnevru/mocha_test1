const {Builder, By, Key, until, JavascriptExecutor} = require('selenium-webdriver')
let fs = require('fs')

const docReady = async (driver) => {
    return await driver.wait(until.elementLocated(By.css('#jivo-iframe-container')), 3000)
}

async function example() {
    // console.log('example - start')
    let $btnBuy, iProductId
    let driver = await new Builder().forBrowser('firefox').build();
    // await driver.manage().setTimeouts({implicit: 3000});
    // let driver = await new Builder().forBrowser('chrome').build();
    // driver.manage().window().maximize();
    // driver.manage().window().minimize();
    try {
        await driver.get('https://endor:phin@dev3.primaverashop.ru/');

        await driver.wait(() => docReady(driver), 3000);

        // add2basket first product
        $btnBuy = driver.findElement(By.css('.js-buy-button:not(.prod_btn--forced-hover)'))
        iProductId = await $btnBuy.getAttribute('data-id')
        $btnBuy.click()
        await driver.wait(until.elementLocated(By.css(`.js-buy-button.prod_btn--forced-hover[data-id="${iProductId}"]`)), 3000)

        // add2basket second product
        $btnBuy = driver.findElement(By.css('.js-buy-button:not(.prod_btn--forced-hover)'))
        iProductId = await $btnBuy.getAttribute('data-id')
        $btnBuy.click()
        await driver.wait(until.elementLocated(By.css(`.js-buy-button.prod_btn--forced-hover[data-id="${iProductId}"]`)), 3000)

        // go2basket
        $link = driver.findElement(By.css('.js-small-cart-container > a'))
        $link.click()
        await driver.wait(until.elementLocated(By.css(`.js-buy-button.prod_btn--forced-hover[data-id="${iProductId}"]`)), 3000)

        // await driver.wait(until.elementLocated(By.css('#main_wrapper .nav_top')), 10000)
        // driver.executeScript('arguments[0].scrollIntoView(true);', By.css('#main_wrapper .nav_top'))
        // driver.executeScript('arguments[0].scrollIntoView(true);', bxPanelWrapper)
        // driver.executeScript('console.log(document.title);')
        // await driver.manage().setTimeouts({implicit: 3000});
        await driver.executeScript('javascript:window.scrollBy(0,-document.body.scrollHeight)', '')
        await driver.wait(until.elementLocated(By.css('#main_wrapper .nav_top')), 3000)

        // screenshot
        let encodedString = await driver.takeScreenshot();
        fs.writeFileSync('./tmp/screenshots/image.png', encodedString, 'base64');

    } catch (err) {
        // console.log('example - catch')
        console.error('Something went wrong!\n', err.stack, '\n');
    } finally {
        // console.log('example - finally')
        driver.quit();
    }
    // console.log('example - finish')
}

example()
