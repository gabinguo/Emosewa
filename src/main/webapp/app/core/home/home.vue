<template>

    <div class="home row" style="margin: auto;">
    
        <div class="quizmenu-container" v-if="hasAnyAuthority('ROLE_USER')">
            <div id="quizzesmenu-title">
                <span>Choose one quiz</span>
            </div>
            <div id="quizzes-wraper" class="quiz-grid">
                <button class="btn-quiz">Quiz 1</button>
                <button class="btn-quiz">Quiz 2</button>
                <button class="btn-quiz">Quiz 3</button>
                <button class="btn-quiz">Quiz 4</button>
                <button class="btn-quiz">Quiz 5</button>
                <button class="btn-quiz">Quiz 6</button>
                <button class="btn-quiz">Quiz 7</button>
                <button class="btn-quiz">Quiz 8</button>
                <button class="btn-quiz">Quiz 9</button>
            </div>
            <div class="btns-page">
                <button class="btn-page"><</button>
                <button class="btn-page">></button>

            </div>
        </div>

        <div class="alert alert-warning" v-if="!authenticated">
                    <a class="alert-link" v-on:click="openLogin()">sign in</a>
        </div>
    </div>
</template>

<script lang="ts" src="./home.component.ts">
</script>

<style scoped>

#quizzesmenu-title{
    font-family: 'Times New Roman', Times, serif;
    font-weight: bold;
    text-align: center;
    font-size: 30px;
    padding: 10px 0;
}

.quizmenu-container{
    border-radius: 5px;
    box-shadow: 0 0 10px 2px;
    margin: auto;
    padding: 30px;
    width: 495px;
    height: 555px;
}

.btn-quiz {
    background-color: #0267A1;
    border-radius: 10px;
    padding: 5px 10px;
    color: white;
    outline: none;
    width: 125px;
    height: 100px;
    margin: auto;   
}

.btn-quiz:hover {
    border-color: black;
    box-shadow: 0 0 10px 4px #333333;
}

.quiz-grid {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 30px;
    margin: 20px auto;
}

.btn-page{
    background-color: white;
    border-radius: 2px;
    margin-left: 8px;
    width: 35px;
    color: black;
}

.btns-page{
    text-align: right;
}

.btn-page:hover{
    color: #ABABAB;
    box-shadow: 0 0 10px 2px #333333;
}
</style>
