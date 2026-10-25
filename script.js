const OWNER_PASSWORD = "noor@"; // শুধু তুমি জানো

let dealers = JSON.parse(localStorage.getItem('dealers')||'[]');
let deals = [
  {title:"1000 Bosta Cement - CTG Port", budget:"₹5,00,000", loc:"Chittagong", bids:12},
  {title:"Garments Stock Lot - Dhaka", budget:"₹3,20,000", loc:"Dhaka", bids:7},
  {title:"Dubai Import Partner", budget:"₹12,00,000", loc:"Dubai", bids:21}
];

function render(){
  document.getElementById('dealList').innerHTML = deals.map((d,i)=>`
    <div class="deal-card">
      <div><b>${d.title}</b><p>${d.loc} • ${d.budget} • ${d.bids} Bids</p></div>
      <button onclick="bid(${i})">Bid</button>
    </div>
  `).join('');
  document.getElementById('totalCount').innerText = dealers.length;
}
function openModal(id){ closeModal(); document.getElementById(id).classList.remove('hidden'); }
function closeModal(){ document.querySelectorAll('.modal').forEach(m=>m.classList.add('hidden')); }

function joinDealer(){
  let name = document.getElementById('jName').value;
  let biz = document.getElementById('jBiz').value;
  let phone = document.getElementById('jPhone').value;
  if(!name||!biz) return alert('সব তথ্য দাও');
  dealers.push({name,biz,phone,date:new Date().toLocaleString()});
  localStorage.setItem('dealers',JSON.stringify(dealers));
  closeModal(); render(); alert('Join Success! Owner Approval Pending');
}

function unlockOwner(){
  let p = document.getElementById('ownerPass').value;
  if(p === OWNER_PASSWORD){
    closeModal();
    document.getElementById('ownerPanel').classList.remove('hidden');
    renderAdmin();
  } else {
    document.getElementById('err').classList.remove('hidden');
  }
}

function renderAdmin(){
  let list = document.getElementById('adminList');
  if(dealers.length===0){ list.innerHTML='<p style="color:#666">এখনো কেউ Join করেনি</p>'; return; }
  list.innerHTML = dealers.map((d,i)=>`
    <div class="admin-card">
      <div><b>${d.name}</b> - ${d.biz} <span style="color:#888">(${d.phone})</span><br><small style="color:#555">${d.date}</small></div>
      <div><button onclick="deleteDealer(${i})" style="background:#ff4d4d20;color:#ff4d4d;padding:6px 12px;border-radius:20px;border:none;cursor:pointer">Delete</button></div>
    </div>
  `).join('');
}

function deleteDealer(i){ dealers.splice(i,1); localStorage.setItem('dealers',JSON.stringify(dealers)); renderAdmin(); render(); }
function bid(i){ deals[i].bids++; render(); alert('Bid Successful!'); }

render();
