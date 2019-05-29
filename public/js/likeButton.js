console.log('this is from the like button')
document.querySelectorAll('.fa-heart').forEach(media => media.addEventListener('click', e => {
    const mediaElement = e.target.parentElement;
    console.log(mediaElement);
    const mediaId = mediaElement.id;
    const media = mediaElement.classList.contains('movie') ? 'movie' : 'show';
    let baseUrl = '/api/' + media + '/favorites/';
    const add = e.target.classList.contains('far');
    let action;
    if (add) {
        action = 'add';
    } else {
        action = 'delete'
    }
    doPost(media, mediaId, baseUrl + action, action, e.target)
        .catch(e => console.log('error', e))
}));

async function doPost(media, mediaId, url, action, heart) {
    const res = await post(media, mediaId, url, action);
    if (res) {
        heart.classList.toggle('far');
        heart.classList.toggle('fas')
    }
}

async function post(media, media_id, url, action) {
    console.log('media id', media_id);
    console.log(media_id);
    const method = action === 'add' ? 'POST' : 'DELETE';
    console.log(method);
    const data = await fetch(url, {
            method,
            body: JSON.stringify({media_id}),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    const dataJson = await data.json();
    console.log(dataJson)
    return dataJson.message === 'Request Successful'
}
