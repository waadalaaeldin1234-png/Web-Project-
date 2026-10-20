function login() {
  var u = document.getElementById('username');
  var p = document.getElementById('password');
  var msg = document.getElementById('msg');
  if (!u) return;
  if (u.value == '' || p.value == '') {
    msg.innerHTML = 'اكتب اسم المستخدم وكلمة السر';
    return;
  }
  localStorage.setItem('alpha_user', u.value);
  window.location.href = 'main.html';
}


function logout() {
  localStorage.removeItem('alpha_user');
  window.location.href = 'index.html';
}


function showMore() {
  var m = document.getElementById('more');
  if (m) m.innerHTML = 'تأسست في ود مدني وتعمل في بورتسودان وسواكن ✦';
}


function choose(s) {
  var out = document.getElementById('out');
  if (out) out.innerHTML = 'اخترت: ' + s + ' ✅ حنوديك لصفحة الطلب...';
  localStorage.setItem('alpha_service', s);
  setTimeout(function(){ window.location.href = 'order.html'; }, 1000);
}

function saveOrder() {
  var c = document.getElementById('client').value;
  var g = document.getElementById('goods').value;
  var t = document.getElementById('type').value;
  var q = document.getElementById('qty').value;
  var d = document.getElementById('details').value;
  if (c == '' || g == '' || q == '') { alert('املا الاسم والبضاعة والكمية'); return; }
  if (q <= 0) { alert('الكمية لازم اكبر من صفر'); return; }
  var o = { client: c, goods: g, type: t, qty: q, details: d };
  var arr = JSON.parse(localStorage.getItem('alpha_orders') || '[]');
  arr.push(o);
  localStorage.setItem('alpha_orders', JSON.stringify(arr));
  alert('✅ تم ارسال طلبك يا ' + c);
  window.location.href = 'main.html';
}

function sendContact() {
  var n = document.getElementById('cName').value;
  var ph = document.getElementById('cPhone').value;
  var m = document.getElementById('cMsg').value;
  if (n == '' || ph == '' || m == '') { alert('املا الاسم والتلفون والرسالة'); return; }
  document.getElementById('cOut').innerHTML = 'شكرا يا ' + n + ' 💙 رسالتك وصلتنا وحنتصل عليك في ' + ph;
}

function goWhatsApp() {
  window.open('https://wa.me/249110000000?text=السلام عليكم، عندي استفسار عن ALPHA', '_blank');
}


window.onload = function() {

  var w = document.getElementById('welcome');
  var u = localStorage.getItem('alpha_user');
  if (w && u) {
    w.innerHTML = 'مرحبا بيك يا ' + u + ' في شركة ألفا 👋';
  }


  var goods = document.getElementById('goods');
  var s = localStorage.getItem('alpha_service');
  if (goods && s) {
    goods.value = s;
  }

  // لو في صفحة الرئيسية اظهر الطلبات المسجلة
  var box = document.getElementById('ordersList');
  if (box) {
    var orders = JSON.parse(localStorage.getItem('alpha_orders') || '[]');
    if (orders.length == 0) box.innerHTML = 'لا توجد طلبات بعد';
    else {
      var h = '';
      for (var i = 0; i < orders.length; i++) {
        h += '<p>' + (i+1) + '. ' + orders[i].client + ' - ' + orders[i].goods + ' - ' + orders[i].type + ' - ' + orders[i].qty + ' طن</p>';
      }
      box.innerHTML = h;
    }
  }
}