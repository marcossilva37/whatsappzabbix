//ZABBIXDASA
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const express = require('express');
const { body, validationResult } = require('express-validator');
const socketIO = require('socket.io');
const qrcode = require('qrcode');
const http = require('http');
const fileUpload = require('express-fileupload');
const axios = require('axios');
const mime = require('mime-types');
const port = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());
app.use(express.urlencoded({
extended: true
}));
app.use(fileUpload({
debug: true
}));
app.use("/", express.static(__dirname + "/"))

app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: __dirname
  });
});

const client = new Client({
  authStrategy: new LocalAuth({ clientId: 'bot-zdg' }),
  puppeteer: { headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process', // <- this one doesn't works in Windows
      '--disable-gpu'
    ] }
});

client.initialize();

io.on('connection', function(socket) {
  socket.emit('message', '© BOT-ZDG - Iniciado');
  socket.emit('qr', './icon.svg');

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.toDataURL(qr, (err, url) => {
      socket.emit('qr', url);
      socket.emit('message', '© BOT-ZDG QRCode recebido, aponte a câmera  seu celular!');
    });
});

client.on('ready', () => {
    socket.emit('ready', '© BOT-ZDG Dispositivo pronto!');
    socket.emit('message', '© BOT-ZDG Dispositivo pronto!');
    socket.emit('qr', './check.svg')	
    console.log('© BOT-ZDG Dispositivo pronto');
});

client.on('authenticated', () => {
    socket.emit('authenticated', '© BOT-ZDG Autenticado!');
    socket.emit('message', '© BOT-ZDG Autenticado!');
    console.log('© BOT-ZDG Autenticado');
});

client.on('auth_failure', function() {
    socket.emit('message', '© BOT-ZDG Falha na autenticação, reiniciando...');
    console.error('© BOT-ZDG Falha na autenticação');
});

client.on('change_state', state => {
  console.log('© BOT-ZDG Status de conexão: ', state );
});

client.on('disconnected', (reason) => {
  socket.emit('message', '© BOT-ZDG Cliente desconectado!');
  console.log('© BOT-ZDG Cliente desconectado', reason);
  client.initialize();
});
});

// Send message
app.post('/zdg-message', [
  body('number').notEmpty(),
  body('message').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req).formatWith(({
    msg
  }) => {
    return msg;
  });

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.mapped()
    });
  }

  const number = req.body.number;
  const numberDDI = number.substr(0, 2);
  const numberDDD = number.substr(2, 2);
  const numberUser = number.substr(-8, 8);
  const message = req.body.message;

