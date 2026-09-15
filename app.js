document.querySelectorAll('[data-wa]').forEach(link => {
  link.href = 'https://wa.me/5547992108071?text=' + encodeURIComponent('Olá! ' + link.dataset.wa + ' na Clínica Géssyca Pereira.');
});
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectCare(tab, focus = false) {
  tabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  });
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectCare(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (['ArrowDown', 'ArrowRight'].includes(event.key)) next = (index + 1) % tabs.length;
    if (['ArrowUp', 'ArrowLeft'].includes(event.key)) next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectCare(tabs[next], true); }
  });
});
const tabList = document.querySelector('[role="tablist"]');
const smallScreen = window.matchMedia('(max-width: 760px)');
function orientTabs() { tabList.setAttribute('aria-orientation', smallScreen.matches ? 'horizontal' : 'vertical'); }
orientTabs();
smallScreen.addEventListener('change', orientTabs);
