const axios = require("axios");
const express = require("express");
const app = express();
const NodeCache = require("node-cache");
const myCache = new NodeCache();


app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
});


// gère les requêtes aux API ainsi que le cache
app.get("/getmeteo/:city", (req, res) => {


    var city_name = remove_space((req.params.city).toLowerCase()); // nom de la ville voulue 

    // on regarde si les données pour la ville recherchée son déjà dans le cache
    var exists = myCache.has(city_name);
    if (exists) {
        var valeurcache = myCache.get(city_name);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(valeurcache));
    }

    //si il n'y a pas de données existantes dans le cache, on fait nos requêtes
    else {
        // requête pour avoir les coordonnées de la ville voulue
        axios.get("http://api.openweathermap.org/geo/1.0/direct?q=" + city_name + "&limit=5&appid=db988691faf182dfc3750cd1e57f3718").then((res_coord) => {
            if (res_coord.data.length) {
                const latitude = res_coord.data[0].lat;
                const longitude = res_coord.data[0].lon;

                if (longitude && latitude) {
                    // requête pour avoir les informations de la ville voulue à partir des coordonnées
                    axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=db988691faf182dfc3750cd1e57f3718").then((res_meteo) => {
                        if (res_meteo.data) {
                            const meteo_results = res_meteo.data; // résultats pour les informations météo
                            // requête pour avoir l'image d'arrière plan de la ville voulue
                            axios.get("https://api.teleport.org/api/urban_areas/slug:" + (req.params.city).toLowerCase() + "/images/").then((res_background1) => {
                                var background_results = res_background1.data; // résultats pour les informations de l'arrière plan
                                var final_data = assainir_data(meteo_results, background_results);

                                var success = myCache.set(city_name, final_data); // permet d'ajouter les données dans le cache
                                if (success) console.log("succeed cache filled");

                                res.setHeader('Content-Type', 'application/json');
                                res.send(JSON.stringify(final_data));



                            })
                                .catch(() => {
                                    //si on ne trouve pas d'image pour la ville recherchée, on prend l'image de los-angeles
                                    axios.get("https://api.teleport.org/api/urban_areas/slug:las-vegas/images/").then((res_background2) => {
                                        var background_results = res_background2.data;
                                        var final_data = assainir_data(meteo_results, background_results);

                                        var success = myCache.set(city_name, final_data);
                                        if (success) console.log("succeed cache filled");

                                        res.setHeader('Content-Type', 'application/json');
                                        res.send(JSON.stringify(final_data));
                                    })
                                });
                        }
                    })
                        .catch((error) => {
                            console.error(error);
                            res.status(500).send('ville incorrecte');
                        });
                }
            } else {

                res.status(500).send('ville incorrecte');
            }
        })
            .catch((error) => {
                console.error(error);
                res.status(500).send('ville incorrecte');
            });

    }


});



function assainir_data(result_meteo, result_background) {
    //8 data à garder dans daily : dt, temp.day, temp.night, temp.humidity
    // temp.pressure, wind_speed, weather[0].icon, temp.max
    var res_dico = [{}, {}, {}, {}, {}, {}, {}, {}]; //dictionnaire final avec les données inutiles enlevées
    for (var i = 0; i < 8; i++) {
        res_dico[i] = {
            dt: result_meteo.daily[i].dt,
            wind_speed: result_meteo.daily[i].wind_speed,
            icon: result_meteo.daily[i].weather[0].icon,
            humidity: result_meteo.daily[i].humidity,
            pressure: result_meteo.daily[i].pressure,
            temp_day: result_meteo.daily[i].temp.day,
            temp_night: result_meteo.daily[i].temp.night,
            temp_max: (result_meteo.daily[i].temp.max).toFixed()

        }
    }

    res_dico[8] = result_background.photos[0].image.mobile;

    return res_dico;

}


function remove_space(chaine) {
    var str_final = "";
    for (let c of chaine) {
        if (c === " ") str_final += "-";
        else str_final += c;
    }
    return str_final;
}




const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));