//configuração para enviar zabbix HSD
  if (number == "zbxdp") {
    const numberZDG = "120363286475964295@g.us";
    client.sendMessage(numberZDG, message).then(response => {
    res.status(200).json({
      status: true,
      message: 'BOT-ZDG Mensagem enviada',
      response: response
    });
    }).catch(err => {
    res.status(500).json({
      status: false,
      message: 'BOT-ZDG Mensagem não enviada',
      response: err.text
    });
    });
  }
  //AMO
  else if (number == "zbxdamo") {
    const numberZDG = "120363269254853039@g.us";
    client.sendMessage(numberZDG, message).then(response => {
    res.status(200).json({
      status: true,
      message: 'BOT-ZDG Mensagem enviada',
      response: response
    });
    }).catch(err => {
    res.status(500).json({
      status: false,
      message: 'BOT-ZDG Mensagem não enviada',
      response: err.text
    });
    });
  }
  //VEEAM
  else if (number == "zbxdveeam") {
    const numberZDG = "120363289523284136@g.us";
    client.sendMessage(numberZDG, message).then(response => {
    res.status(200).json({
      status: true,
      message: 'BOT-ZDG Mensagem enviada',
      response: response
    });
    }).catch(err => {
    res.status(500).json({
      status: false,
      message: 'BOT-ZDG Mensagem não enviada',
      response: err.text
    });
    });
  }
  else if (number == "pdasa") {
    const numberZDG = "120363280214182824@g.us";
    client.sendMessage(numberZDG, message).then(response => {
    res.status(200).json({
      status: true,
      message: 'BOT-ZDG Mensagem enviada',
      response: response
    });
    }).catch(err => {
    res.status(500).json({
      status: false,
      message: 'BOT-ZDG Mensagem não enviada',
      response: err.text
    });
    });
  }  
  //GRUPO de HOMOLOGACAO
  else if (number == "zbxdhmld") {
    const numberZDG = "120363286475964295@g.us";
    client.sendMessage(numberZDG, message).then(response => {
    res.status(200).json({
      status: true,
      message: 'BOT-ZDG Mensagem enviada',
      response: response
    });
    }).catch(err => {
    res.status(500).json({
      status: false,
      message: 'BOT-ZDG Mensagem não enviada',
      response: err.text
    });
    });
  }
    //GRUPO SERVIÇOS MV grupo 05
    else if (number == "zbxdmv") {
      const numberZDG = "120363286553751498@g.us";
      client.sendMessage(numberZDG, message).then(response => {
      res.status(200).json({
        status: true,
        message: 'BOT-ZDG Mensagem enviada',
        response: response
      });
      }).catch(err => {
      res.status(500).json({
        status: false,
        message: 'BOT-ZDG Mensagem não enviada',
        response: err.text
      });
      });
    }
  else if (numberDDI === "55" && parseInt(numberDDD) <= 30) {
    const numberZDG = "55" + numberDDD + "9" + numberUser + "@c.us";
    client.sendMessage(numberZDG, message).then(response => {
    res.status(200).json({
      status: true,
      message: 'BOT-ZDG Mensagem enviada',
      response: response
    });
    }).catch(err => {
    res.status(500).json({
      status: false,
      message: 'BOT-ZDG Mensagem não enviada',
      response: err.text
    });
    });
  }
  else if (numberDDI === "55" && parseInt(numberDDD) > 30) {
    const numberZDG = "55" + numberDDD + numberUser + "@c.us";
    client.sendMessage(numberZDG, message).then(response => {
    res.status(200).json({
      status: true,
      message: 'BOT-ZDG Mensagem enviada',
      response: response
    });
    }).catch(err => {
    res.status(500).json({
      status: false,
      message: 'BOT-ZDG Mensagem não enviada',
      response: err.text
    });
    });
  }
});


// Send media
app.post('/zdg-media', [
  body('number').notEmpty(),
  body('caption').notEmpty(),
  body('file').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req).formatWith(({
    msg
  }) => {
    return msg;
  });

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.mapped()
    });
  }

  const number = req.body.number;
  const numberDDI = number.substr(0, 2);
  const numberDDD = number.substr(2, 2);
  const numberUser = number.substr(-8, 8);
  const caption = req.body.caption;
  const fileUrl = req.body.file;

  let mimetype;
  const attachment = await axios.get(fileUrl, {
    responseType: 'arraybuffer'
  }).then(response => {
    mimetype = response.headers['content-type'];
    return response.data.toString('base64');
  });

  const media = new MessageMedia(mimetype, attachment, 'Media');
//if (numberDDI !== "zabbixdasa") {
if (number == "zabbixdasa") {
    const numberZDG = "120363191845039443@g.us"; //health check
    //const numberZDG = "120363280214182824@g.us"; //GRUPO Zabbix DASA
    //const numberZDG = "120363285101601465@g.us"; //GRUPO RJ2 FIREWALL
    client.sendMessage(numberZDG, media, {caption: caption}).then(response => {
    res.status(200).json({
      status: true,
      message: 'BOT-ZDG Imagem enviada',
      response: response
    });
    }).catch(err => {
    res.status(500).json({
      status: false,
      message: 'BOT-ZDG Imagem não enviada',
      response: err.text
    });
    });
  }
  //else if (numberDDI !== "testedasa") {
  else if (number == "pdasa") {
    const numberZDG = "120363280214182824@g.us"; //grupo zabbix dasa
    //const numberZDG = "120363285101601465@g.us"; //HRUPO RJ2 FIREWALL
    //const numberZDG = "120363286553751498@g.us"; //Grupozbx05
    client.sendMessage(numberZDG, media, {caption: caption}).then(response => {
    res.status(200).json({
      status: true,
      message: 'BOT-ZDG Imagem enviada',
      response: response
    });
    }).catch(err => {
    res.status(500).json({
      status: false,
      message: 'BOT-ZDG Imagem não enviada',
      response: err.text
    });
    });
  }
  else if (number == "zbxdhmld") {
    const numberZDG = "120363286475964295@g.us"; //grupo HOMOLOGACAO DASA
    client.sendMessage(numberZDG, media, {caption: caption}).then(response => {
    res.status(200).json({
      status: true,
      message: 'BOT-ZDG Imagem enviada',
      response: response
    });
    }).catch(err => {
    res.status(500).json({
      status: false,
      message: 'BOT-ZDG Imagem não enviada',
      response: err.text
    });
    });
  }
  else if (numberDDI === "55" && parseInt(numberDDD) <= 30) {
    const numberZDG = "55" + numberDDD + "9" + numberUser + "@c.us";
    client.sendMessage(numberZDG, media, {caption: caption}).then(response => {
    res.status(200).json({
      status: true,
      message: 'BOT-ZDG Imagem enviada',
      response: response
    });
    }).catch(err => {
    res.status(500).json({
      status: false,
      message: 'BOT-ZDG Imagem não enviada',
      response: err.text
    });
    });
  }
  else if (numberDDI === "55" && parseInt(numberDDD) > 30) {
    const numberZDG = "55" + numberDDD + numberUser + "@c.us";
    client.sendMessage(numberZDG, media, {caption: caption}).then(response => {
    res.status(200).json({
      status: true,
      message: 'BOT-ZDG Imagem enviada',
      response: response
    });
    }).catch(err => {
    res.status(500).json({
      status: false,
      message: 'BOT-ZDG Imagem não enviada',
      response: err.text
    });
    });
  }
});

