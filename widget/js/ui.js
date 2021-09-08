class scrollableHeader{
    constructor(e){
        this.container = document.getElementById(e);
    }

    clear(){
        this.container.innerHTML = "";
    }

    init(){
        this.clear();
        this.initPrompt();
        // if(authManager.currentUser) this.initHeader();
        // else this.initPrompt();
    }
    
    initPrompt(){
        this.container.className = "";
        this.container.className = "header"
        let card = this.createElement("div" , "" , ["prompt"])
        let textContainer = this.createElement("div" , "" , ["promptHeaderContainer"]);
        let text = this.createElement("h1" , "Login to see posts from friends and groups you follow" , ["promptHeader"]);
        let buttonsContainer = this.createElement("div" , "" , []);
        let button1 = this.createElement("button" , "Register" , ["promptButton"]);
        let button2 = this.createElement("button" , "Login" , ["promptButton"]);
        textContainer.appendChild(text);
        card.appendChild(textContainer);
        buttonsContainer.appendChild(button1);
        buttonsContainer.appendChild(button2);
        card.appendChild(buttonsContainer);
        buttonsContainer.className="promptButtonContainer";
        this.container.appendChild(card);
        console.log(this.container);
    }


    createElement(type , inner , classes){
        let e = document.createElement(type);
        e.innerHTML = inner;
        classes.forEach(c => e.classList.add(c));
        return e;
    }
}