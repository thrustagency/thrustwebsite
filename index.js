const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csrf = require("csurf");
const nodemailer = require("nodemailer");
const { worldwideArtists } = require("./data/worldwideartists.json");
const { polandArtists } = require("./data/polandartists.json");
const { managementArtists } = require("./data/management.json");
const { brands } = require("./data/brands.json");

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

app.use(compression());

app.use(express.static("public"));

if (process.env.NODE_ENV !== "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(
    cookieSession({
        secret: process.env.SECRET,
        maxAge: 1000 * 60 * 60 * 7
    })
);

const cookieSessionMiddleware = cookieSession({
    secret: process.env.SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);

app.use(csrf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "thrustagencymailer",
        pass: process.env.EMAIL_PASS
    }
});

// ========================================================================

app.get("/home-info", (req, res) => {
    res.json({ worldArtists, polandArtists, managementArtists });
});

app.get("/get-artist/:name", (req, res) => {
    let artist;

    worldwideArtists.forEach(worldwideArtist => {
        if (worldwideArtist.url === req.params.name) artist = worldwideArtist;
    });
    polandArtists.forEach(polandArtist => {
        if (polandArtist.url === req.params.name) artist = polandArtist;
    });

    managementArtists.forEach(managementArtist => {
        if (managementArtist.url === req.params.name) artist = managementArtist
    });

    res.json({ artist });
});

app.get("/get-brands", (req, res) => {
    res.json({ brands });
});

app.post("/submit-form", (req, res) => {

    const mailOptions = {
        from: "thrustagencymailer@gmail.com",
        to: "fabio@thrustagency.com",
        subject: "Booking Request: " + req.body.artistName,
        html: ` 
    <h3>You have a new booking request, info below:</h3>
    <p>Artist Name(s): ${req.body.artistName}</p>
    <p>Date: ${req.body.date}</p>
    <p>City: ${req.body.city}</p>
    <p>Country: ${req.body.country}</p>
    <p>Venue Name: ${req.body.venueName}</p>
    <p>Venue Address: ${req.body.venueAddress}</p>
    <p>Venue Capacity: ${req.body.venueCapacity}</p>
    <p>Opening Hours: ${req.body.openingTime}</p>
    <p>Artist Set Time: ${req.body.artistSetTime}</p>
    <p>Lineup Proposal: ${req.body.date}</p>
    <p>Offer & Conditions: ${req.body.offerAndConditions}</p>
    <p>Door Price: ${req.body.doorPrice}</p><br/>
    <p>Promoter Name: ${req.body.promoterName}</p>
    <p>Promoter Email: ${req.body.promoterEmail}</p>
    <p>Promoter Number: ${req.body.promoterNumber}</p>
    <p>Promoter Facebook: ${req.body.promoterFacebook}</p>
    <p>Contract Name: ${req.body.contractName}</p>
    <p>Contract Email: ${req.body.contractEmail}</p>
    <p>VAT Number: ${req.body.vatNumber}</p>
        `
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            res.json({ error: true });
        } else {
            console.log("Email sent: " + info.response);
            res.json({ success: true });
        }
    });
});

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 8080, () => console.log("Im listening"));
