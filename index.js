const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()  //get post put/patch delet

const url = 'https://ie.indeed.com/jobs?q=junior%20developer&fromage=14'

axios(url)
    .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)
        const jobs = []

        $('.fs-unmask').each(function(){
            const link = 'https://ie.indeed.com' + $(this).attr('href')
            const title = $(this).find('h2').text()

            jobs.push({
                title,
                link
            })
        })
        let out = jobs.pop()

        console.log(jobs)
        console.log(jobs.length + ' jobs found.')
    }).catch((err) => {
        console.log(err)
    })

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))