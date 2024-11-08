let fetch = require('node-fetch');
let handler = m => m;
handler.before = async function (m, {
	conn,
	isPrems
}) {
	let chat = global.db.data
		.chats[m.chat];
	if (!m.text) return;
	if (m.text.startsWith(
		'=>') || m.text
		.startsWith('>') || m
		.text.startsWith('.') ||
		m.text.startsWith(
		'#') || m.text
		.startsWith('!') || m
		.text.startsWith('/') ||
		m.text.startsWith('\/'))
		return;
	if (chat.isBanned) return;
	if (!m.text.includes(
		'http')) return;
	let text = m.text.replace(
		/\n+/g, ' ');
	const tiktokRegex =
		/^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/i;
	const douyinRegex =
		/^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.|v\.)?(?:douyin\.com\/)(?:\S+)?$/i;
	const instagramRegex =
		/^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)(?:tv\/|p\/|reel\/)(?:\S+)?$/i;
	const facebookRegex =
		/^(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/i;
	if (text.match(
		tiktokRegex)) {
		conn.sendMessage(m
		.chat, {
			react: {
				text: '🕒',
				key: m
					.key,
			}
		});
		await _tiktok(text
			.match(
				tiktokRegex
				)[0], m);
	}
	else if (text.match(
			douyinRegex)) {
		conn.sendMessage(m
		.chat, {
			react: {
				text: '🕒',
				key: m
					.key,
			}
		});
		await _douyin(text
			.match(
				douyinRegex
				)[0], m);
	}
	else if (text.match(
			instagramRegex)) {
		conn.sendMessage(m
		.chat, {
			react: {
				text: '🕒',
				key: m
					.key,
			}
		});
		await _instagram(text
			.match(
				instagramRegex
				)[0], m);
	}
	else if (text.match(
			facebookRegex)) {
		conn.sendMessage(m
		.chat, {
			react: {
				text: '🕒',
				key: m
					.key,
			}
		});
		await _facebook(text
			.match(
				facebookRegex
				)[0], m);
	}
	return !0;
}
module.exports = handler;
let old = new Date()
const _sleep = (ms) => {
	return new Promise(resolve =>
		setTimeout(resolve, ms));
}
async function _tiktok(link, m) {
	try {
		if (global.db.data.users[m
				.sender].limit >
			0) {
			const response =
				await fetch(
					`https://api.botcahx.eu.org/api/download/tiktok?url=${link}&apikey=${btc}`
					);
			const data =
				await response
				.json();
			if (!data.result.video)
				return;
			if (data.result.video
				.length > 1) {
				global.db.data
					.users[m.sender]
					.limit -= 1;
				for (let v of data
						.result
						.video) {
					await conn
						.sendFile(m
							.chat,
							v, null,
							`🍟 *Fetching* : ${((new Date - old) * 1)} ms`,
							m);
					await _sleep(
						3000);
				}
			}
			else {
				await conn
					.sendMessage(m
						.chat, {
							video: {
								url: data
									.result
									.video[
										0
										]
							},
							caption: `🍟 *Fetching* : ${((new Date - old) * 1)} ms`
						}, {
							mention: m
						});
			}
		}
		else {
			conn.reply(m.chat,
				'limit kamu habis!',
				m);
		}
	}
	catch (error) {
		console.error(error);
	}
}
async function _douyin(link, m) {
	try {
		if (global.db.data.users[m
				.sender].limit >
			0) {
			let response =
				await fetch(
					`https://api.botcahx.eu.org/api/download/douyin?url=${link}&apikey=${btc}`
					);
			let data =
				await response
				.json();
			if (!data.result
				.video || data
				.result.video
				.length === 0) {
				response =
					await fetch(
						`https://api.botcahx.eu.org/api/download/douyinslide?url=${link}&apikey=${btc}`
						);
				data =
					await response
					.json();
				if (data.result
					.images && data
					.result.images
					.length > 0) {
					global.db.data
						.users[m
							.sender]
						.limit -= 1;
					for (let img of
							data
							.result
							.images) {
						await conn
							.sendFile(
								m
								.chat,
								img,
								null,
								`🍟 *Fetching* : ${((new Date - old) * 1)} ms`,
								m);
						await _sleep
							(3000);
					}
					return;
				}
			}
			if (data.result.video &&
				data.result.video
				.length > 0) {
				global.db.data
					.users[m.sender]
					.limit -= 1;
				if (data.result
					.video.length >
					1) {
					for (let v of
							data
							.result
							.video) {
						await conn
							.sendFile(
								m
								.chat,
								v,
								null,
								`🍟 *Fetching* : ${((new Date - old) * 1)} ms`,
								m);
						await _sleep
							(3000);
					}
				}
				else {
					await conn
						.sendMessage(
							m
							.chat, {
								video: {
									url: data
										.result
										.video[
											0
											]
								},
								caption: `🍟 *Fetching* : ${((new Date - old) * 1)} ms`
							}, {
								mention: m
							});
				}
			}
			else {
				conn.reply(m.chat,
					'Maaf, tidak dapat mengunduh konten!',
					m);
			}
		}
		else {
			conn.reply(m.chat,
				'limit kamu habis!',
				m);
		}
	}
	catch (error) {
		console.error(error);
	}
}
async function _instagram(link, m) {
	try {
		if (global.db.data.users[m
				.sender].limit >
			0) {
			const response =
				await fetch(
					`https://api.botcahx.eu.org/api/download/igdowloader?url=${link}&apikey=${btc}`
					);
			let message =
				await response
				.json();
			global.db.data.users[m
					.sender]
				.limit -= 1;
			for (let i of message
					.message) {
				conn.sendFile(m
					.chat, i
					._url, null,
					`🍟 *Fetching* : ${((new Date - old) * 1)} ms`,
					m);
			}
		}
		else {
			conn.reply(m.chat,
				'limit kamu habis!',
				m);
		}
	}
	catch (err) {
		console.error(error);
	}
}
async function _facebook(link, m) {
	try {
		if (global.db.data.users[m
				.sender].limit >
			0) {
			const old = new Date();
			const response =
				await fetch(
					`https://api.botcahx.eu.org/api/dowloader/fbdown3?url=${link}&apikey=${btc}`
					);
			let json =
				await response
				.json();
			let urls = json.result
				.url.urls;
			if (Array.isArray(
				urls) && urls.some(
					url => url.sd)
				) {
				global.db.data
					.users[m.sender]
					.limit -= 1;
				let videoUrl = urls
					.find(url => url
						.sd).sd;
				conn.sendFile(m
					.chat,
					videoUrl,
					'fb.mp4',
					`🍟 *Fetching* : ${((new Date - old) * 1)} ms`,
					m);
			}
			else {
				conn.reply(m.chat,
					'Gagal mendapatkan video',
					m);
			}
		}
		else {
			conn.reply(m.chat,
				'limit kamu habis!',
				m);
		}
	}
	catch (error) {
		console.error(error);
	}
}
