// gold.js - النسخة النهائية مع رسالة تنبيه للمستخدم
const API_KEY = "goldapi-9a56pxsmn63p76w-io"; 

// 1. دالة جلب البيانات
async function fetchGoldPrices() {
    try {
        const response = await fetch("https://www.goldapi.io/api/XAU/EGP", {
            headers: { "x-access-token": API_KEY }
        });
        const data = await response.json();
        if (data && data.price) {
            updateUI(data.price);
        } else {
            showBackup();
        }
    } catch (error) {
        showBackup();
    }
}

// 2. دالة تحديث الواجهة
function updateUI(rawPrice) {
    const adjustmentFactor = 1.025; 
    const adjustedPrice = rawPrice * adjustmentFactor;

    const p24_base = adjustedPrice / 31.1035;
    const p21_base = p24_base * 0.875;

    const p21_sell = Math.round(p21_base);
    const p21_buy = p21_sell - 50; 

    setText('gold21_sell', p21_sell);
    setText('gold21_buy', p21_buy);
    setText('gold24_sell', Math.round(p24_base));
    setText('gold24_buy', Math.round(p24_base - 56));
    setText('gold18_sell', Math.round(p24_base * 0.75));
    setText('gold18_buy', Math.round(p24_base * 0.75 - 42));
    setText('gold14_sell', Math.round(p24_base * 0.583));
    setText('gold14_buy', Math.round(p24_base * 0.583 - 32));
    
    setText('priceGap', (p21_sell - p21_buy).toFixed(2));
    setText('usdSagh', "53.96"); 
    setText('goldCoinPrice', (p21_sell * 8).toLocaleString() + " جنيه");
}

// 3. دالة إظهار رسالة التنبيه (الحل الذي طلبته)
function showPriceNotice() {
    // إنشاء عنصر الرسالة برمجياً
    const notice = document.createElement('div');
    notice.innerHTML = `
        <div id="price-alert" style="
            position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
            background: rgba(255, 193, 7, 0.95); color: #000; padding: 12px 20px;
            border-radius: 10px; z-index: 10000; text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3); font-weight: bold;
            width: 80%; max-width: 400px; cursor: pointer; border: 2px solid #b8860b;
        ">
            ⚠️ تنبيه: الأسعار المعروضة استرشادية وقد تختلف عن سعر السوق الفعلي بمقدار ±60 جنيه.
        </div>
    `;
    document.body.appendChild(notice);

    // تختفي الرسالة بعد 6 ثوانٍ أو عند الضغط عليها
    setTimeout(() => {
        const el = document.getElementById('price-alert');
        if(el) el.style.display = 'none';
    }, 6000);

    notice.onclick = () => notice.style.display = 'none';
}

// 4. الدوال المساعدة
function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.innerText = val;
}

function updateDateTime() {
    const now = new Date();
    setText('headerDate', now.toLocaleDateString('ar-EG'));
    setText('headerTime', now.toLocaleTimeString('ar-EG'));
}

function showBackup() {
    const backupPrice = 7886 * 31.1035; 
    updateUI(backupPrice / 1.025);
}

// تشغيل كل شيء عند التحميل
window.onload = function() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    fetchGoldPrices();
    showPriceNotice(); // تشغيل رسالة التنبيه
};

function refreshData() {
    const btn = document.getElementById('refreshBtn');
    if (btn) btn.classList.add('fa-spin');
    fetchGoldPrices();
    setTimeout(() => { if (btn) btn.classList.remove('fa-spin'); }, 1000);
}