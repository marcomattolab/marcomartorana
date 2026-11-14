// Site Assistant — a lightweight, client-side chat that answers from the site's
// content index (search.json, already generated for Lunr search). No backend, no API key.
(function () {
  'use strict';

  var INDEX_URL = (document.querySelector('script[data-index]') || {}).dataset && 
      (document.querySelector('script[data-index]') || {}).dataset.index;
  if (!INDEX_URL) {
    // Fallback: the Lunr search script sets data-index on its script tag.
    INDEX_URL = '/search.json';
  }

  var index = null;
  var indexPromise = null;

  function loadIndex() {
    if (indexPromise) return indexPromise;
    indexPromise = fetch(INDEX_URL)
      .then(function (r) { return r.json(); })
      .then(function (data) { index = data; return data; })
      .catch(function () { index = []; });
    return indexPromise;
  }

  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ---- DOM ----
  var panelHTML =
    '<button id="chat-toggle" class="chat-toggle" type="button" aria-label="Apri assistente">' +
      '<i class="bi bi-chat-dots-fill"></i>' +
    '</button>' +
    '<div id="chat-panel" class="chat-panel" hidden>' +
      '<div class="chat-header">' +
        '<span class="chat-header-title"><i class="bi bi-robot"></i> Assistente</span>' +
        '<button id="chat-close" class="chat-close" type="button" aria-label="Chiudi">&times;</button>' +
      '</div>' +
      '<div id="chat-messages" class="chat-messages"></div>' +
      '<div id="chat-suggestions" class="chat-suggestions"></div>' +
      '<div class="chat-input-row">' +
        '<input id="chat-input" type="text" placeholder="Chiedi qualcosa…" autocomplete="off" aria-label="Messaggio">' +
        '<button id="chat-send" class="chat-send" type="button" aria-label="Invia"><i class="bi bi-send-fill"></i></button>' +
      '</div>' +
    '</div>';

  var host = document.createElement('div');
  host.innerHTML = panelHTML;
  while (host.firstChild) document.body.appendChild(host.firstChild);

  var toggle = document.getElementById('chat-toggle');
  var panel = document.getElementById('chat-panel');
  var closeBtn = document.getElementById('chat-close');
  var messages = document.getElementById('chat-messages');
  var suggestions = document.getElementById('chat-suggestions');
  var input = document.getElementById('chat-input');
  var sendBtn = document.getElementById('chat-send');
  var opened = false;

  function addMessage(html, who) {
    var div = document.createElement('div');
    div.className = 'chat-msg ' + (who || 'bot');
    if (who === 'user') {
      div.textContent = html;
    } else {
      div.innerHTML = html;
    }
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function addUserMessage(text) {
    addMessage(text, 'user');
  }

  function addBotMessage(html) {
    addMessage(html, 'bot');
  }

  function showSuggestions(list) {
    suggestions.innerHTML = '';
    list.forEach(function (s) {
      var chip = document.createElement('button');
      chip.className = 'chat-chip';
      chip.type = 'button';
      chip.textContent = s;
      chip.addEventListener('click', function () {
        input.value = s;
        send();
      });
      suggestions.appendChild(chip);
    });
  }

  function open() {
    panel.hidden = false;
    opened = true;
    toggle.setAttribute('aria-expanded', 'true');
    if (!messages.children.length) {
      addBotMessage('Ciao! 👋 Sono l\'assistente di <strong>Marco Martorana</strong>. Posso aiutarti a trovare articoli e informazioni sul sito.');
      showSuggestions(['Articoli su Angular', 'Cosa c\'è su AI?', 'Chi sei?', 'Contatti']);
    }
    loadIndex();
    setTimeout(function () { input.focus(); }, 50);
  }

  function close() {
    panel.hidden = true;
    opened = false;
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () { opened ? close() : open(); });
  closeBtn.addEventListener('click', close);

  // ---- Intent detection ----
  function navTarget(q) {
    var ql = q.toLowerCase().trim();
    var hasNavWord = /(sezione|vai a|vai alla|apri|dove trovo|pagina|mostra)/.test(ql);
    if (/(artificial|intelligenza artificiale|\bai\b)/.test(ql) && (hasNavWord || ql === 'ai')) return { url: '/ai/', label: 'Sezione AI' };
    if (/informatica/.test(ql) && (hasNavWord || ql === 'informatica')) return { url: '/informatics/', label: 'Sezione Informatics' };
    if (/(meeting|eventi|evento|conferenze)/.test(ql) && (hasNavWord || /^(meeting|eventi)/.test(ql))) return { url: '/meetings/', label: 'Sezione Meetings' };
    if (/\bnote\b/.test(ql) && (hasNavWord || ql === 'note')) return { url: '/notes/', label: 'Note' };
    if (/(scuola|school)/.test(ql) && (hasNavWord || ql === 'scuola')) return { url: '/tags/school/', label: 'Tag School' };
    if (/(about|chi sono|chi è marco)/.test(ql) && hasNavWord) return { url: '/about/', label: 'About' };
    if (/(home|inizio|prima pagina)/.test(ql) && hasNavWord) return { url: '/', label: 'Home' };
    return null;
  }

  function detectIntent(q) {
    var ql = q.toLowerCase();
    if (/^(ciao|salve|hey|hi|hello|buongiorno|buonasera|ehi)\b/.test(ql)) return 'greeting';
    if (/(grazie|thanks|thank you)/.test(ql)) return 'thanks';
    if (/(aiuto|help|cosa puoi fare|come funzioni|istruzioni|comandi)/.test(ql)) return 'help';
    if (/(chi sei|chi è marco|about|presentati|parlami di te|info su di te|cosa tratta|cos'è questo sito|di cosa parla)/.test(ql)) return 'about';
    if (/(contatt|email|linkedin|github|social|telefono|youtube|instagram|contatti|dove ti trovo)/.test(ql)) return 'contacts';
    if (navTarget(q)) return 'nav';
    return 'search';
  }

  // ---- Search over the index ----
  function searchPosts(query) {
    var q = query.toLowerCase();
    var tokens = q.split(/[^a-z0-9àèéìòùâêîôûäëïöüç]+/).filter(function (t) { return t.length > 2; });
    if (!tokens.length) return [];

    var results = [];
    (index || []).forEach(function (p) {
      var score = 0;
      var title = (p.title || '').toLowerCase();
      var tags = (p.tags || []).join(' ').toLowerCase();
      var cats = (p.categories || []).join(' ').toLowerCase();
      var desc = (p.description || '').toLowerCase();
      tokens.forEach(function (t) {
        if (title.indexOf(t) !== -1) score += 5;
        if (tags.indexOf(t) !== -1) score += 4;
        if (cats.indexOf(t) !== -1) score += 3;
        if (desc.indexOf(t) !== -1) score += 1;
      });
      if (score > 0) results.push({ p: p, score: score });
    });

    results.sort(function (a, b) { return b.score - a.score; });
    return results.slice(0, 4).map(function (r) { return r.p; });
  }

  function renderResults(posts) {
    if (!posts.length) {
      return 'Non ho trovato nulla su questo argomento. 🤔 Prova con parole chiave diverse (es. <em>python</em>, <em>angular</em>, <em>aws</em>, <em>ai</em>) o chiedimi di una sezione.';
    }
    var html = 'Ecco cosa ho trovato:' + '<div class="chat-results">';
    posts.forEach(function (p) {
      html += '<a class="chat-result" href="' + escapeHtml(p.uri) + '">' +
        '<span class="chat-result-title">' + escapeHtml(p.title) + '</span>' +
        (p.description ? '<span class="chat-result-desc">' + escapeHtml(p.description.slice(0, 90)) + '…</span>' : '') +
        '</a>';
    });
    html += '</div>';
    return html;
  }

  function respond(query) {
    var intent = detectIntent(query);
    var target;

    switch (intent) {
      case 'greeting':
        addBotMessage('Ciao! 👋 Scrivimi un argomento (es. <em>articoli su Angular</em>) oppure chiedimi <em>chi sei</em>, <em>contatti</em>, o di aprire una sezione.');
        showSuggestions(['Articoli su Angular', 'Cosa c\'è su AI?', 'Chi sei?', 'Contatti']);
        break;
      case 'thanks':
        addBotMessage('Di nulla! 😊 Se ti serve altro, chiedimi pure di cercare articoli.');
        break;
      case 'help':
        addBotMessage('Posso aiutarti a navigare il sito. Prova con:<br>• <em>Articoli su Angular</em> o un qualsiasi argomento<br>• <em>Sezione AI</em> / <em>Note</em> / <em>Meetings</em><br>• <em>Chi sei?</em> · <em>Contatti</em>');
        break;
      case 'about':
        addBotMessage('<strong>Marco Martorana</strong> è Lead Software Engineer, docente di informatica ed esperto Angular e AI con oltre 20 anni di esperienza. Il sito raccoglie articoli su AI, Angular, Python, informatica e molto altro.<br><a class="chat-result" href="/about/">→ Vai alla pagina About</a>');
        break;
      case 'contacts':
        addBotMessage('Puoi trovare Marco qui:<br>• <a href="https://linkedin.com/in/marcomartorana" target="_blank" rel="noopener">LinkedIn</a><br>• <a href="https://github.com/marcomattolab" target="_blank" rel="noopener">GitHub</a><br>• <a href="https://www.youtube.com/@MarcoMartoranaAI" target="_blank" rel="noopener">YouTube</a><br>• <a href="https://www.instagram.com/marcomartorana.lab" target="_blank" rel="noopener">Instagram</a><br><a class="chat-result" href="/about/">→ Tutti i contatti nella pagina About</a>');
        break;
      case 'nav':
        target = navTarget(query);
        addBotMessage('Ti apro la ' + target.label + ':<br><a class="chat-result" href="' + target.url + '">→ ' + target.label + '</a>');
        break;
      default:
        loadIndex().then(function () {
          var posts = searchPosts(query);
          addBotMessage(renderResults(posts));
        });
    }
  }

  function send() {
    var text = input.value.trim();
    if (!text) return;
    input.value = '';
    addUserMessage(text);
    suggestions.innerHTML = '';
    respond(text);
  }

  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') send();
  });

  // Preload the index quietly after load
  if (document.readyState === 'complete') loadIndex();
  else window.addEventListener('load', loadIndex);
})();
