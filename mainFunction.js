// 网页主要内容的初始化操作
function init() {
    userID = getRandom(10000000) + 1

    div_1.style.display='block'
    table.style.display='none'
    div_2.style.display='none'
    submitBT.style.disabled = true

    var getList = GetRequest()
    userType = parseInt(getList['userType'])
    //dataType = parseInt(getList['dataType'])
    //alert(userType)
    //alert(dataType)

    // path = pathS[2]
    // names = nameList[2]
    // names = nameList[1]
    names = nameList
    names = names.split(',')

    // 初始化顺序按钮组以及其label
    // for(var i=1;i<=numfunc;i++){
    //     var ratiosItem = new Array()
    //     var btxtItem = new Array()
    //     for(var j=1;j<=3;j++){
    //         var ratioID = i+'_'+j
    //         var btxtID = 'b'+i+'_'+j
    //         ratio = document.getElementById(ratioID)
    //         btxt = document.getElementById(btxtID)
    //         ratiosItem.push(ratio)
    //         btxtItem.push(btxt)
    //     }
    //     ratios.push(ratiosItem)
    //     btxts.push(btxtItem)
    // }


    // 初始化img以及其label的list
    for (var i=0;i<imgsIDs.length;i++)
    {
        imgs[i] = document.getElementById(imgsIDs[i])
        labels[i] = document.getElementById(lablesIDs[i])
    }

}

// 用户点下开始测试的事件
function start(){
    for(var i =0;i<getRandom(20)+1;i++){
        allTestIDList.sort(randomSort)
    }
    for (var i =0;i<allTestLength-maxPage;i++){
        allTestIDList.pop()
    }

    div_1.style.display='none'
    table.style.display='block'
    div_2.style.display='none'

    //更新页数
    flashPageNum()
    timeList.pop()
    id = allTestIDList.pop()

    //alert(names[id])
    var info = randomChangeImage(id)
    nowLabelList = info[0]
    // nowFocusState = info[1]
    // console.log(nowFocusState)
}

function flashPageNum() {
    var allPage = maxPage
    var nowPage = maxPage - allTestIDList.length + 1
    page.innerHTML = nowPage+' / '+allPage

    time1 = time0
    time0 = new Date().getTime()
    time0 = time0/1000
    timeList.push(parseInt(time0-time1))
}



// 用户点击下一张时的事件
function next() {
    // var flagList = new Array()
    // var flag = true
    // for(var i=0;i<numfunc;i++){
    //     flagList.push(false)
    // }
    // for(var i=0;i<numfunc;i++){
    //     for(var j=0;j<3;j++){
    //         if(ratios[i][j].checked){
    //             flagList[i] = true
    //             break
    //         }else {
    //             flagList[i] = false
    //         }
    //     }
    // }
    // for(var i=0;i<numfunc;i++){
    //     if(flagList[i]==false){
    //         flag = false
    //         break
    //     }
    // }

    if(maxPage - allTestIDList.length + 1 > minPage){
        submitBT.style.disabled = false
        submitBT.style.color = 'black'
    }


    finalFuncGrade.push(getChossese(nowLabelList, nowFuncGrade))
    resetNow()
    testIDList.push(id)

    if (finalFuncGrade.length == maxPage) {
        submitTB()
        return
    }

    //更新页数
    flashPageNum()
    id = allTestIDList.pop()
    var info = randomChangeImage(id)
    nowLabelList = info[0]
}

function submitTB() {
    if(finalFuncGrade.length>=minPage){
        if (have_submitted == false) {
            have_submitted = true
            var userNames = new Array()
            for(var i = 0;i<testIDList.length;i++){
                userNames.push(names[testIDList[i]])
            }
            submit_a.href = path_submit + '1;' + userType +';' + userID + ';' + userNames+';'+ finalFuncGrade + ';' + timeList
            // submit_a.href = path_submit + '1;' + userType +';' + userID+ ';' + testMode + ';' + userNames+';'+ finalFuncGrade + ';' + timeList
            //alert(submit_a.href)
            submit_a.click()
        }
    }
}

// 用户点击重置当前组选择的事件
function resetNow() {
    for(var i=0;i<2;i++){
        nowFuncGrade[i] = 0
        var item1 = document.getElementById("td_1")
        var item2 = document.getElementById("td_2")
        var word1 = document.getElementById("a1")
        var word2 = document.getElementById("a2")
        item1.style.backgroundColor = ''
        item2.style.backgroundColor = ''
        word1.style.color = 'black'
        word2.style.color = 'black'
    }
}

