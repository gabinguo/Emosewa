<template>

    <div class="home row" style="margin: auto;">

        <div class="quizmenu-container" v-if="hasAnyAuthority('ROLE_USER')">
            <div id="quizzesmenu-title">
                <span>Choose one quiz</span>
            </div>
            <div id="quizzes-wraper" class="quiz-grid">
                <router-link :to="{ name: 'QuizQuestions', params: {quizId: quiz.id}}" v-for="quiz in displayedQuizzes()":key="quiz.id">
                    <button class="btn-quiz">
                    Quiz{{quiz.id}}
                    </button>
                </router-link>
                <button v-for="n in emptyBtnNum":key="n" class="btn-empty"></button>
            </div>
            <!-- <div class="btns-page">
                <button class="btn-page"><</button>
                <button class="btn-page">></button>
            </div> -->
            <div class="page-nav">
            <nav aria-label="Page navigation">
			<ul class="pagination">
				<li class="page-item">
					<button type="button" class="page-link" v-if="page != 1" @click="page--"> < </button>
				</li>

				<li class="page-item">
					<button type="button" class="page-link" v-for="pageNumber in pages.slice(page-1, page+5)":key="pageNumber" @click="page = pageNumber"> {{pageNumber}}</button>
				</li>

				<li class="page-item">
					<button type="button" @click="page++" v-if="page < pages.length" class="page-link"> > </button>
				</li>
			</ul>
		    </nav>	
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

.btn-empty{
    background-color: white;
    height: 100px;
    width: 125px;
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

button.page-link{
    font-size: 20px;
    color: #29b3ed;
    font-weight: 500;

    display: inline-block;
}

.page-nav{
    float: right;
}

</style>
