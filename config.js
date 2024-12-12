global.owner = ['62882007734066']  
global.mods = ['62882007734066'] 
global.prems = ['62882007734066']
global.nameowner = 'menungso'
global.numberowner = '62882007734066' 
global.mail = 'support@eu.org' 
global.gc = 'https://chat.whatsapp.com/CP5mV2D9IO730HpBgmkuyi'
global.instagram = 'https://instagram.com/ulhaqmz_'
global.wm = '© ulhaqmz_'
global.wait = '_*Tunggu sedang di proses...*_'
global.eror = '_*Server Error*_'
global.stiker_wait = '*⫹⫺ Stiker sedang dibuat...*'
global.packname = 'Made With'
global.author = 'Bot WhatsApp'
global.autobio = false // Set true untuk mengaktifkan autobio
global.maxwarn = '3' // Peringatan maksimum
global.antiporn = true // Auto delete pesan porno (bot harus admin)

//INI WAJIB DI ISI!//
global.btc = 'ulhaqmz' 
//Daftar terlebih dahulu https://api.botcahx.eu.org

//INI OPTIONAL BOLEH DI ISI BOLEH JUGA ENGGA//
global.lann = 'YOUR_APIKEY_HERE'
//Daftar https://api.betabotz.eu.org 

//jangan diganti!
global.APIs = {   
  btc: 'https://api.botcahx.eu.org'
}

//ini tidak di isi juga tidak apa-apa
global.APIKeys = { 
  'https://api.botcahx.eu.org': 'APIKEY' 
}

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})
