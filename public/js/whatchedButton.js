console.log('this is from the Watched button')
document.querySelectorAll('.fa-clock').forEach(media => media.addEventListener('click', e => {
    const mediaElement = e.target.parentElement;
    const mediaId = mediaElement.id;
    const media = mediaElement.classList.contains('movie') ? 'movie' : 'show';
    let baseUrl = '/api/list/' + media + '/';
    const add = e.target.classList.contains('far');
    let action;
    if (add) {
        action = 'insert';
    } else {
        action = 'delete'
    }
    doPost(media, mediaId, baseUrl + action, action, e.target)
        .catch(e => console.log('error' + e))
}));

async function doPost(media, mediaId, url, action, icon) {
    const res = await post(media, mediaId, url, action);
    if (res) {
        icon.classList.toggle('far');
        icon.classList.toggle('fas')
    }
}

async function post(media, media_id, url, action) {
    const method = action === 'insert' ? 'POST' : 'DELETE';
    console.log(url);
    const data = await fetch(url, {
            method,
            body: JSON.stringify({media_id}),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    const dataJson = await data.json();
    return dataJson.message === 'Request Successful'
}