client.on('message', async msg => {
///###INICIO
  if (msg.body !== null && msg.body === "1" && (msg.from === "120363286475964295@g.us")) {
   const exec = require('child_process').exec;
 
   let temp;
 
   exec('bash /root/health/ghml/home.sh', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    temp = stdout;
    console.log(temp);
   });
   msg.reply(temp);
   } 
  //DASH WINDOWS
  //else if (msg.body !== null && msg.body === "2" && (msg.from === "120363191845039443@g.us" || msg.from === "120363280214182824@g.us")) { 2 grupos
  else if (msg.body !== null && msg.body === "2" && (msg.from === "120363286475964295@g.us")) {  
    const exec = require('child_process').exec;
 
   let temp;
 
   exec('bash /root/health/ghml/windows.sh', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    temp = stdout;
    console.log(temp);
   });
   msg.reply(temp);
   }

   //else if (msg.body !== null && msg.body === "3" && (msg.from === "120363191845039443@g.us" || msg.from === "120363280214182824@g.us")) {
    else if (msg.body !== null && msg.body === "3" && (msg.from === "120363286475964295@g.us")) {
    const exec = require('child_process').exec;
 
   let temp;
 
   exec('bash /root/health/ghml/backup.sh', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    temp = stdout;
    console.log(temp);
   });
   msg.reply(temp);
   }
   //DASH STORAGE
   else if (msg.body !== null && msg.body === "4" && (msg.from === "120363286475964295@g.us")) {
    const exec = require('child_process').exec;
 
   let temp;
 
   exec('bash /root/health/ghml/storage.sh', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    temp = stdout;
    console.log(temp);
   });
   msg.reply(temp);
   }
   //DASH SWITCH
   else if (msg.body !== null && msg.body === "5" && (msg.from === "120363286475964295@g.us")) {
    const exec = require('child_process').exec;
 
   let temp;
 
   exec('bash /root/health/ghml/switch.sh', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    temp = stdout;
    console.log(temp);
   });
   msg.reply(temp);
   }
   else if (msg.body !== null && msg.body === "6" && (msg.from === "120363286475964295@g.us")) {
    const exec = require('child_process').exec;
 
   let temp;
 
   exec('bash /root/health/ghml/oracle.sh', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    temp = stdout;
    console.log(temp);
   });
   msg.reply(temp);
   }
   //DASH FIREWALL
   else if (msg.body !== null && msg.body === "7" && (msg.from === "120363286475964295@g.us")) {
    const exec = require('child_process').exec;
 
   let temp;
 
   exec('bash /root/health/ghml/firewall.sh', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    temp = stdout;
    console.log(temp);
   });
   msg.reply(temp);
   }
   //DASH LINKS
   else if (msg.body !== null && msg.body === "8" && (msg.from === "120363286475964295@g.us")) {
    const exec = require('child_process').exec;
 
   let temp;
 
   exec('bash /root/health/ghml/links.sh', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    temp = stdout;
    console.log(temp);
   });
   msg.reply(temp);
   }
   //dash VMWARE
   else if (msg.body !== null && msg.body === "9" && (msg.from === "120363286475964295@g.us")) {
    const exec = require('child_process').exec;
 
   let temp;
 
   exec('bash /root/health/ghml/vmware.sh', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    temp = stdout;
    console.log(temp);
   });
   msg.reply(temp);
   }
   //DASH LINUX
   else if (msg.body !== null && msg.body === "10" && (msg.from === "120363286475964295@g.us")) {
    const exec = require('child_process').exec;
 
   let temp;
 
   exec('bash /root/health/ghml/linux.sh', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    temp = stdout;
    console.log(temp);
   });
   msg.reply(temp);
   }
   //DASH PACS
   else if (msg.body !== null && msg.body === "11" && (msg.from === "120363286475964295@g.us")) {
    const exec = require('child_process').exec;
 
   let temp;
 
   exec('bash /root/health/ghml/pacs.sh', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    temp = stdout;
    console.log(temp);
   });
   msg.reply(temp);
   }
   //DASH AD
   else if (msg.body !== null && msg.body === "12" && (msg.from === "120363286475964295@g.us")) {
    const exec = require('child_process').exec;
 
   let temp;
 
   exec('bash /root/health/ghml/ad.sh', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    temp = stdout;
    console.log(temp);
   });
   msg.reply(temp);
   }
      //DASH PERDADEPACOTE
  else if (msg.body !== null && msg.body === "13" && (msg.from === "120363286553751498@g.us" || msg.from === "120363285101601465@g.us")) { //grupos RJ2 FIREWALL e ZBX5
     const exec = require('child_process').exec;
     
    let temp;

     
    exec('bash /root/health/perdapacotes.sh', (error, stdout, stderr) => {
     if (error) {
         console.error(`exec error: ${error}`);
         return;
      }
      temp = stdout;
      console.log(temp);
     });
     msg.reply(temp);
     }

      //DASH MV
      else if (msg.body !== null && msg.body === "21" && (msg.from === "120363286475964295@g.us")) {
        const exec = require('child_process').exec;
     
       let temp;
     
       exec('bash /root/health/ghml/mv.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        temp = stdout;
        console.log(temp);
       });
       msg.reply(temp);
       } 
        //DASH TASY
        else if (msg.body !== null && msg.body === "22" && (msg.from === "120363286475964295@g.us")) {
          const exec = require('child_process').exec;
       
         let temp;
       
         exec('bash /root/health/ghml/tasy.sh', (error, stdout, stderr) => {
          if (error) {
              console.error(`exec error: ${error}`);
              return;
          }
          temp = stdout;
          console.log(temp);
         });
         msg.reply(temp);
         }
        //DASH H9J
        else if (msg.body !== null && msg.body === "23" && (msg.from === "120363286475964295@g.us")) {
          const exec = require('child_process').exec;
       
         let temp;
       
         exec('bash /root/health/ghml/mvh9j.sh', (error, stdout, stderr) => {
          if (error) {
              console.error(`exec error: ${error}`);
              return;
          }
          temp = stdout;
          console.log(temp);
         });
         msg.reply(temp);
         }
        //DASH MVLFT
        else if (msg.body !== null && msg.body === "24" && (msg.from === "120363286475964295@g.us")) {
          const exec = require('child_process').exec;
       
         let temp;
       
         exec('bash /root/health/ghml/mvlft.sh', (error, stdout, stderr) => {
          if (error) {
              console.error(`exec error: ${error}`);
              return;
          }
          temp = stdout;
          console.log(temp);
         });
         msg.reply(temp);
         }
        //DASH TASYHPR
        else if (msg.body !== null && msg.body === "25" && (msg.from === "120363286475964295@g.us")) {
          const exec = require('child_process').exec;
       
         let temp;
       
         exec('bash /root/health/ghml/tasyhpr.sh', (error, stdout, stderr) => {
          if (error) {
              console.error(`exec error: ${error}`);
              return;
          }
          temp = stdout;
          console.log(temp);
         });
         msg.reply(temp);
         } 
        //DASH TASYHSP
        else if (msg.body !== null && msg.body === "26" && (msg.from === "120363286475964295@g.us")) {
          const exec = require('child_process').exec;
       
         let temp;
       
         exec('bash /root/health/ghml/tasyhsp.sh', (error, stdout, stderr) => {
          if (error) {
              console.error(`exec error: ${error}`);
              return;
          }
          temp = stdout;
          console.log(temp);
         });
         msg.reply(temp);
         }       
        //DASH TASY NSC
        else if (msg.body !== null && msg.body === "27" && (msg.from === "120363286475964295@g.us")) {
          const exec = require('child_process').exec;
       
         let temp;
       
         exec('bash /root/health/ghml/tasynsc.sh', (error, stdout, stderr) => {
          if (error) {
              console.error(`exec error: ${error}`);
              return;
          }
          temp = stdout;
          console.log(temp);
         });
         msg.reply(temp);
         }
  ///############   GRUPO ROBO DASA  #######################################
  //##PAGINA INICIAL
  else if (msg.body !== null && msg.body === "1" && (msg.from === "120363280214182824@g.us")) {
    const exec = require('child_process').exec;
 
   let temp;
 
   exec('bash /root/health/gb/homeb.sh', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    temp = stdout;
    console.log(temp);
   });
   msg.reply(temp);
   }
  //#####WINDOWS
    else if (msg.body !== null && msg.body === "2" && (msg.from === "120363280214182824@g.us")) {
    const exec = require('child_process').exec;

    let temp;

    exec('bash /root/health/gb/windowsb.sh', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    temp = stdout;
    console.log(temp);
    });
    msg.reply(temp);
    }
    //###########BACKUP
    else if (msg.body !== null && msg.body === "3" && (msg.from === "120363280214182824@g.us")) {
      const exec = require('child_process').exec;
   
     let temp;
   
     exec('bash /root/health/gb/backupb.sh', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      temp = stdout;
      console.log(temp);
     });
     msg.reply(temp);
     }
     //// #### STORAGE
     else if (msg.body !== null && msg.body === "4" && (msg.from === "120363280214182824@g.us")) {
      const exec = require('child_process').exec;
   
     let temp;
   
     exec('bash /root/health/gb/storageb.sh', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      temp = stdout;
      console.log(temp);
     });
     msg.reply(temp);
     }
     ///###########SWITCH
     else if (msg.body !== null && msg.body === "5" && (msg.from === "120363280214182824@g.us")) {
      const exec = require('child_process').exec;
   
     let temp;
   
     exec('bash /root/health/gb/switchb.sh', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      temp = stdout;
      console.log(temp);
     });
     msg.reply(temp);
     }
     ///########ORACLE
     else if (msg.body !== null && msg.body === "6" && (msg.from === "120363280214182824@g.us")) {
      const exec = require('child_process').exec;
   
     let temp;
   
     exec('bash /root/health/gb/oracleb.sh', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      temp = stdout;
      console.log(temp);
     });
     msg.reply(temp);
     }
     ///#####FIREWALL
     else if (msg.body !== null && msg.body === "7" && (msg.from === "120363280214182824@g.us")) {
      const exec = require('child_process').exec;
   
     let temp;
   
     exec('bash /root/health/gb/firewallb.sh', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      temp = stdout;
      console.log(temp);
     });
     msg.reply(temp);
     }
     ///#####LINKS
     else if (msg.body !== null && msg.body === "8" && (msg.from === "120363280214182824@g.us")) {
      const exec = require('child_process').exec;
   
     let temp;
   
     exec('bash /root/health/gb/linksb.sh', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      temp = stdout;
      console.log(temp);
     });
     msg.reply(temp);
     }
     ///#####VMWARE
     else if (msg.body !== null && msg.body === "9" && (msg.from === "120363280214182824@g.us")) {
      const exec = require('child_process').exec;
   
     let temp;
   
     exec('bash /root/health/gb/vmwareb.sh', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      temp = stdout;
      console.log(temp);
     });
     msg.reply(temp);
     }
     //#####LINUX
     else if (msg.body !== null && msg.body === "10" && (msg.from === "120363280214182824@g.us")) {
      const exec = require('child_process').exec;
   
     let temp;
   
     exec('bash /root/health/gb/linuxb.sh', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      temp = stdout;
      console.log(temp);
     });
     msg.reply(temp);
     }
     ///####PACS
     else if (msg.body !== null && msg.body === "11" && (msg.from === "120363280214182824@g.us")) {
      const exec = require('child_process').exec;
   
     let temp;
   
     exec('bash /root/health/gb/pacsb.sh', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      temp = stdout;
      console.log(temp);
     });
     msg.reply(temp);
     }
     ///####AD
     else if (msg.body !== null && msg.body === "12" && (msg.from === "120363280214182824@g.us")) {
      const exec = require('child_process').exec;
   
     let temp;
   
     exec('bash /root/health/gb/adb.sh', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      temp = stdout;
      console.log(temp);
     });
     msg.reply(temp);
     }
     ///###MVCROSS
     else if (msg.body !== null && msg.body === "21" && (msg.from === "120363280214182824@g.us")) {
      const exec = require('child_process').exec;
   
     let temp;
   
     exec('bash /root/health/gb/mvb.sh', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      temp = stdout;
      console.log(temp);
     });
     msg.reply(temp);
     }
     ///###TASYCROSS
     else if (msg.body !== null && msg.body === "22" && (msg.from === "120363280214182824@g.us")) {
      const exec = require('child_process').exec;
   
     let temp;
   
     exec('bash /root/health/gb/tasyb.sh', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      temp = stdout;
      console.log(temp);
     });
     msg.reply(temp);
     }
     ///### MVH9J
     else if (msg.body !== null && msg.body === "23" && (msg.from === "120363280214182824@g.us")) {
      const exec = require('child_process').exec;
   
     let temp;
   
     exec('bash /root/health/gb/mvh9jb.sh', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      temp = stdout;
      console.log(temp);
     });
     msg.reply(temp);
     }
     ///### MVLFT
     else if (msg.body !== null && msg.body === "24" && (msg.from === "120363280214182824@g.us")) {
      const exec = require('child_process').exec;
   
     let temp;
   
     exec('bash /root/health/gb/mvlftb.sh', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      temp = stdout;
      console.log(temp);
     });
     msg.reply(temp);
     }
     ///####TASYHPR
     else if (msg.body !== null && msg.body === "25" && (msg.from === "120363280214182824@g.us")) {
      const exec = require('child_process').exec;
   
     let temp;
   
     exec('bash /root/health/gb/tasyhprb.sh', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      temp = stdout;
      console.log(temp);
     });
     msg.reply(temp);
     }
     ///#####TASYHSP
     else if (msg.body !== null && msg.body === "26" && (msg.from === "120363280214182824@g.us")) {
      const exec = require('child_process').exec;
   
     let temp;
   
     exec('bash /root/health/gb/tasyhspb.sh', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      temp = stdout;
      console.log(temp);
     });
     msg.reply(temp);
     }
     ///######TASY NSC
     else if (msg.body !== null && msg.body === "27" && (msg.from === "120363280214182824@g.us")) {
      const exec = require('child_process').exec;
   
     let temp;
   
     exec('bash /root/health/gb/tasynscb.sh', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      temp = stdout;
      console.log(temp);
     });
     msg.reply(temp);
     }
     //STATUS TOMCAT ALL
     else if (msg.body !== null && msg.body === "50" && (msg.from === "120363286553751498@g.us")) {
      const exec = require('child_process').exec;
   
     let temp;
   
     exec('ansible-playbook -i /root/ansible/hosts /root/ansible/tomcatstatus.yml', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      temp = stdout;
      console.log(temp);
     });
     msg.reply(temp);
     }
     //START TOMCAT 8400
     else if (msg.body !== null && msg.body === "51" && (msg.from === "120363286553751498@g.us")) {
      const exec = require('child_process').exec;
   
     let temp;
   
     exec('ansible-playbook -i /root/ansible/hosts /root/ansible/tomcatstart8400.yml', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      temp = stdout;
      console.log(temp);
     });
     msg.reply(temp);
     }
     //STOP TOMCAT 8400
     else if (msg.body !== null && msg.body === "52" && (msg.from === "120363286553751498@g.us")) {
      const exec = require('child_process').exec;
   
     let temp;
   
     exec('ansible-playbook -i /root/ansible/hosts /root/ansible/tomcatstop8400.yml', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      temp = stdout;
      console.log(temp);
     });
     msg.reply(temp);
     }
     //RESTART TOMCAT 8400
     /*else if (msg.body !== null && msg.body === "53" && (msg.from === "120363286553751498@g.us")) {
      const exec = require('child_process').exec;
   
     let temp;
   
     exec('ansible-playbook -i /root/ansible/hosts /root/ansible/tomcatrestart8400.yml', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      temp = stdout;
      console.log(temp);
     });
     msg.reply(temp);
     }*/
     //INPUT PORTA
     else if (msg.body !== null && msg.body === "53" && (msg.from === "120363286553751498@g.us")) {
      const exec = require('child_process').exec;
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });
    
      readline.question('Por favor, insira o numero da porta para reiniciar o servico: ', (porta) => {
        let temp;
    
        exec(`ansible-playbook -i /root/ansible/hosts /root/ansible/tomcatrestart.yml --extra-vars "porta=${porta}"`, (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
          temp = stdout;
          console.log(temp);
          msg.reply(temp);
        });
    
        readline.close();
      });
    }
     //CLEANUP TOMCAT 8400
     else if (msg.body !== null && msg.body === "54" && (msg.from === "120363286553751498@g.us")) {
      const exec = require('child_process').exec;
   
     let temp;
   
     exec('ansible-playbook -i /root/ansible/hosts /root/ansible/tomcatcleanup8400.yml', (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return;
      }
      temp = stdout;
      console.log(temp);
     });
     msg.reply(temp);
     } 
  else if (msg.body !== null && msg.body === "335") {
    const exec = require('child_process').exec;
 
   let temp;
 
   exec('bash /root/health/ad.sh', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    temp = stdout;
    console.log(temp);
   });
   msg.reply(temp);
   }
  
  else if (msg.body !== null && msg.body === "455") {

        const contact = await msg.getContact();
        setTimeout(function() {
            msg.reply(`@${contact.number}` + ' seu contato já foi encaminhado ');  
            client.sendMessage('559899086074@c.us','TI-Infraestrutura. https://wa.me/' + `${contact.number}`);
          },1000 + Math.floor(Math.random() * 1000));
  
  }
  
  else if (msg.body !== null && msg.body === "4555") {
    msg.reply("Seu contato já foi encaminhado ");
  }
  
  else if (msg.body !== null && msg.body === "56") {
    msg.reply("Arrumar");
  }
  

