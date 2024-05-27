const {Builder, By, Key, until} = require('selenium-webdriver')
let fs = require('fs');

return

async function example() {
    console.log('example - start')
    let driver = await new Builder().forBrowser('firefox').build()
    // let driver = await new Builder().forBrowser('chrome').build();
    driver.manage().window().maximize()
    // driver.manage().timeouts().setScriptTimeout(30, TimeUnit.SECONDS);
    try {
        console.log('example - 1')
        // Navigate to Url
        await driver.get('https://www.google.com')
        console.log('example - 2')

        // Enter text "cheese" and perform keyboard action "Enter"
        await driver.findElement(By.name('q')).sendKeys('cheese', Key.ENTER)
        console.log('example - 3')

        // await driver.wait(
        //     async () => (await driver.getAllWindowHandles()).length === 2,
        //     10000
        // );

        let fbar = await driver.wait(until.elementLocated(By.css('#fbar > div > div > span')), 10000)
        console.log(await fbar.getAttribute('textContent'))
        console.log('example - 4')
        let title = await driver.wait(until.elementLocated(By.css('title')), 10000)
        console.log('example - 5')
        console.log(await title.getAttribute('textContent'))
        console.log('example - 6')

        // screenshot
        let encodedString = await driver.takeScreenshot()
        console.log('example - 7')
        fs.writeFileSync('./tmp/screenshots/image.png', encodedString, 'base64')
        console.log('example - 8')

        // console.log(await $title);
        // console.log(await $title.innerHTML);
        console.log('example - 9')

    } catch (err) {
        console.log('example - catch')
        console.error('Something went wrong!\n', err.stack, '\n')
    } finally {
        console.log('example - finally')
        // driver.quit();
    }
    console.log('example - finish')
}

example()
