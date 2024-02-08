function getRandom(range) {
    var num = Math.random() //获取0-1之间的数字
    num = num*range
    num = Math.floor(num)  //向下取整
    return num
}

function randomSort() {
    return Math.random() > 0.5 ? -1 : 1
}

//********************************图像生成顺序相关**************************************//
// 按照所给的方法索引list显示图像
// 所需全局变量：imgs，labels，path，names，testFunc
function changeImage(i, lableList) {
    var img_path = new Array()

    for(var j=0;j<1+testFunc.length;j++){
        if(j==0){
            img_path[j] = path + 'image' + '/' + names[i] + '.jpg'
            // img_path[j]='C:/Users/JuewenPeng/Documents/SmartLab/CVPR2022/Figures/Fig1/iphone.jpg'
        }
        else {
            img_path[j] = path + testFunc[j-1] + '/' + names[i] + '.jpg'
            // img_path[j]='C:/Users/JuewenPeng/Documents/SmartLab/CVPR2022/Figures/Fig1/iphone_bokeh.jpg'
        }
    }

    for (var j=0;j<imgs.length;j++)
    // for (var j=0;j<imgs.length;j++)
    {
        if (j < 1){
            imgs[j].setAttribute('src',img_path[j])
            // labels[j].innerText = 'All-in-Focus'
            // continue
        }
        else {
            var num = lableList[j-1]
            imgs[j].setAttribute('src',img_path[num+1])
            // labels[j].innerText = testFunc[num]
            // labels[j].innerText = j
        }
    }
}

// 每组图片的顺序要随机生成，最终返回当前组图片对于方法的索引list
function randomChangeImage(i){
    // var lableList = [0, 1, 2, 3, 4]
    // lableList.sort(randomSort)
    // var labelListTop2 = [lableList[0], lableList[1]]
    // var lableList = [0, 1, 2, 3]
    // lableList.sort(randomSort)
    // var label1 = lableList[0]
    var label1 = getRandom(numfunc-1)
    // console.log(label1)
    var label2 = numfunc-1
    labelListTop2 = [label1, label2]
    labelListTop2.sort(randomSort)

    // var focusState = getRandom(2) // 0: 前景 1: 背景
    changeImage(i, labelListTop2)
    return [labelListTop2]
}
//**********************************************************************//

//********************************选择顺序与方法顺序相关操作**************************************//
// 用于处理nowLabelList与nowFuncSort的关系，并返回当前组用户选择方法名的list
function getChossese(nowLabelList, nowFuncGrade) {
    var nowFuncChosse= new Array()
    for (var i=0; i<numfunc; ++i) {
        nowFuncChosse[i] = -1
    }
    for (var i=0; i<2; ++i){
        var chosse_index = nowLabelList[i]
        var chosse = nowFuncGrade[i]
        nowFuncChosse[chosse_index] = chosse
    }
    // console.log(nowFuncChosse)
    // nowFuncChosse[numfunc] = nowFocusState  // 最后一维表示聚焦的位置
    // console.log(nowFuncChosse)
    return nowFuncChosse
}
//**********************************************************************//

//********************************输入有效性相关**************************************//
function test_testID(testID) {
    testID = parseInt(testID)
    if(testIDs.indexOf(testID) == -1){
        return false
    }else{
        return true
    }
}
//**********************************************************************//

//********************************网页请求相关**************************************//
// 获取网页GET请求
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}