const mineflayer = require('mineflayer');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('AFKBot está online!'));
app.listen(port, () => console.log(`[WEB] Rodando na porta ${port}`));

function criarBot() {
  const bot = mineflayer.createBot({
    host: 'CardCraft.aternos.me',
    port: 60232,
    username: 'AFKBot',
    version: '1.12.1'
  });

  bot.on('spawn', () => {
    console.log('[AFKBot] Entrou no servidor!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 60 * 1000);
  });

  bot.on('end', () => {
    console.log('[AFKBot] Caiu! Reconectando em 10s...');
    setTimeout(criarBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('[AFKBot] Erro:', err);
  });
}

criarBot();