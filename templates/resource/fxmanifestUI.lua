fx_version 'adamant'

game 'gta5'

description '<description>'

version '1.0'

client_scripts {
	'@es_extended/locale.lua',
	'locales/fr.lua',
	'config.lua',
	'client/main.lua',
}

server_scripts {
	'@es_extended/locale.lua',
	'@mysql-async/lib/MySQL.lua',
	'locales/fr.lua',
	'config.lua',
	'server/main.lua',
}

ui_page 'nui/ui.html'
files {
	'nui/ui.html',
	'nui/css/style.css',
	'nui/js/main.js'
}