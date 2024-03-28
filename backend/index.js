const app = require("express")();
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const endpoint = "https://rebahin.shop/"

app.use(cors());

//  SEPERTINYA INI URL UTAMANYA

app.get("/films", async (req, res) => {
    try {
        const page = req.query.page || 1;
        const response = await axios.get(`${endpoint}/movies/page/${page}/`);
        const $ = cheerio.load(response.data);
        const data = [];
        $(".movies-list-full").find("div.ml-item").each((index, element) => {
            data.push({
                nama: $(element).find("h2").text(),
                image: $(element).find("img").attr("src"),
                rating: $(element).find("div.rating-durasi > span.mli-rating").text(),
                durasi: $(element).find("div.rating-durasi > span.mli-durasi").text(),
                kualitas: $(element).find("span.mli-quality").text(),
                slug: (($(element).find("a").attr("href")).split("/"))[3]
            });
        });
        return res.status(200).json(data);
    } catch (e) {
        return res.status(400).json(e);
    }
})

app.get("/films/:slug", async (req, res) => {
    try {
        const slug = req.params.slug;
        const response = await axios.get(`${endpoint}/${slug}/play/`);
        const $ = cheerio.load(response.data);
        const iframes = [];
        $("#server-list .server-wrapper").each((index, element) => {
            iframes.push({
                iframe: `https://rebahin.shop/iembed/?source=${$(element).find(".server").attr("data-iframe")}`
            });
        })
        const data = {
            nama: $(".mvic-tagline2 > h3").text(),
            image: (($(".mvic-thumb").attr("style").split("url("))[1]).split(")")[0],
            iframes
        }
        return res.status(200).json(data);
    } catch (e) {
        return res.status(400).json(e);
    }
});



app.listen(5000, () => console.log("Server on in http://localhost:5000/"));
