const apiUrl = 'https://mp3quran.net/api/v3';
const reciters = 'reciters';
const language = 'ar';
/*<option value="">اختر الرواية</option>*/
async function getReciters (){
    const chooseReciters = document.querySelector('#chooseReciters');
    const res = await fetch(`${apiUrl}/reciters?language=${language}`);
    const data = await res.json();
    chooseReciters.innerHTML = `<option value="">اختر القارئ</option>`;
    data.reciters.forEach(reciter => 
        chooseReciters.innerHTML += `<option value="${reciter.id}">${reciter.name}</option>`);
        chooseReciters.addEventListener('change', (e) => getMoshaf(e.target.value))
};
getReciters();
async function getMoshaf(reciter){
    const chooseMoshaf = document.querySelector('#chooseMoshaf');

    const res = await fetch(`${apiUrl}/reciters?language=${language}&reciter=${reciter}`);
    const data = await res.json();
    
    const moshafs = data.reciters[0].moshaf;
    chooseMoshaf.innerHTML = `<option value="" data-server="" data-surahList="">اختر الرواية</option>`;
    moshafs.forEach(moshaf => chooseMoshaf.innerHTML += `<option value="${moshaf.id}" data-server="${moshaf.server}" data-surahList="${moshaf.surah_list}">${moshaf.name}</option>`);
    chooseMoshaf.addEventListener('change', (e) => {
        const selectedMoshaf= chooseMoshaf.options[chooseMoshaf.selectedIndex]
        const surahServer = selectedMoshaf.dataset.server;
        const surahList =   selectedMoshaf.dataset.surahlist;
        getSurah(surahServer, surahList)
    })
};
async function getSurah(surahServer, surahList){
    const chooseSurah = document.querySelector('#chooseSurah');
    const res = await fetch('https://mp3quran.net/api/v3/suwar');
    const data = await res.json();
    const surahNames = data.suwar;
    surahList = surahList.split(',');
    chooseSurah.innerHTML = `<option value="">اختر السورة</option>`;
    surahList.forEach(surah => {
        const padSurah = surah.padStart(3, '0'); 
        surahNames.forEach(surahName => {
            if(surahName.id == surah){
             chooseSurah.innerHTML += `<option value="${surahServer}${padSurah}.mp3">${surahName.name}</option>`;
            }
        })
    });
    chooseSurah.addEventListener('change', (e) => {
        const selectedSurah= chooseSurah.options[chooseSurah.selectedIndex]
        playSurah(selectedSurah.value);
    })
};
function playSurah (surahMp3){
        const audioPlayer = document.querySelector('#audioPlayer');
        audioPlayer.src = surahMp3;
        audioPlayer.play();
}

