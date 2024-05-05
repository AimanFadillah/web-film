const app = require("express")();
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const endpoint = "https://rebahinxxi.pro"

app.use(cors());

app.get("/recommended",async (req,res) => {
    try{
        const page = req.query.page || 1;
        const search = req.query.s || undefined;
        const response = await axios.get(`${endpoint}/genre/rekomendasi-film/page/${page}/${search ? `?s=${search}` : ""}`);
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
    }catch(e){
        return res.status(200).json([]);
    }
})

app.get("/cam",async (req,res) => {
    try{
        const page = req.query.page || 1;
        const search = req.query.s || undefined;
        const response = await axios.get(`${endpoint}/quality/cam/page/${page}/${search ? `?s=${search}` : ""}`);
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
    }catch(e){
        return res.status(200).json([]);
    }
})


app.get("/films", async (req, res) => {
    try{
        const page = req.query.page || 1;
        const search = req.query.s || undefined;
        const response = await axios.get(`${endpoint}${search ? "" : "/movies"}/page/${page}/${search ? `?s=${search}` : ""}`);
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
    }catch(e){
        return res.status(200).json([]);
    }
})

app.get("/films/:slug", async (req, res) => {
    try {
        const slug = req.params.slug;
        const response = await axios.get(`${endpoint}/${slug}/play/`);
        const $ = cheerio.load(response.data);
        const iframes = [];
        const deskripsi = [];
        const download = [];
        $("#server-list .server-wrapper").each((index, element) => {
            iframes.push({
                iframe: `${endpoint}/iembed/?source=${$(element).find(".server").attr("data-iframe")}`
            });
        })
        $(".desc-des-pendek").find("p").each((index, element) => {
            deskripsi.push($(element).text())
        });
        $("#dlm").find("div > table > tbody > tr").each((index, element) => {
            download.push({
                kualitas: $(element).text()
            })
        })
        const data = {
            nama: $(".mvic-tagline2 > h3").text(),
            image: (($(".mvic-thumb").attr("style").split("url("))[1]).split(")")[0],
            view: $(".bp-btn-views").find("span").text(),
            durasi: $(".mv-stat").text().split("|")[1].trim().replace(".", ""),
            kualitas: $(".mv-stat").text().split("|")[0].trim(),
            negara: $(".mv-stat").text().split("|")[2].trim(),
            genre: $(".mv-stat").text().split("|")[3].trim(),
            aktor: $("#cast").find("span").text(),
            deskripsi,
            iframes,
            download,
        }
        return res.status(200).json(data);
    } catch (e) {
        return res.status(400).json(e);
    }
});



app.listen(5000, () => console.log("Server on in http://localhost:5000/"));
