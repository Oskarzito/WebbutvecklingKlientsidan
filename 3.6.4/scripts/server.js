
/*
    Detta är en node.js-server som används istället för:
    host: people.dsv.su.se
    port: 8787

    Anledning är att jag inte riktigt fick till hur man anslöt till
    den, så fick läsa på om hur man skrev en egen lokal server i node.

    Det krävs lite för att kunna testa denna server. Man behöver ha modulen
    'ws' installerad (npm install --save ws).

    Då jag själv inte är helt säker på node och dess användningsfiler:
    - node_modules (och alla dess underkataloger)
    - package.json
    - package-lock.json

    utan mest hackade ihop detta föra att få en liten enkel chatt att funka
    vet jag inte hur riktigt man kan skriva bra instruktioner för att testa
    detta program med denna websocketserver, men kan försöka :)

    1. Ha node installerat
    2. Installera modulen 'ws' via: 'npm install --save ws' (tror man gör det befinnandes i uppgiftens katalog)
    3. Starta servern via: 1. Stå i roten i katalogen. 2. Skriv: 'node scripts/server.js'
    (4. Tror detta steg är viktigt också, men jag använde browser-sync för att serva
       filer under utveckling. Om man servar filer efter man startat node-servern
       kommer filerna köras på localhost:3000. Därefter sköter chatt.js resten om man
       ändrar så socketen i chatt.js ansluter till OWN_SERVER-adressen.)

    Notera, man kan testa node-servern genom att installera wscat via: 'npm install -g wscat'.
    Skriv sedan kommandot: 'wscat -c ws://localhost:3001'. Då ansluter man sig till servern.
    Man kan också testa i https://www.websocket.org/echo.html och connecta till ws://localhost:3001.

    Hoppas det någorlunda var förståeligt :D

    (Då denna fil är så kort hoppas jag koden plus kommentarer gör det möjligt
    att fatta vad denna fil gör utan att behöva testköra den då jag tror
    det tar mycket mer tid och energi att fatta hur man gör, samt köra igång denna server.)

*/

//Importera ws-modulen
var WebSocket = require('ws');

//Modulen har ett Server-property man behöver för att skapa en fungerande websocket-server
var WebSocketServer = WebSocket.Server;

//Kör websocketserver på port 3001
var socketServer = new WebSocketServer({
    port: 3001
});

//Loggar i terminalen på Mac (kommandotolken på PC)
console.log('Websocketserver uppstartad');

//Meddelandehistoriken
var messagesHistory = [];

//Lyssnare på anslutning till socketservern
socketServer.on('connection', function (socket) {
    //Loggar i terminalen på Mac (kommandotolken på PC)
    console.log('Ny klient ansluten');

    //Börja med att skicka ut alla tidigare sända meddelanden till den nya anslutningen
    messagesHistory.forEach(function (msg) {
        socket.send(msg);
    });

    //Lyssnare när ett meddelande kommer till servern
    socket.on('message', function (data) {
        //Loggar i terminalen på Mac (kommandotolken på PC)
        console.log('Följande meddelande mottaget: ' + data);
        //Addera till historiken
        messagesHistory.push(data);

        /*clients håller reda på alla anslutningar (det är en itererbar array).
        När en klient skickar ett meddelande till servern skickas sedan meddelandet till alla
        andra anslutna klienter (inklusive en själv då jag inte är helt 100 på hur man
        unikt identifierar klienter)*/
        socketServer.clients.forEach(function (clientSocket) {
            clientSocket.send(data);
        });
    });
});
