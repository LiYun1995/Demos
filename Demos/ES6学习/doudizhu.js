
function createPoker() {  //创建一副牌
    let cards = new Array()
    let poker = new Array()
    for (let i = 0; i < 13; i++) {
        switch (i) {
            case 0:
                cards[i] = 'A'
                break
            case 10:
                cards[i] = 'J'
                break
            case 11:
                cards[i] = 'Q'
                break
            case 12:
                cards[i] = 'K'
                break
            default:
                cards[i] = i + 1
                break
        }
    }
    poker = poker.concat(cards, cards, cards, cards)
    poker.push('大王')
    poker.push('小王')
    return poker
}

function upsetPoker(poker) { //洗牌算法
    for (let i = poker.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let itemAtIndex = poker[randomIndex];
        poker[randomIndex] = poker[i];
        poker[i] = itemAtIndex;
    }
    return poker
}
// let poker = createPoker()
// console.log(upsetPoker(poker))
function givePoker(poker) {  //发牌
    let player1 = poker.slice(0, poker.length / 2);
    let player2 = poker.slice(poker.length / 2, poker.length);
    return [player1, player2]
}

function startGame() {
    console.log('正在洗牌.....')
    let newPoker = createPoker()
    let gamePoker = upsetPoker(newPoker)
    console.log('确认你的角色');
    if (Math.random() * 10 >= 5) {
        console.log('你是地主！');
    } else {
        console.log('你是农民！')
    }
    console.log(givePoker(gamePoker)[0]);
}
startGame()
/* 1.洗牌 */
/* 2.牌分成两份 */
/* 3.先洗牌 */
/* 4.先洗牌 */