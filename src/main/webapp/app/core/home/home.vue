  <template>

      <div>
            <div class="quizmenu-container" v-if="hasAnyAuthority('ROLE_USER')" style="margin:auto;text-align:center;">
              <div style="padding:0;height:30vh; display: flex;justify-content: center;align-items: center;hight">
                <img src="../../../content/images/quizpage.png" style="transform:scale(0.5)">
              </div>
              <div class="bookshelf">
                <div class="page_shelf">
                  <div class="row-1">
                    <div class="loc">
                      <router-link class="router-link" :to="{ name: 'QuizQuestions', params: {quizId: quiz.id}}" v-for="(quiz,$index) in displayedQuizzes()":key=$index>
                        <button v-if="$index<3" class="sample btn-quiz">
                          Quiz<p v-html="$index+1 + (page-1)*6"></p>
                        </button>
                      </router-link>
                    </div>
                  </div>
                  <div class="row-2">
                    <div class="loc">
                      <router-link class="router-link" :to="{ name: 'QuizQuestions', params: {quizId: quiz.id}}" v-for="(quiz,$index) in displayedQuizzes()":key=$index>
                        <button v-if="$index>=3" class="sample btn-quiz">
                          Quiz<p v-html="$index+1 + (page-1)*6"></p>
                        </button>
                      </router-link>
                    </div>
                  </div>

                  <div class="page-nav" style="margin-top:10%">
                  <nav aria-label="Page navigation">
                    <ul class="pagination">
                      <li class="page-item">
                        <button type="btn btn-outline-secondary" style= "margin-right:2px"class="page-link" v-if="page != 1" @click="page--"> < </button>
                      </li>
                      <li class="page-item">
                        <button type="btn btn-outline-secondary" style= "margin-right:2px"class="page-link" v-for="pageNumber in pages.slice(page-1, page+5)":key="pageNumber" @click="page = pageNumber"> {{pageNumber}}</button>
                      </li>
                      <li class="page-item">
                        <button type="btn btn-outline-secondary" style= "margin-right:2px" @click="page++" v-if="page < pages.length" class="page-link"> > </button>
                      </li>
                    </ul>
                  </nav>	
                  </div> 
                  
                </div>
              </div>
            </div>

          <div class="v-header container" v-if="!authenticated" >
              <div class="header-content text-md-center" style="margin:auto">
                  <h1> Welcome to EMOSEWA QUIZ </h1>
                  <p>Develop your potential, Expand your horizons</p>
                  <div v-if="!authenticated">
                      <a class="alert-link" v-on:click="openLogin()">Get Started!</a>
                  </div>
              </div>
                  
              
              <div class="fullscreen-video-wrap">
                  <video playsinline autoplay muted src="./bg/videoplayback.mp4" loop="true"></video>
              </div>
              <div class="header-overlay"></div>
          </div>
          
      </div>
  </template>

  <script lang="ts" src="./home.component.ts">
  </script>

  <style scoped>
.page-link{
  position: relative;
  background: peru;
  border: none;
  padding: 15px 24px;
  outline: none;
  box-shadow: -6px 6px 0 hsl(16, 100%, 30%);
}
  .page-link::before {
  content: "";
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  top: 0;
  left: -6px;
  border: 6px solid transparent;
  border-right: 6px solid hsl(16, 100%, 30%);
  border-left-width: 0px;
}

.page-link::after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  bottom: -6px;
  right: 0;
  border: 6px solid transparent;
  border-top: 6px solid hsl(16, 100%, 30%);
  border-bottom-width: 0px;
}

.page-link:active {
  background: hsl(16, 100%, 40%);
  top: 3px;
  left: -3px;
  box-shadow: -3px 3px 0 hsl(16, 100%, 30%);
}
.page-link:active::before {
  border: 3px solid transparent;
  border-right: 3px solid hsl(16, 100%, 30%);
  border-left-width: 0px;
  left: -3px;
}

