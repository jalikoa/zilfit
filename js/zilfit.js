document.addEventListener('DOMContentLoaded', function(){
  const start = document.getElementById('start-scan');
  const points = Array.from(document.querySelectorAll('.zf-data-points .point'));
  const stages = Array.from(document.querySelectorAll('.tracker-list .stage'));

  function runScan(){
    // reveal data points sequentially
    points.forEach((p, i)=>{
      setTimeout(()=> p.classList.add('show'), i*700);
    });

    // after points animate, start production tracker
    setTimeout(()=> startTracker(), points.length*700 + 600);
  }

  function startTracker(){
    stages.forEach(s=> s.classList.remove('active'));
    let idx = 0;
    const tick = setInterval(()=>{
      if(idx>0) stages[idx-1].classList.add('done');
      if(idx < stages.length){
        stages[idx].classList.add('active');
        idx++;
      } else {
        clearInterval(tick);
      }
    }, 1500);
  }

  if(start){
    start.addEventListener('click', ()=>{
      // reset
      points.forEach(p=> p.classList.remove('show'));
      stages.forEach(s=> s.classList.remove('active','done'));
      runScan();
    });
  }

  // gentle smooth scroll for anchor links
  document.documentElement.style.scrollBehavior = 'smooth';
});