else if (msg.body !== null && msg.body === "S"){
    msg.reply(" Olá, Escolha uma das opções abaixo. \r\n*21*- MV CROSS. \r\n*22*- TASY CROSS. \r\n*23*- MV H9J. \r\n*24*- MV LFT. \r\n*25*- TASY HPR. \r\n*26*- TASY HSP. \r\n*27*- TASY NSC. \r\n");
	}  
//	else if (msg.body !== null && msg.body === "bot") opção para responder para todos os grupos
//  else if (msg.body !== null && msg.body === "bot" && msg.from === "120363191845039443@g.us") especificar o grupo que pode perguntar
else if (msg.body !== null && msg.body === "P"){
    msg.reply(" Olá, Escolha uma das opções abaixo. \r\n*1*- Painel Health Check. \r\n*2*- Painel Health Windows. \r\n*3*- Painel Health Backup. \r\n*4*- Painel Health Storage. \r\n*5*- Painel Health Switch. \r\n*6*- Painel Health Oracle. \r\n*7*- Painel Health Firewall. \r\n*8*- Painel Health Links. \r\n*9*- Painel Health VMware. \r\n*10*- Painel Health Linux. \r\n*11*- Painel Health Pacs. \r\n*12*- Painel Health AD. \r\n");
	}
else if (msg.body !== null && msg.body === "bot"){
    msg.reply(" Olá, Escolha uma das opções abaixo. \r\n *S* - Sistemas \r\n *P* - Paineis \r\n");
	}  
else if (msg.body !== null && msg.body === "services" && (msg.from === "120363286553751498@g.us")) { //TESTE RESTART SERVIÇOS
    msg.reply(" Olá, Escolha uma das opções abaixo. \r\n *50* - Tomcat Status All \r\n *51* - Start Tomcat 8400 \r\n *52* - Stop Tomcat 8400 \r\n *53* - Restart Tomcat 8400 \r\n *54* - Cleanup Tomcat 8400 \r\n");
  }    
});
    
server.listen(port, function() {
        console.log('App running on *: ' + port);
});
