const list_container = document.getElementById("list-container")
const audio = document.getElementById("audio")
const title_card = document.getElementById("title-card")

let is_playing = false;
let index = 1;
const canciones = [

{
	id: 1,
	title: "A",
	audio: "audio/clap.wav",
	artist: "CLAP",
},
{
	id: 2,
	title: "S",
	audio: "audio/hihat.wav",
	artist: "HIHAT",
},
{
	id: 3,
	title: "D",
	audio: "audio/kick.wav",
	artist: "KICK",
},
{
	id: 4,
	title: "F",
	audio: "audio/openhat.wav",
	artist: "OPENHAT",
},
{
	id: 5,
	title: "G",
	audio: "audio/boom.wav",
	artist: "BOOM",
},
{
	id: 6,
	title: "H",
	audio: "audio/ride.wav",
	artist: "RIDE",
},
{
	id: 7,
	title: "J",
	audio: "audio/snare.wav",
	artist: "SNARE",
},
{
	id: 8,
	title: "K",
	audio: "audio/tom.wav",
	artist: "TOM",
},
{
	id: 9,
	title: "L",
	audio: "audio/tink.wav",
	artist: "TINK",
},

];
canciones.forEach((e)  => {
	list_container.insertAdjacentHTML(
	"beforeend" ,
	`
	<div class="list-item" id ="${e.id}">

	<div class="song-data">
	<div>${e.title}</div>
	<div>${e.artist}</div>
	</div>
	</div> `
	 );
});

const play_card = (obj_audio) =>{
	cover_card_img.src = obj_audio.cover;
	title_card.innerHTML = obj_audio.title;
	is_playing = true;
	play_btn.innerHTML ="pausa";
	index = obj_audio.id;
};
const play_audio = (id) => {
	const res = canciones.find((e) => e.id == id);
	if (res) {
		audio.src = res.audio;
		audio.play();
		play_card(res);
		is_playing = true;
		play_btn.innerHTML="pausa";

	}
};
const animation_active = ( ) => {
	if (is_playing) {
		cover_card_img.style.animationPlayState = "running";
	}
	else {
		cover_card_img.style.animationPlayState = "paused";
	}
};


list_container.addEventListener("click", (e) =>{
	if (e.target.matches(".list-item")) {
		play_audio(e.target.id);
	}else if (e.target.matches(".song-data")) {
		play_audio(e.target.parentNode.id);
	}else if (e.target.matches(".song-data div")) {
		play_audio(e.target.parentNode.parentNode.id);
	}
});

play_btn.addEventListener("click", () =>{
	if (is_playing) {
		audio.pause();
		is_playing = false;
		play_btn.innerHTML = "play";
	} else {
		is_playing = true;
		play_btn.innerHTML ="pausa";
		audio.play();
	}
	animation_active();
});


window.addEventListener("load", ()=>{
	const progress =document.getElementById("progress-bar");
	progress.max=audio.duration;
	progress.min=0;
	window.setInterval(()=>{
		progress.value=audio.currentTime;
	},1000);

	progress.addEventListener("change",()=>{
		audio.currentTime=progress.value;
	});
});

next_btn.addEventListener("click",()=>{
	if (index<canciones.length) {
		index++;
		play_audio(index);
	}
});
prev_btn.addEventListener("click",()=>{
	if (index>0) {
		index--;
		play_audio(index);
	}
});
volume_up_btn.addEventListener("click",() => {
	audio.volume=audio.volume+0.1;
});

volume_down_btn.addEventListener("click",() => { 
    audio.volume=audio.volume-0.1;
});




