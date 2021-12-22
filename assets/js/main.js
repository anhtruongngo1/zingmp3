
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$('.content-menu-list-info');
const panes = $$('.tab-pane');
const tabActive =$('.content-menu-list-info.active');
const playlist = $(".playlist-album");
const progress = $("#progress");



tabs.forEach((tab,i)=> {
  const pane = panes[i];
 tab.onclick = function(){
   $('.content-menu-list-info.active').classList.remove('active');
   $('.tab-pane.active').classList.remove('active');
    console.log('113')
  this.classList.add('active');
  pane.classList.add('active');
 }
})

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom : false,
  isRepeat : false,
  songs: [
    {
      name: "Bao lâu ta lại yêu một người",
      singer: "Doãn hiếu",
      path: "./assets/music/Bao-Lau-Ta-Lai-Yeu-Mot-Nguoi-Doan-Hieu-BMZ.mp3",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAfNWA8AkU6ZRz6N5oQQq9XQYwGAGrOcfbaA&usqp=CAU"
    },
    {
      name: "Phai nhòa cảm xúc",
      singer: "mr Siro",
      path: "./assets/music/Phai-Nhoa-Cam-Xuc-Mr-Siro.mp3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRjVPuoEEmpHfBmsjP_412NaEf3Idf_zbGPnEjlRp9d8iZ722x4hhCz-hF4VH_HvIIdjg&usqp=CAU"
    },
    {
      name: "Cưa là đổ",
      singer: "H2x",
      path: "./assets/music/Cua-La-Do-Phat-Ho-X2X.mp3",
      image:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcXGpT7Sm6Cn1we-vqlFhTrLMBfYSZYz_Ngw&usqp=CAU"
    },
    {
      name: "Cưới luôn được không",
      singer: "YuniBoo",
      path:
        "./assets/music/Cuoi-Luon-Duoc-Khong-YuniBoo-Goctoi-Mixer.mp3",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaG9HKKyeD5RCJIrFPg-Fvazc8hOmiJjT36w&usqp=CAU "
    },
    {
      name: "Đông phai mờ dáng ai",
      singer: "datkaa",
      path: "./assets/music/Dong-Phai-Mo-Dang-Ai-DatKaa-QT-Beatz.mp3",
      image:
        "https://hocthoisao.com/wp-content/uploads/2021/10/dong-phai-mo-dang-ai.jpg"
    },
    {
      name: "Là ai từ bỏ Là ai vô tình",
      singer: "Hương Ly",
      path: "./assets/music/La-Ai-Tu-Bo-La-Ai-Vo-Tinh-Huong-Ly-Jombie.mp3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-DKyjygSzCBQK_UtF3lk3G5BMvGfS7qJ7aw&usqp=CAU"
    },
    {
      name: "Nụ cười em là nắng",
      singer: "Green",
      path:
        "./assets/music/Nu-Cuoi-Em-La-Nang-Green (1).mp3",
      image:
        "./assets/img/nucuoiemlanang.jpeg"
    },
    {
      name: "Phai Nhòa cảm xúc",
      singer: "mr.Siro",
      path:
        "./assets/music/Phai-Nhoa-Cam-Xuc-Mr-Siro.mp3",
      image:
        "./assets/img/phainhoacamxuc.jpeg"
    },
    {
      name: "Riêng mình anh",
      singer: "Reddy",
      path:
        "./assets/music/Rieng-Minh-Anh-Reddy.mp3",
      image:
        "./assets/img/riengminhanh.jpeg"
    },
    {
      name: "Sau này nếu có yêu ai",
      singer: "Ngô kiến Huy , Tăng phúc",
      path:
        "./assets/music/Sau-Nay-Neu-Co-Yeu-Ai-Tang-Phuc-Ngo-Kien-Huy.mp3",
      image:
        "./assets/img/saunayneucoyeuai.jpeg"
    },
    {
      name: "Thay lòng",
      singer: "DIMZ , TvK ,NH4T",
      path:
        "./assets/music/Thay-Long-DIMZ-TVk-NH4T.mp3",
      image:
        "./assets/img/thaylong.jpeg"
    }
  ],
  render: function(){
    const htmls = this.songs.map((song , index) =>{
      return  `
      <div class="playlist ${
        index === this.currentIndex ? "active" : ""
      }" data-index="${index}">
                <div class="playlist-bxh">
                  <span class="playlist-bxh-top"> ${index + 1} </span>
                  <i class="fas fa-arrows-alt-h playlist-bxh-icon"></i>
                </div>
                <div class="thumb" style="background-image: url('${song.image}')">
                 
                </div>
                <div class="playlist-bxh-cart">
                  <span class="playlist-bxh-cart-song">${song.name}</span>
                  <h3 class="playlist-bxh-cart-sing">${song.singer}</h3>
                </div>
                <div class="playlist-bxh-cart-album">
                  <span class="playlist-bxh-cart-album-info">${song.name}(single)</span>
                </div>
                <div class="playlist-bxh-cart-media">
                  <span class="playlist-bxh-cart-album-info">04:28</span>
                </div>
              
  
  
  
              </div>

              
      `;
    });
    playlist.innerHTML = htmls.join(" ");
  },
  defineProperties : function () {
    Object.defineProperty(this,'currentSong',{ 
      get:function () {
        return this.songs[this.currentIndex]

      }
    })
  },
  handleEvents: function () {
    const playBtn = $(".btn-toggle-play");
    const control = $('.control');
    const _this =this
    // xử lí quay cdThumb
    const cdThumb = $('.cd-thumb')
    const cdThumbAnimate = cdThumb.animate([
      {
        transform: 'rotate(360deg)'
      }
    ],{
      duration : 5000,
      iterations : Infinity
    })
    cdThumbAnimate.pause()
    // xử lí khi play
    playBtn.onclick= function(){
      if(_this.isPlaying){     
        audio.pause();      
      }else{
        audio.play();
      }
    }
    // khi bài hát đc playing
    audio.onplay = function () {
      _this.isPlaying = true ;
      control.classList.add('playing')
      cdThumbAnimate.play()
    }
    // khi bài hát pause
    audio.onpause = function () {
      _this.isPlaying =false ;
      control.classList.remove('playing')
      cdThumbAnimate.pause()
    }
    // khi tiến độ  bài hát thay đổi
    audio.ontimeupdate =function(){
      
      if(audio.duration){
        const progresspercent = Math.floor(audio.currentTime / audio.duration*100)
        progress.value = progresspercent
      }

    }
    // khi tua bai hat
    progress.onchange = function(e){
      const seektime = audio.duration/100 * e.target.value 
        audio.currentTime = seektime  ;

    }
    // khi next bài hát 
    const nextBtn = $('.btn-next')
    nextBtn.onclick = function(){
      if(_this.isRandom){
           _this.playRandomSong();
      }else{
      _this.nextSong()
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong()
    }
    // khi prev bài hát
    const prevBtn = $('.btn-prev')
    prevBtn.onclick = function () {
      if(_this.isRandom){
        _this.playRandomSong();
   }else{
   _this.prevSong();
   }
   audio.play();
   _this.render();
   _this.scrollToActiveSong()

    }
    // khi random bài hát
    const randomBtn = $('.btn-random')
    randomBtn.onclick = function () {
      _this.isRandom =!_this.isRandom

      randomBtn.classList.toggle('active',_this.isRandom)

    }
    // xử lí khi bài hát ended
    audio.onended = function () {
      if(_this.isRepeat){
      audio.play();
      }else{
        nextBtn.click();
      }
 
    }
    // xử lý lặp lại bài hát
    const repeatBtn = $('.btn-repeat');
    repeatBtn.onclick = function () {
     _this.isRepeat = !_this.isRepeat
     repeatBtn.classList.toggle('active',_this.isRepeat)
    }
    // lắng nghe click vào playlist
    
    playlist.onclick =function(e){
      const songNode = e.target.closest('.playlist:not(.active)')
      const clickPlaylist = $('.play-music')
      if(songNode || e.target.closest('.option')){
          // xử lí khi click vào song
          if(songNode){
            _this.currentIndex = Number(songNode.dataset.index)
            _this.loadCurrenSong()
            _this.render()
            audio.play()
            clickPlaylist.classList.add('active');



          }
     // xử lí khi click vào song option
     if(e.target.closest('.option')){
       
     }
      }
    }
   
  },
   loadCurrenSong:function () {
     const heading = $('.music-info-h4');
     const author = $('.music-info-span');
     const cdThumb = $('.cd-thumb');
     const audio = $('#audio');
    
     heading.textContent = this.currentSong.name;
     author.textContent = this.currentSong.singer;
     cdThumb.style.backgroundImage = `url('${this.currentSong.image}')` ;
     audio.src = this.currentSong.path
     console.log(heading , author , cdThumb , audio)

   },
   nextSong: function () {
     this.currentIndex++
     if(this.currentIndex >= this.songs.length){
       this.currentIndex=0 ;
     }
     this.loadCurrenSong()

   },
   prevSong: function () {
     this.currentIndex--
     if(this.currentIndex<0){
       this.currentIndex=this.songs.length-1 ;
     }
     this.loadCurrenSong()
   },
   playRandomSong : function () {
      let newIndex
     do {
       newIndex= Math.floor(Math.random()*this.songs.length)
     } while(newIndex == this.currentIndex)
     this.currentIndex = newIndex ;
     this.loadCurrenSong();
   },
   scrollToActiveSong: function () {
     setTimeout( () => {
      $('.playlist.active').scrollIntoView(
        {
          behavior: 'smooth' ,
          block:'center',
          inline: 'nearest',
        }
      )
     })

   },










  start:function() {
       /* Định nghĩa các thuộc tính cho object */
       this.defineProperties()
       //lắng nghe và xử lý các xự kiện
      this.handleEvents()
      // tải thông tin bài hát đầu tiên khi vào ứng dụng
     this.loadCurrenSong()

     //render danh sách
        this.render() ;
  }
}
app.start()








