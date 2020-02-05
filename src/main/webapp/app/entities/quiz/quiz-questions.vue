
<template>

	<div class="container">

      <div v-if="quiz.questions.length == 0">
        <div class="bookshelf_wrapper">
          <ul class="books_list" style="margin:auto">
            <li class="book_item first"></li>
            <li class="book_item second"></li>
            <li class="book_item third"></li>
            <li class="book_item fourth"></li>
            <li class="book_item fifth"></li>
            <li class="book_item sixth"></li>
          </ul>
          <div class="shelf" style="margin:auto"></div>
        </div>
      </div>

      <div v-if="quiz.questions.length != 0" id="game" class="justify-center flex-column">

        <div id="hud">
          <div id="hud-item">
            <p id="progressText" class="hud-prefix" v-html="'Question' +  (indexQuestion+1) + '/' + (quiz.questions.length)">
              Question
            </p>
            <div id="progressBar">
              <div id="progressBarFull" :style="'width:' + (100 * (indexQuestion+1) / quiz.questions.length) + '%;'"></div>
            </div>
          </div>
          <div id="hud-item">
            <p class="hud-prefix">
              Score
            </p>
            <h1 class="hud-main-text" id="score" v-html="score"></h1> 
          </div>
        </div>


        <div style="width:100%;display:inline-block;margin-bottom:2%">
          <h2 id="question" style="display:inline-block;" v-html="quiz.questions[indexQuestion].description"></h2>
          <img v-bind:src="quiz.questions[indexQuestion].pictureURL" style="width: 30%;margin-left:20%;"></img>
        </div>

        <div class="choice-container" v-for="(option, $index) in quiz.questions[indexQuestion].choices":key="$index">
            <p class="choice-prefix" v-if="$index == 0">A<span><img v-bind:src="quiz.questions[indexQuestion].choices[0].pictureURL" alt="image" height="100" /></span></p>
            <p class="choice-prefix" v-if="$index == 1">B<span><img v-bind:src="quiz.questions[indexQuestion].choices[1].pictureURL" alt="image" height="100" /></span></p>
            <p class="choice-prefix" v-if="$index == 2">C<span><img v-bind:src="quiz.questions[indexQuestion].choices[2].pictureURL" alt="image" height="100" /></span></p>
            <p class="choice-prefix" v-if="$index == 3">D<span><img v-bind:src="quiz.questions[indexQuestion].choices[3].pictureURL" alt="image" height="100" /></span></p>
            <p class="choice-prefix" v-if="$index == 4">E</p>
            <p class="choice-prefix" v-if="$index == 5">F</p>
            <p class="choice-text" v-html="option.description" :data-number=$index @click="choose($event.target);"> <span><img src="../../../content/images/logo-jhipster.png" alt="image" height="100" /></span> </p>
        </div>

        <!-- <div class="hover_img">
          <a href="#">Show Image<span><img src="/content/images/logo-jhipster.png" alt="image" height="100" /></span></a>
        </div> -->

      </div>
    </div>
</template>

<script lang="ts" src="./quiz-questions.components.ts">
</script>

<style scoped>

  * {
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 0;
    color: #333;
  }
  
  h1,
  h2,
  h3,
  h4 {
    margin-bottom: 1rem;
  }
  
  h1 {
    font-size: 5.4rem;
    color: #56a5eb;
    margin-bottom: 5rem;
  }
  
  h1 > span {
    font-size: 2.4rem;
    font-weight: 500;
  }
  
  h2 {
    font-size: 3.2rem;
    margin-bottom: 4rem;
    font-weight: 700;
  }
  
  h3 {
    font-size: 2.8rem;
    font-weight: 500;
  }
  
  /* UTILITIES */
  
  .container {
    background-color: #ecf5ff;
    font-size: 62.5%;

    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 80rem;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .container > * {
    width: 100%;
  }
  
  .flex-column {
    display: flex;
    flex-direction: column;
  }
  
  .flex-center {
    justify-content: center;
    align-items: center;
  }
  
  .justify-center {
    justify-content: center;
  }
  
  .text-center {
    text-align: center;
  }
  
  .hidden {
    display: none;
  }
  
  /* BUTTONS */
  .btn {
    font-size: 1.8rem;
    padding: 1rem 0;
    width: 20rem;
    text-align: center;
    border: 0.1rem solid #56a5eb;
    margin-bottom: 1rem;
    text-decoration: none;
    color: #56a5eb;
    background-color: white;
  }
  
  .btn:hover {
    cursor: pointer;
    box-shadow: 0 0.4rem 1.4rem 0 rgba(86, 185, 235, 0.5);
    transform: translateY(-0.1rem);
    transition: transform 150ms;
  }
  
  .btn[disabled]:hover {
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
  
  /* FORMS */
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  input {
    margin-bottom: 1rem;
    width: 20rem;
    padding: 1.5rem;
    font-size: 1.8rem;
    border: none;
    box-shadow: 0 0.1rem 1.4rem 0 rgba(86, 185, 235, 0.5);
  }
  
  input::placeholder {
    color: #aaa;
  }
  


.choice-container {
    display: flex;
    margin-bottom: 0.5rem;
    width: 100%;
    font-size: 1.8rem;
    border: 0.1rem solid rgb(86, 165, 235, 0.25);
    background-color: white;
  }
  
  .choice-container:hover {
    cursor: pointer;
    box-shadow: 0 0.4rem 1.4rem 0 rgba(86, 185, 235, 0.5);
    transform: translateY(-0.1rem);
    transition: transform 150ms;
  }
  
  .choice-prefix {
    padding: 1.5rem 2.5rem;
    background-color: #56a5eb;
    color: white;
  }
  
  .choice-text {
    padding: 1.5rem;
    width: 100%;
  }
  
  .correct {
    background-color: #28a745;
  }
  
  .incorrect {
    background-color: #dc3545;
  }

/* .hover_img a { position:relative; }
.hover_img a span { position:absolute; display:none; z-index:99; }
.hover_img a:hover span { display:block; } */

.choice-container p { position:relative; }
.choice-container p span { position:absolute; display:none; z-index:99; }
.choice-container p:hover span { display:block; }


  
  /* HUD */
  
  #hud {
    display: flex;
    justify-content: space-between;
  }
  
  .hud-prefix {
    text-align: center;
    font-size: 2rem;
  }
  
  .hud-main-text {
    text-align: center;
  }
  
  #progressBar {
    width: 20rem;
    height: 4rem;
    border: 0.3rem solid #56a5eb;
    margin-top: 1.5rem;
  }
  
  #progressBarFull {
    height: 3.4rem;
    background-color: #56a5eb;
    width: 0%;
  }
  
  /* LOADER
  #loader {
    border: 1.6rem solid white;
    border-radius: 50%;
    border-top: 1.6rem solid #56a5eb;
    width: 12rem;
    height: 12rem;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } */
  

</style>

