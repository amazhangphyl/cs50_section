function number(){
    let random_num = Math.floor(Math.random()*123897421);
    document.getElementById("number").innerHTML = random_num;
};

function fruit(){
    let fruits = ["apple", "banana", "watermelon", "strawberry", "berry", "lemon", "oranges", "cherry", "lychee", "mango", "peach", "dragonfruit"];
    let random_fruit = fruits[Math.floor(Math.random()*fruits.length)];
    document.getElementById("fruit").innerHTML = random_fruit;
};

function color(){
    let hex = "#";
    for (let i = 0; i < 3; i++){
        let c = Math.floor(Math.random() * 256);
        hex += c.toString(16);
    }
    document.getElementById("color").style.backgroundColor = hex;
};