let URL_PROPSTORE = 'https://live.propstore.com/';
if (window.location.href.includes('localhost')) URL_PROPSTORE = 'http://propstore.loc/';
const params = new URLSearchParams(window.location.search);
let redirect;
if (params.get('action')) {
    const loader = document.querySelector('.loader-block');
    if (loader) loader.style.display = 'block';
} else if (params.get('rid')) {
    const rid = params.get('rid');
    params.delete('rid');
    redirect = URL_PROPSTORE + '/auctionRegistration.action?auctionId=' + rid + '&' + params.toString();
} else if (params.get('ru')) {
    const ru = decodeURIComponent(params.get('ru'));
    params.delete('ru');
    const d = params.get('d');
    params.delete('d');
    let domain = '';
    if (d && d === '1') domain = URL_PROPSTORE;
    const paramsSymbol = ru.includes('?') ? '&' : '?';
    redirect = domain + ru + paramsSymbol + params.toString();
}
if (redirect) {
    window.location.href = redirect.replace(/\/+/g,'/').replace(/^https:\//,'https://');
}