// // 顺序组按钮相关事件
// // a表示第几张图片，b表示这张图片的顺序
// function onStateChange(a,b){
//     nowFuncGrade[a-1] = b
//     for(var i=1;i<=numfunc;i++){
//         for(var j=1;j<=3;j++){
//             if(i==a && j==b){
//                 btxts[i-1][j-1].style = 'color: red'
//             }else if(i == a && j !=b){
//                 btxts[i-1][j-1].style = 'color: black'
//             }
//         }
//     }
// }


// 鼠标点击图像相关事件
function colorChange(a) {
    var item1 = document.getElementById("td_" + a)
    var item2 = document.getElementById("td_" + (3-a))
    var word1 = document.getElementById("a" + a)
    var word2 = document.getElementById("a" + (3-a))
    if (nowFuncGrade[a-1] == 1) {
        nowFuncGrade[a-1] = 0
        item1.style.backgroundColor = ''
        word1.style.color = 'black'
    }
    else {
        nowFuncGrade[a-1] = 1
        nowFuncGrade[2-a] = 0
        // item1.style.backgroundColor = 'orangered'
        item1.style.backgroundColor = 'mediumseagreen'
        item2.style.backgroundColor = ''
        word1.style.color = 'white'
        word2.style.color = 'black'
    }
    // console.log(nowFuncGrade)
}


function magnifystart(a, row) {
    for(var a=0;a<3;a++) {
        // var bigImg = document.getElementById("bigImg")
        var img = document.getElementById("img" + a)
        var shadow = document.getElementById("shadow" + a)
        var bigImg = document.getElementById("bigImg" + a)
        var big = document.getElementById("big" + a)
        bigImg.src = img.src
        shadow.style.display="block";
        big.style.display="block";
        change(event, a, a);
    }
}

function magnifying(a, row) {
    for(var a=0;a<3;a++) {
        change(event, a, a);
    }
}

function magnifyend(a, row) {
    for(var a=0;a<3;a++) {
        var shadow = document.getElementById("shadow" + a)
        var big = document.getElementById("big" + a)
        shadow.style.display="none";
        big.style.display="none";
        moveLPrev = -1
        moveTPrev = -1
        moveLGlobalPrev = -1
        moveTGlobalPrev = -1

    }
}

function change(event, a, row){
    // var evt=event?event:window.event;
    var img = document.getElementById("img" + a)
    var bigImg = document.getElementById("bigImg" + a)
    W = img.width
    H = img.height
    shadowW = W / 3
    shadowH = H / 3
    var evt=event
    var moveL=evt.offsetX-shadowW/1.5
    var moveT=evt.offsetY-shadowH/1.5
    var moveLGlobal=evt.layerX-shadowW/1.5
    var moveTGlobal=evt.layerY-shadowH/1.5

    if(moveL<0){
        moveLGlobal=moveLGlobal-moveL
        moveL=0
    }
    if(moveL>W-shadowW){
        moveLGlobal=moveLGlobal-(moveL-W+shadowW)
        moveL=W-shadowW
    }
    // console.log(moveL, W-shadowW)
    
    if(moveT<0){
        moveTGlobal=moveTGlobal-moveT
        moveT=0
    }
    if(moveT>H-shadowH){
        moveTGlobal=moveTGlobal-(moveT-H+shadowH)
        moveT=H-shadowH
    }

    if (moveL == moveLPrev) {
        moveLGlobal = moveLGlobalPrev
    }
    else {
        moveLPrev = moveL
        moveLGlobalPrev = moveLGlobal
    }
    if (moveT == moveTPrev) {
        moveTGlobal = moveTGlobalPrev
    }
    else {
        moveTPrev = moveT
        moveTGlobalPrev = moveTGlobal
    }
    /**
     * 图片放大
     */
    bigImg.style.left=-moveL+"px";
    bigImg.style.top=-moveT+"px";

    var shadow = document.getElementById("shadow" + a)
    shadow.style.left=moveLGlobal+"px"
    shadow.style.top=moveTGlobal+"px"

    // console.log(moveL, moveT, moveLGlobal, moveTGlobal)
}



// 用户提交测试完所有数据时的上传操作
function over() {
    submitTB()
}