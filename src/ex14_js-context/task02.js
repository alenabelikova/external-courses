function Hangman(_word){
    var word;
    const maxMistakeCount=6;
    var wrongSymbols= new Array();
    var guessedString="";
    startAgain(_word);

    function startAgain(_word){
        word=_word;
        guessedString="";
        wrongSymbols= new Array();
        for (let i = 0; i < word.length; i++) {
            guessedString+='_';
        }
        return this;
    }
    function getGuessedString(){
        console.log(guessedString);
        return this;
    }
    function getErrorsLeft(){
        console.log((maxMistakeCount-wrongSymbols.length).toString());
        return this;
    }
    function getWrongSymbols(){
        console.log(wrongSymbols.toString());
        return this;
    }

    function guess(symbol){
        var guessed =false;
        for (let i = 0; i < word.length; i++) {
            if (symbol===word[i]) {
                guessed = true;
                guessedString=guessedString.substr(0,i)+symbol+guessedString.substr(i+1);
            }    
        }
        if (guessedString===word) {
            console.log(guessedString+" | You won!");
        }
        else{
            if (guessed) {
                console.log(guessedString);
            }
            else
            {
                wrongSymbols.push(symbol);
                console.log("wrong letter, errors left "+(maxMistakeCount-wrongSymbols.length) +" | "+ wrongSymbols);
                if (maxMistakeCount===wrongSymbols.length) {
                    console.log('You are hanged!');
                }
            }
        }
        return this;
    }
    function getStatus(){
        console.log(guessedString+" | errors left "+(maxMistakeCount-wrongSymbols.length));
        return this;
    }
    return {startAgain, getGuessedString, getErrorsLeft, getWrongSymbols, guess, getStatus};
}

var hangman = new Hangman('webpurple');
hangman.guess('w'); // "w________"
hangman.guess('e'); // "we______e"
hangman.guess('a'); // "wrong letter, errors left 5 | a"
hangman.guess('p'); // "we_p__p_e"
hangman.guess('k'); // "wrong letter, errors left 4 | a,k"
hangman.guess('b');
hangman.guess('u');
hangman.guess('r');
hangman.getGuessedString();
hangman.getErrorsLeft();
hangman.getWrongSymbols();
hangman.getStatus();
hangman.guess('l');
hangman.startAgain('asdfg').getStatus().guess('s').guess('f').guess('a').guess('i').guess('c').guess('t').guess('o').guess('d').guess('n').guess('m');
