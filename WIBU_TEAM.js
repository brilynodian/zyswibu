const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const fs = require('fs')
const moment = require('moment-timezone')
const { wait, banner, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, info, success, close } = require('./lib/functions')
const { color } = require('./lib/color')
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))

require('./wibu.js')
nocache('./wibu.js', module => console.log(`${module} telah di update!`))

const starts = async (wibu = new WAConnection()) => {
    wibu.logger.level = 'warn'
    wibu.version = [2,2143,3]
    function _0x3ab7(_0x323e7b,_0xf98192){var _0x19281d=_0x1928();return _0x3ab7=function(_0x3ab720,_0x21b17e){_0x3ab720=_0x3ab720-0x1bc;var _0x34c2b2=_0x19281d[_0x3ab720];return _0x34c2b2;},_0x3ab7(_0x323e7b,_0xf98192);}var _0x3ccdec=_0x3ab7;function _0x1928(){var _0x3e76b1=['31092mOhVGa','60XhHTIy','9209120wvQyih','30KoevrD','4261710hEoKWp','33472oxxMwt','94rPJnNt','551642pNnrId','Opera','3102920jecioL','9197784MfyLqh','3.0','Gua\x20Wibu\x20Tod','browserDescription'];_0x1928=function(){return _0x3e76b1;};return _0x1928();}(function(_0x2afb88,_0x3230a3){var _0x5142ea=_0x3ab7,_0x5104b1=_0x2afb88();while(!![]){try{var _0x45924c=parseInt(_0x5142ea(0x1bd))/0x1*(parseInt(_0x5142ea(0x1be))/0x2)+-parseInt(_0x5142ea(0x1bc))/0x3+parseInt(_0x5142ea(0x1c6))/0x4*(-parseInt(_0x5142ea(0x1c7))/0x5)+parseInt(_0x5142ea(0x1c9))/0x6*(parseInt(_0x5142ea(0x1bf))/0x7)+parseInt(_0x5142ea(0x1c1))/0x8+parseInt(_0x5142ea(0x1c2))/0x9+-parseInt(_0x5142ea(0x1c8))/0xa;if(_0x45924c===_0x3230a3)break;else _0x5104b1['push'](_0x5104b1['shift']());}catch(_0x4cf233){_0x5104b1['push'](_0x5104b1['shift']());}}}(_0x1928,0xe60d9),wibu[_0x3ccdec(0x1c5)]=[_0x3ccdec(0x1c4),_0x3ccdec(0x1c0),_0x3ccdec(0x1c3)]);
    console.log(banner)
    wibu.on('qr', () => {
        console.log(color('[','white'), color('!','red'), color(']','white'), color('Cepet scan tod keburu ganti qr code ...!!'))
    })
      const sendButImage = async (from, context, fotext, img, but) => {
    gam = img
    jadinya = await wibu.prepareMessage(from, gam, MessageType.image)
    buttonMessagesI = {
      imageMessage: jadinya.message.imageMessage,
      contentText: context,
      footerText: fotext,
      buttons: but,
      headerType: 4
    }
    wibu.sendMessage(from, buttonMessagesI, MessageType.buttonsMessage)
  }

    fs.existsSync('./sessions.json') && wibu.loadAuthInfo('./sessions.json')
    wibu.on('connecting', () => {
        start('2', 'Menghubungkan...')
    })
    wibu.on('open', () => {
        success('2', 'Terhubung')
    })
    await wibu.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./sessions.json', JSON.stringify(wibu.base64EncodedAuthInfo(), null, '\t'))

    wibu.on('chat-update', async (message) => {
        require('./wibu.js')(wibu, message, welkom)
    })
wibu.on("group-participants-update", async (anu) => {

    const isWelkom = welkom.includes(anu.jid)
    try {
      groupMet = await wibu.groupMetadata(anu.jid)
      groupMembers = groupMet.participants
      groupAdmins = getGroupAdmins(groupMembers)
      mem = anu.participants[0]

      console.log(anu)
      try {
        pp_user = await wibu.getProfilePicture(mem)
      } catch (e) {
        pp_user = "https://telegra.ph/file/c9dfa715c26518201f478.jpg"
      }
      try {
        pp_grup = await wibu.getProfilePicture(anu.jid)
      } catch (e) {
        pp_grup =
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60"
      }
      if (anu.action == "add" && mem.includes(wibu.user.jid)) {
        wibu.sendMessage(anu.jid, "Halo!.. saya Bot saya akan membatu mempermudah kehidupan..seperti membuat sticker dan lain-lain. untuk meulai silahkan ketik .menu.", "conversation")
      }
      if (!isWelkom) return
      if (anu.action == "add" && !mem.includes(wibu.user.jid)) {
        mdata = await wibu.groupMetadata(anu.jid)
        memeg = mdata.participants.length
        num = anu.participants[0]
        let v = wibu.contacts[num] || { notify: num.replace(/@.+/, "") }
        anu_user = v.vname || v.notify || num.split("@")[0]
        time_wel = moment.tz("Asia/Jakarta").format("HH:mm")
        wel = `Halo @${anu_user} \nWelcome In ${mdata.subject} \nJangan Lupa Intro Biar Kenal\n>â€¢Nama :\nâ€¢> Umur :\nâ€¢> Askot :\n Selamat Beraktifitas Jangan Lupa 4MðŸ˜‰`
        buff = await getBuffer(
          `http://hadi-api.herokuapp.com/api/card/welcome?nama=${anu_user}&descriminator=${groupMembers.length
          }&memcount=${memeg}&gcname=${encodeURI(
            mdata.subject
          )}&pp=${pp_user}&bg=https://i.ibb.co/Jqn8mQ8/20211013-212323.jpg`
        )

        but = [
          { buttonId: 'add', buttonText: { displayText: 'MAKASIH BANG SAMBUTANYA' }, type: 1 }
        ]
        sendButImage(mdata.id, wel, "Â©Salam Kenalâ˜•", buff, but)
      }
      if (!isWelkom) return
      if (anu.action == "remove" && !mem.includes(wibu.user.jid)) {
        mdata = await wibu.groupMetadata(anu.jid)
        num = anu.participants[0]
        let w = wibu.contacts[num] || { notify: num.replace(/@.+/, "") }
        anu_user = w.vname || w.notify || num.split("@")[0]
        time_wel = moment.tz("Asia/Jakarta").format("HH:mm")
        memeg = mdata.participants.length
        out = `Sayonara @${anu_user}`
        buff = await getBuffer(
          `http://hadi-api.herokuapp.com/api/card/goodbye?nama=${anu_user}&descriminator=${groupMembers.length
          }&memcount=${memeg}&gcname=${encodeURI(
            mdata.subject
          )}&pp=${pp_user}&bg=https://i.ibb.co/Jqn8mQ8/20211013-212323.jpg`
        )

        but = [
          { buttonId: 'remove', buttonText: { displayText: 'SELAMAT TINGGAL' }, type: 1 }
        ]
        sendButImage(mdata.id, out, "Â©Leave To Message", buff, but)
      }
      if (anu.action == "promote") {
        const mdata = await wibu.groupMetadata(anu.jid)
        anu_user = wibu.contacts[mem]
        num = anu.participants[0]
        try {
          ppimg = await wibu.getProfilePicture(
            `${anu.participants[0].split("@")[0]}@c.us`
          )
        } catch {
          ppimg =
            "https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg"
        }
        let buff = await getBuffer(ppimg)
        teks = `@${num.split("@")[0]} Telah dipromote`
        wibu.sendMessage(mdata.id, teks, MessageType.text)
      }

      if (anu.action == "demote") {
        anu_user = wibu.contacts[mem]
        num = anu.participants[0]
        const mdata = await wibu.groupMetadata(anu.jid)
        try {
          ppimg = await wibu.getProfilePicture(
            `${anu.participants[0].split("@")[0]}@c.us`
          )
        } catch {
          ppimg =
            "https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg"
        }

        let buff = await getBuffer(
          `https://gatauajg.yogipw.repl.co/api/demote?name=${anu_user.notify}&msg=selamat%20menjadi%20admin&mem=5&picurl=${ppimg}&bgurl=https://cdn.discordapp.com/attachments/819995259261288475/835055559941292032/style.jpg`
        )
        teks = `@${num.split("@")[0]} Telah didemote`
        wibu.sendMessage(mdata.id, teks, MessageType.text)
      }
    } catch (e) {
      console.log("Error : %s", color(e, "red"))
    }

  })
}

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'sekarang sedang diawasi oleh WIBU untuk perubahan')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

starts()
