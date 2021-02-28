const sounds = ['nani','bruh','violin','money','tiger','touch','dont','cj'];

sounds.forEach( sound => {
    const btn = document.createElement('button');

    btn.classList.add('btn');
    btn.innerText = sound;

    btn.addEventListener('click', () => {
        stopAudio();
        document.getElementById(sound).play();
    });

    document.getElementById('buttons').appendChild(btn);
});

function stopAudio() {
    sounds.forEach( sound => {
        const currentAudio = document.getElementById(sound);

        currentAudio.pause();
        currentAudio.currentTime = 0;
    });
}