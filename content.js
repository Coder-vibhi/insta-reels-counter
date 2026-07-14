let isUiInjected = false;
let counterDiv = null;
let mainInterval = null;
let timerInterval = null;

function removeUi() {
  if (counterDiv) {
    counterDiv.remove();
    counterDiv = null;
  }
  stopCounting();
  isUiInjected = false;
}

function stopCounting() {
  if (mainInterval) { clearInterval(mainInterval); mainInterval = null; }
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  
  const startBtn = document.getElementById('start-count-btn');
  const stopBtn = document.getElementById('stop-count-btn');
  
  if (startBtn) {
    startBtn.innerText = "Start";
    startBtn.disabled = false;
    startBtn.style.opacity = '1';
    startBtn.style.cursor = 'pointer';
  }
  
  if (stopBtn) {
    stopBtn.style.display = 'none';
  }
}

function injectUi() {
  if (isUiInjected) return;
  isUiInjected = true;
  
  // Ultra-premium, breathtaking dark-mode UI
  counterDiv = document.createElement('div');
  counterDiv.style.position = 'fixed';
  counterDiv.style.bottom = '30px'; 
  counterDiv.style.right = '30px';
  counterDiv.style.zIndex = '999999';
  counterDiv.style.backgroundColor = 'rgba(9, 9, 11, 0.7)'; 
  counterDiv.style.backdropFilter = 'blur(24px)';
  counterDiv.style.webkitBackdropFilter = 'blur(24px)';
  counterDiv.style.color = '#ededed';
  counterDiv.style.padding = '24px';
  counterDiv.style.borderRadius = '24px';
  counterDiv.style.border = '1px solid rgba(255, 255, 255, 0.08)'; 
  counterDiv.style.fontFamily = '"Inter", system-ui, -apple-system, sans-serif';
  counterDiv.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 40px rgba(99, 102, 241, 0.15)';
  counterDiv.style.width = '260px';
  counterDiv.style.boxSizing = 'border-box';
  counterDiv.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  
  // Inject font if missing
  if (!document.getElementById('inter-font')) {
    const link = document.createElement('link');
    link.id = 'inter-font';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap';
    document.head.appendChild(link);
  }

  counterDiv.innerHTML = `
    <div style="position: absolute; top: -30px; left: 50%; transform: translateX(-50%); width: 120px; height: 60px; background: radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(99,102,241,0) 70%); filter: blur(20px); z-index: -1; border-radius: 50%; pointer-events: none;"></div>
    
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; position: relative; z-index: 1;">
      <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #fff; letter-spacing: -0.3px; background: linear-gradient(90deg, #fff 0%, #a1a1aa 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">ReelStats</h3>
      <button id="close-ui-btn" style="background: transparent; border: none; color: #71717a; cursor: pointer; font-size: 20px; line-height: 1; padding: 0; transition: color 0.2s ease;">&times;</button>
    </div>
    
    <div style="display: flex; justify-content: space-between; margin-bottom: 24px; position: relative; z-index: 1;">
      <div style="display: flex; flex-direction: column;">
        <span style="font-size: 11px; color: #a1a1aa; margin-bottom: 6px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Total</span>
        <span id="reel-count-val" style="font-size: 36px; font-weight: 300; color: #fff; line-height: 1; letter-spacing: -1.5px;">0</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: flex-end;">
        <span style="font-size: 11px; color: #a1a1aa; margin-bottom: 6px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Time</span>
        <span id="reel-timer-val" style="font-size: 16px; font-weight: 400; color: #e4e4e7; line-height: 1; margin-top: auto; margin-bottom: 6px; font-variant-numeric: tabular-nums;">00:00</span>
      </div>
    </div>

    <div style="display: flex; gap: 12px; position: relative; z-index: 1;">
      <button id="start-count-btn" style="background: #fff; color: #000; border: none; padding: 12px; cursor: pointer; border-radius: 12px; font-size: 13px; font-weight: 600; width: 100%; transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.2s;">Start</button>
      <button id="stop-count-btn" style="background: rgba(255,255,255,0.08); color: #ededed; border: 1px solid rgba(255,255,255,0.1); padding: 12px; cursor: pointer; border-radius: 12px; font-size: 13px; font-weight: 500; width: 100%; transition: background 0.2s ease; display: none;">Stop</button>
    </div>
  `;
  document.body.appendChild(counterDiv);

  const startBtn = document.getElementById('start-count-btn');
  const stopBtn = document.getElementById('stop-count-btn');
  const closeBtn = document.getElementById('close-ui-btn');

  closeBtn.addEventListener('click', removeUi);
  closeBtn.addEventListener('mouseover', () => closeBtn.style.color = '#fff');
  closeBtn.addEventListener('mouseout', () => closeBtn.style.color = '#71717a');

  stopBtn.addEventListener('click', stopCounting);
  stopBtn.addEventListener('mouseover', () => stopBtn.style.background = 'rgba(255,255,255,0.15)');
  stopBtn.addEventListener('mouseout', () => stopBtn.style.background = 'rgba(255,255,255,0.08)');
  
  startBtn.addEventListener('mouseover', () => {
    if (!startBtn.disabled) {
      startBtn.style.transform = 'translateY(-2px)';
      startBtn.style.boxShadow = '0 6px 20px rgba(255,255,255,0.2)';
    }
  });
  startBtn.addEventListener('mouseout', () => {
    if (!startBtn.disabled) {
      startBtn.style.transform = 'translateY(0)';
      startBtn.style.boxShadow = 'none';
    }
  });

  function startScrollingAndCounting() {
    const uniqueReels = new Set();
    let previousHeight = 0;
    let noChangeCount = 0; 
    
    let startTime = Date.now();
    timerInterval = setInterval(() => {
      let elapsedTime = Date.now() - startTime;
      let totalSeconds = Math.floor(elapsedTime / 1000);
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      
      let displayMin = minutes < 10 ? '0' + minutes : minutes;
      let displaySec = seconds < 10 ? '0' + seconds : seconds;
      
      const timerVal = document.getElementById('reel-timer-val');
      if(timerVal) timerVal.innerText = `${displayMin}:${displaySec}`;
    }, 1000);

    mainInterval = setInterval(() => {
      const currentElements = document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]');
      
      currentElements.forEach(element => {
        const cleanUrl = element.href.split('?')[0];
        uniqueReels.add(cleanUrl);
      });
      
      const countVal = document.getElementById('reel-count-val');
      if(countVal) countVal.innerText = uniqueReels.size;
      
      window.scrollTo(0, document.body.scrollHeight);
      
      const scrollContainer = document.querySelector('div[style*="overflow-y: auto"], main');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
      
      let currentHeight = document.body.scrollHeight;
      
      if (currentHeight === previousHeight) {
        noChangeCount++;
        
        if (noChangeCount >= 25) {
          const loadingSpinner = document.querySelector('svg[aria-label="Loading..."], circle');
          
          if (!loadingSpinner) {
            stopCounting();
            if(startBtn) {
              startBtn.innerText = "Done";
              startBtn.disabled = true;
              startBtn.style.opacity = '0.5';
            }
            alert(`All done!\n\nWe counted ${uniqueReels.size} reels for you.`);
          } else {
            noChangeCount = 15; 
          }
        }
      } else {
        noChangeCount = 0;
      }
      
      previousHeight = currentHeight;
    }, 400); 
  }

  if(startBtn) {
    startBtn.addEventListener('click', () => {
      startBtn.innerText = "Counting...";
      startBtn.disabled = true;
      startBtn.style.opacity = '0.7';
      startBtn.style.cursor = 'not-allowed';
      
      if(stopBtn) {
        stopBtn.style.display = 'block';
      }
      
      startScrollingAndCounting();
    });
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggle_ui') {
    if (isUiInjected) {
      removeUi();
    } else {
      if (window.location.href.includes('/saved/')) {
        injectUi();
      } else {
        alert('Please navigate to your Instagram "Saved" page to use the counter.');
      }
    }
  }
});
