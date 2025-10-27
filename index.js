const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: '*/*' }));

const webhooks = {
    0: 'https://discord.com/api/webhooks/1378522314509127711/KO5CKuLN4rj2K9BEVtGSfeeDhUNFEZQZtlx4RUSPQno7MBi3aDmRjLKzoB493BVnHEwB', // DUDAS
    1: 'https://discord.com/api/webhooks/1388940679966883910/o5tj1P7Gr2zr1ggeSwXtCN5NMxlPhnA6AoOm78dNwTbt8cvS2LV56aNigt-FaYtmlTHs', // TWITTER
    2: 'https://discord.com/api/webhooks/1419457191441600543/JhJ1FBvMJgrwmMsC9ZFWoR3XKOdIP4OhcchbkaLq9zbEkIJnSMHGtswxIwRwTuWuBzBC', // ADMIN
    3: 'https://discord.com/api/webhooks/1419457439014588436/4f3Aio5T4Ox8fdKTVlxbRz5jbw4PqCLI9feo_B1FYaDM9A1_bosGd_3D4993vBRUqr7m', // CHATADMIN
    4: 'https://discord.com/api/webhooks/1419456582034657291/TzjrR7QLeh88WtofPpC-NTDrUzHyO8JQLgVDjPS7_KLLsexc82Tr8b277P7xv_KbLk6i', // SERVIDOR
    5: 'https://discord.com/api/webhooks/1419457024923537498/gC4NeDx4l0WH2tSEh9jwF_bi-u_cotDwjIKh3gP2vOEHQM1F7S8_YcPRko1VJp2HStXk', // RADIOFP
    6: 'https://discord.com/api/webhooks/1419456582034657291/TzjrR7QLeh88WtofPpC-NTDrUzHyO8JQLgVDjPS7_KLLsexc82Tr8b277P7xv_KbLk6i', // SERVIDOR2
    7: 'https://discord.com/api/webhooks/1420091352485466195/cM_VT8lAmjmbN_kuAvAKUCkbUMBQ37pWNWKTpm6Rd9lFJwpXbrkLXS5hbLnMx9_IeRTM', // conquistas
    8: 'https://discord.com/api/webhooks/1420108843068817459/DK3e9RUNyP-RVO4aAgRzuTs3hVuE32thTHnyL-hayBW7VYADo8DdMTMlrCwrTmzHOhDS', // CNN
    9: 'https://discord.com/api/webhooks/1420109014951530787/79HNsqCGtF-OVI9CIRTxd1_XAzHW1gXWJeLKmV-rOKyK1S8HNSqhrcpLHVbtVxagJOTB', //CHATEVENTO
    10: 'https://discord.com/api/webhooks/1420109182538875021/Sl55IjpPqJ9R5hJFQuKxwjrJsyRFBcSeOijxglRuUJ-AgGupfvNdSj1pveoce3Cjc1zA', // anuncios
    11: 'https://discord.com/api/webhooks/1420109453331529740/tuMAgsnNu8fUTcpM6P3alUYyg1w56SDnD9Xxpc1wOzzPoG5usLjXiuq_hnp4VdzRVDKQ', // log servidor
};

function safeDecode(str) {
    try {
        return decodeURIComponent(str);
    } catch {
        return str;
    }
}

app.get('/discord/:type', async (req, res) => {
    const type = parseInt(req.params.type);
    const webhookURL = webhooks[type];

    if (!webhookURL || webhookURL.includes('DISABLE')) {
        console.warn('Webhook deshabilitado o tipo inválido');
        return res.status(400).send('Webhook deshabilitado o tipo inválido');
    }

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    let nombre, contenido;
    try {
        nombre = safeDecode(req.query.nombre || 'AlphaZone');
        contenido = safeDecode(req.query.string || '');
    } catch (error) {
        console.warn('URI mal formada:', req.query.string);
        return res.status(400).send('Cadena mal codificada, no se pudo interpretar');
    }

    const discordID = req.query.id || null;
    const avatar = req.query.avatar || null; // <- Nuevo parámetro

    console.log(`[${new Date().toISOString()}] Tipo: ${type}, Nombre: ${nombre}, Contenido: ${contenido}, DiscordID: ${discordID}, Avatar: ${avatar || "default"}`);

    const payload = {
        content: contenido,
        username: nombre,
    };

    if (avatar) {
        payload.avatar_url = avatar;
    }

    try {
        await axios.post(webhookURL, payload);
        res.status(200).send('Mensaje enviado correctamente');
    } catch (err) {
        console.error('Error al enviar al webhook:', err.message);
        if (err.response) {
            console.error('Detalle HTTP:', err.response.data);
        }
        res.status(500).send('Fallo en el envío al webhook');
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`API corriendo en http://0.0.0.0:${PORT}`);
});

