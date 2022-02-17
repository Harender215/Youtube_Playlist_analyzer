const puppeteer = require('puppeteer')
let cTab
let link = 'https://www.youtube.com/playlist?list=PLRBp0Fe2GpglvwYma4hf0fJy0sWaNY_CL';

(async function(){
    try{

        let browserOpen = puppeteer.launch({
            headless: false,
            defaultViewport :null,
            args: ['--start-maximized']
        })

        let browserInstance = await browserOpen
        let allTabsArr = await browserInstance.pages()
        cTab = allTabsArr[0]
        await cTab.goto(link)
        await cTab.waitForSelector('h1#title')
        let name = await cTab.evaluate(function(select){
            return document.querySelector(select).innerText
        },'h1#title')

        // console.log(name)
        let allData = await cTab.evaluate(getData, 'div.style-scope.ytd-playlist-sidebar-primary-info-renderer')
        console.log(name+"\n", allData.noOfVideos, allData.noOfViews)
        

    }catch(error){
        console.log(error)
    }
})();


function getData(selector){
    let allElems = document.querySelectorAll(selector)
    let noOfVideos = allElems[0].innerText
    let noOfViews = allElems[1].innerText
    console.log(noOfVideos)
    console.log(noOfViews)
    return{
        noOfVideos,
        noOfViews
    }
}