.page-link:active::after {
  border: 3px solid transparent;
  border-top: 3px solid hsl(16, 100%, 30%);
  border-bottom-width: 0px;
  bottom: -3px;
}

  .fullscreen-video-wrap{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100vh;
    overflow:hidden;
  }

  .fullscreen-video-wrap video{
    min-height:100%;
    min-width:100%;
  }

  .header-overlay{
    height:100vh;
    position: absolute;
    top:0;
    left:0;
    width:100vw;
    z-index:1;
    background:#225470;
    opacity:0.85;
  }
  .v-header{
    height:100vh;
    display:flex;
    align-items:center;
    color:#fff;
  }

  .container{
    max-width:960px;
    margin:auto;
    text-align:center;
  }
  .alert-link{
    position: relative;
    padding:  20px 40px;
    font-size: 1.4rem;
    background-color: #00b3b4;
    background-size: 46px 26px;  
    color: white;
    transition: all ease 0.3s;
  }

  .alert-link::after{
    position: absolute;
    top: 50%;
    right: 0.6em;
    transform: translateY(-50%);
    content: "»";
    font-size: 1.2em;
    transition: all ease 0.3s;
    opacity: 0;
  }

  .alert-link:hover{
    padding: 20px 60px 20px 20px;
  }

  .alert-link:hover::after{
    right: 1.2em;
    opacity: 1;
  }


  .header-content{
    z-index:2;
  }

  .header-content h1{
    font-size:50px;
    margin-bottom:0;
    font-weight:bolder;
    
  }

  .header-content p{
    font-size:1.5rem;
    display:block;
    padding-bottom:2rem;
    margin-top: 2%;
    margin-bottom: 5%;
  }

  .quizmenu-container{
      border-radius: 5px;
      box-shadow: 0 0 10px 2px;
      margin: auto;
      padding: 0;
      width: 100%;
      height: 100%;
      background-image: url("../../../content/images/bookshelf_bg.jpg");
  }


  button.page-link{
      font-size: 20px;
      color: #ffffff;
      font-weight: 500;
      display: inline-block;
  }

  .page-nav{
      float: right;
  }

  .bookshelf-row{
    display:none;
  }

  .bookshelf{
    transition:all 1s;
  }

  .bookshelf{
      display: flex;
      margin-top: 5vh;
      justify-content: center;
      width:100%;
  }

  .bookshelf .page_shelf{
    width:426px;
    height:440px;
  }

  .bookshelf .page_shelf .row-1{
    position:relative;
    width:100%;
    height:148px;
  }

  .bookshelf .page_shelf .row-2{
      position:relative;
      margin-top:20px;
      width:100%;
      height:164px;
  }

  .bookshelf .page_shelf .row-1:after {
    background:url("../../../content/images/shelf.png");
    background-size:100%;
    background-repeat: no-repeat;
    background-position:bottom left;
    width:100%;
    height:210px;
    display:block;
    content:"";
  }

  .bookshelf .page_shelf .row-2:after {
    background:url("../../../content/images/shelf.png");
    background-size:100%;
    background-repeat: no-repeat;
    background-position:bottom left;
    width:100%;
    height:216px;
    display:block;
    content:"";
  }

  .bookshelf .page_shelf .loc{
    position:absolute;
    bottom:0;
    width:100%;
  }

  .bookshelf .page_shelf .loc .router-link >button{
    width:33%;
    height:100%;
    background-size: contain;
    float:left;
    background-size: 90px 130px;
    width:90px;
    height:130px;
    background-image:url("../../../content/images/quiz_book.png");
    margin:0 4%;
    text-align:center;
  }

  .bookshelf .sample,
  .bookshelf-row .sample{
    margin:auto;
    position: relative;
    z-index:1;
    box-shadow:2px 2px 5px rgba(0,0,0,0.6);
    transition:transform 0.1s;
    transform:translate(0, 0);
    
  }

  .sample:hover{
    z-index:2;
    cursor: pointer;;
    transform: scale3d(1.1, 1.1, 1) translate3d(0, -5px, 0);
  }


  </style>
