/*
	Comandos Basicos
*
*   NO TOCAR SIN SABER COMO EDITAR
*/

Settings.addPermissions(['say']);

exports.commands = {
	credits: 'about',
	bot: 'about',
	about: function () {
		this.restrictReply('Hola, soy __' + this.botName + '__ un bot creado y programado por **Missiingno** y **Puño Bala**, si presento algun problema o fallo contactar con ellos.');
	},

	git: 'github',
	github: function () {
		this.restrictReply('No estas autorizado para recibir esta informacion');
	},

	botversion: 'version',
	version: function () {
		this.restrictReply(Tools.stripCommands(Settings.package.version), 'info');
	},

	guide: 'help',
	botguide: 'help',
	help: function () {
		this.restrictReply(this.trad('guide') + ': ' + (Config.botguide), 'info');
	},

	bottime: 'time',
	time: function () {
		var f = new Date();
		this.restrictReply("**" + this.trad('time') + ":** __" + f.toString() + "__", 'info');
	},

	uptime: function () {
		var text = '';
		text += '**Tiempo en linea:** ';
		var divisors = [52, 7, 24, 60, 60];
		var units = [this.trad('week'), this.trad('day'), this.trad('hour'), this.trad('minute'), this.trad('second')];
		var buffer = [];
		var uptime = ~~(process.uptime());
		do {
			var divisor = divisors.pop();
			var unit = uptime % divisor;
			if (!unit) {
				units.pop();
				uptime = ~~(uptime / divisor);
				continue;
			}
			buffer.push(unit > 1 ? unit + ' ' + units.pop() + 's' : unit + ' ' + units.pop());
			uptime = ~~(uptime / divisor);
		} while (uptime);

		switch (buffer.length) {
		case 5:
			text += buffer[4] + ', ';
			text += buffer[3] + ', ';
			text += buffer[2] + ', ' + buffer[1] + ', ' + this.trad('and') + ' ' + buffer[0];
			break;
		case 4:
			text += buffer[3] + ', ';
			text += buffer[2] + ', ' + buffer[1] + ', ' + this.trad('and') + ' ' + buffer[0];
			break;
		case 3:
			text += buffer[2] + ', ' + buffer[1] + ', ' + this.trad('and') + ' ' + buffer[0];
			break;
		case 2:
			text += buffer[1] + ' ' + this.trad('and') + ' ' + buffer[0];
			break;
		case 1:
			text += buffer[0];
			break;
		}
		this.restrictReply(text, 'info');
	},

	seen: function (arg, by, room, cmd) {
		var text = '';
		arg = toId(arg);
		if (!arg || arg.length > 18) return this.pmReply(this.trad('inv'));
		if (arg === toId(Bot.status.nickName)) return this.pmReply(this.trad('bot'));
		if (arg === toId(by)) return this.pmReply(this.trad('self'));
		if (Settings.seen[arg]) {
			var dSeen = Settings.seen[arg];
			text += '**' + (dSeen.name || arg).trim() + '** ' + this.trad('s1') + ' __' + Tools.getTimeAgo(dSeen.time, this.language).trim() + (this.trad('s2') ? ('__ ' + this.trad('s2')) : '__');
			if (dSeen.room) {
				switch (dSeen.action) {
					case 'j':
						text += ', ' + this.trad('j') + ' <<' + dSeen.room + '>>';
						break;
					case 'l':
						text += ', ' + this.trad('l') + ' <<' + dSeen.room + '>>';
						break;
					case 'c':
						text += ', ' + this.trad('c') + ' <<' + dSeen.room + '>>';
						break;
					case 'n':
						text += ', ' + this.trad('n') + ' **' + dSeen.args[0] + '**';
						break;
				}
			}
		} else {
			text += this.trad('n1') + ' ' + arg + ' ' + this.trad('n2');
		}
		this.pmReply(text);
	},

	say: function (arg) {
		if (!arg) return;
		if (!this.can('say')) return;
		this.reply(Tools.stripCommands(arg));
	}
};