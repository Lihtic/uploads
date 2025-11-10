// demo-windows-login.js
// Educational demo ONLY — does NOT collect credentials, does NOT send data.
// Use on local pages or a sandboxed demo environment. Do NOT run on live/production sites.

(function () {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'demo-win-overlay';
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    zIndex: 2147483646, // very high but below browser UI
    background: 'rgba(0,0,0,0.55)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(3px)'
  });

  // Create container (login box)
  const box = document.createElement('div');
  box.id = 'demo-win-box';
  Object.assign(box.style, {
    width: '420px',
    maxWidth: '92%',
    borderRadius: '10px',
    padding: '28px',
    boxSizing: 'border-box',
    background: 'linear-gradient(180deg, #f7f8fa, #eef1f5)',
    boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
    fontFamily: 'Segoe UI, Roboto, system-ui, -apple-system, "Helvetica Neue", Arial',
    color: '#111'
  });

  // Header (Windows-style avatar area + title)
  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.alignItems = 'center';
  header.style.gap = '14px';

  const avatar = document.createElement('div');
  Object.assign(avatar.style, {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg,#3b82f6,#06b6d4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '28px',
    fontWeight: '700',
    boxShadow: '0 6px 18px rgba(0,0,0,0.25)'
  });
  avatar.textContent = 'ED';

  const titleWrap = document.createElement('div');
  const title = document.createElement('div');
  title.textContent = 'Education Demo — Windows Login (SIMULATED)';
  title.style.fontSize = '16px';
  title.style.fontWeight = '600';

  const subtitle = document.createElement('div');
  subtitle.textContent = 'DEMO ONLY — DO NOT ENTER REAL CREDENTIALS';
  subtitle.style.fontSize = '11px';
  subtitle.style.color = '#b91c1c';
  subtitle.style.marginTop = '4px';
  subtitle.style.fontWeight = '700';

  titleWrap.appendChild(title);
  titleWrap.appendChild(subtitle);
  header.appendChild(avatar);
  header.appendChild(titleWrap);

  // Form area (but inputs are readonly and harmless)
  const form = document.createElement('div');
  form.style.marginTop = '18px';

  const info = document.createElement('div');
  info.textContent = 'This overlay demonstrates how an attacker could mimic a system login. This is a harmless, local demo — inputs are disabled.';
  info.style.fontSize = '12px';
  info.style.color = '#333';
  info.style.marginBottom = '12px';
  info.style.lineHeight = '1.35';

  // Input builder that disables typing
  function makeField(labelText, placeholder, type = 'text') {
    const wrapper = document.createElement('div');
    wrapper.style.marginBottom = '10px';

    const label = document.createElement('label');
    label.textContent = labelText;
    label.style.display = 'block';
    label.style.fontSize = '12px';
    label.style.marginBottom = '6px';

    const input = document.createElement('input');
    input.type = type;
    input.placeholder = placeholder;
    // SAFETY: make readonly + prevent paste, copy etc.
    input.readOnly = true;
    input.tabIndex = -1;
    Object.assign(input.style, {
      width: '100%',
      padding: '10px 12px',
      borderRadius: '6px',
      border: '1px solid #cfcfd3',
      boxSizing: 'border-box',
      background: '#f7f8fa',
      color: '#666'
    });

    // Make sure no keyboard input or paste can change anything
    input.addEventListener('keydown', function (e) { e.preventDefault(); });
    input.addEventListener('paste', function (e) { e.preventDefault(); });
    input.addEventListener('drop', function (e) { e.preventDefault(); });

    // A small helper note
    const note = document.createElement('div');
    note.style.fontSize = '11px';
    note.style.marginTop = '6px';
    note.style.color = '#666';
    note.textContent = 'Input disabled for safety — demo only.';

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    wrapper.appendChild(note);
    return wrapper;
  }

  form.appendChild(info);
  form.appendChild(makeField('Username', 'yourname@domain.com', 'text'));
  form.appendChild(makeField('Password', '••••••••', 'password'));

  // Buttons (login is inert and only shows a safe message)
  const buttons = document.createElement('div');
  buttons.style.marginTop = '16px';
  buttons.style.display = 'flex';
  buttons.style.gap = '10px';
  buttons.style.justifyContent = 'flex-end';

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.textContent = 'Close';
  Object.assign(closeBtn.style, {
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #cfcfd3',
    background: 'white',
    cursor: 'pointer'
  });
  closeBtn.addEventListener('click', removeOverlay);

  const loginBtn = document.createElement('button');
  loginBtn.type = 'button';
  loginBtn.textContent = 'Sign in (Demo)';
  Object.assign(loginBtn.style, {
    padding: '8px 14px',
    borderRadius: '8px',
    border: 'none',
    background: '#0b5fff',
    color: 'white',
    cursor: 'pointer',
    fontWeight: '600'
  });

  // Harmless click: show educational message only, do NOT capture anything
  loginBtn.addEventListener('click', function () {
    // Show a modal reminding it's a demo and that real credentials must not be entered
    const w = window.open('', '_blank', 'noopener,noreferrer,width=480,height=220');
    if (w) {
      w.document.title = 'Demo — No credentials collected';
      const s = `
        <div style="font-family:Segoe UI,Arial,sans-serif;padding:20px;">
          <h2 style="margin:0 0 8px 0">Educational Demo</h2>
          <p style="margin:0 0 12px 0">This is a safe demonstration overlay. No input is collected or sent anywhere. Never enter real passwords on untrusted pages.</p>
          <button id="close" style="padding:8px 12px;border-radius:6px;border:none;background:#0b5fff;color:white;cursor:pointer">Close</button>
        </div>
      `;
      w.document.body.innerHTML = s;
      w.document.getElementById('close').addEventListener('click', function () { w.close(); });
    } else {
      // fallback: small page alert
      alert('Educational demo — no credentials are collected. Do NOT enter real passwords on untrusted pages.');
    }
  });

  buttons.appendChild(closeBtn);
  buttons.appendChild(loginBtn);

  // Watermark (big and obvious)
  const watermark = document.createElement('div');
  watermark.textContent = 'EDUCATIONAL DEMO — DO NOT ENTER REAL CREDENTIALS';
  Object.assign(watermark.style, {
    position: 'fixed',
    top: '18px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 2147483647,
    fontSize: '12px',
    fontWeight: '800',
    color: 'rgba(185,28,28,0.95)',
    background: 'rgba(255,255,255,0.9)',
    padding: '6px 12px',
    borderRadius: '6px',
    letterSpacing: '0.6px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.18)'
  });

  // Append content
  box.appendChild(header);
  box.appendChild(form);
  box.appendChild(buttons);
  overlay.appendChild(box);
  document.documentElement.appendChild(overlay);
  document.documentElement.appendChild(watermark);

  // Prevent scrolling and interactions with background
  const previousOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = 'hidden';

  // Allow Escape to close
  function onKey(e) {
    if (e.key === 'Escape') removeOverlay();
  }
  document.addEventListener('keydown', onKey);

  // Dismiss function
  function removeOverlay() {
    document.removeEventListener('keydown', onKey);
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    if (watermark.parentNode) watermark.parentNode.removeChild(watermark);
    document.documentElement.style.overflow = previousOverflow || '';
  }

  // Focus handling: give the close button focus for accessibility
  closeBtn.focus();

  // Informational console message for instructors (no secrets)
  try {
    console.info('EDUCATIONAL DEMO overlay installed. Inputs are disabled. This demo does NOT collect credentials.');
  } catch (e) { /* ignore */ }

  // Expose a small API on window for instructors to remove the overlay programmatically if needed
  Object.defineProperty(window, 'ED_DEMO_OVERLAY', {
    value: { remove: removeOverlay, element: overlay },
    writable: false,
    configurable: false,
    enumerable: false
  });
})();
