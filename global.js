// 测试类型
// var testMode = location.search.split('=')[2]

// var path_submit = 'http://221.232.55.91:10002/'                                                  // 公网 ip
var path_submit = 'http://39.101.79.70:20001/'                                                  // 公网 ip
var path = location.href.substring(0,location.href.lastIndexOf('/')) + '/images/'                // 图片文件路径

// 图片名称
var nameList = 'IMG_4478,IMG_4485,IMG_4487,IMG_4489,IMG_4490,IMG_4492,IMG_4494,IMG_4496,IMG_4497,IMG_4498,IMG_4510,IMG_4512,IMG_4516,IMG_4522,IMG_4528,IMG_4552,IMG_4553,IMG_4555,IMG_4557,IMG_4559,IMG_4560,IMG_4570,IMG_4583,IMG_4598,IMG_4601,IMG_4607,IMG_4609,IMG_4610,IMG_4612,IMG_4628,IMG_4652,IMG_4681,IMG_4695,IMG_4699,IMG_4700,IMG_4725,IMG_4726,IMG_4737,IMG_4741,IMG_4742,IMG_4743,IMG_4745,IMG_4749,IMG_4751,IMG_4752,IMG_4755,IMG_4756,IMG_4815,IMG_4822,IMG_4825,IMG_4836,IMG_4841,IMG_4846,IMG_4847,IMG_4850,IMG_4851,IMG_4852,IMG_4860,IMG_5157,IMG_5178,IMG_5181,IMG_5183,IMG_5184,IMG_5185,IMG_5187,IMG_5189,IMG_5193,IMG_5204,IMG_5263,IMG_5266,IMG_5267,IMG_5274,IMG_5293,IMG_5296,IMG_5302,IMG_5306,IMG_5307,IMG_5368,IMG_5404,IMG_5467'          

var numfunc = 5                                                                                 // 方法数量
var testFunc = ['vdslr','sterefo','deeplens','bokeh','bokehme']                               // 方法名称
// var testFunc = ['VDSLR','SteReFo','DeepLens','iPhone15Pro','BokehMe']                               // 方法名称
var testIDs = [1,2,3,4,5]    // 方法序号

// if (testMode == 1) {
//     path = location.href.substring(0,location.href.lastIndexOf('/')) + '/user_study_websites/'
//     nameList = 'mountain_1.jpg,IMG_0000.jpg'
//     numfunc = 5
//     testFunc = ['scatter','sterefo','deeplens','deepfocus','mpib']
//     testIDs = [1,2,3,4,5]
// }
// else {
//     path = location.href.substring(0,location.href.lastIndexOf('/')) + '/user_study_iphone13/'
//     nameList = 'IMG_0000.jpg,IMG_0001.jpg,IMG_0002.jpg,IMG_0392.jpg'
//     numfunc = 6
//     testFunc = ['iphone','scatter','sterefo','deeplens','deepfocus','mpib']
//     testIDs = [1,2,3,4,5,6]
// }


var imgsIDs = ['img0','img1','img2']
var lablesIDs = ['a0','a1','a2']


// 保存当前用户ID，防止多次提交
var userID

// 保存全部测试集的数量和id（用于随机出图）
var allTestLength = 80  // 50，图片总数量
var allTestIDList = new Array()
for(var i=0;i<allTestLength;i++){
    allTestIDList.push(i)
}
var maxPage = 80  // 50，图片总数量
var minPage = 10  // 10，最少提交数量
// 当前测试图像的序号
var id = 0
// 保存测试者测试数据的id
var testIDList = new Array()

// 各个img元素的list
var imgs = new Array()

// 各个img元素对应label的list
var labels = new Array()

// table：主体表格元素
// bt_start：开始按钮元素
// txt：开始前显示label元素
// tip：测试开始后的一个小提示
// div_1：测试开始前的模块
var table = document.getElementById('tb')
var txt = document.getElementById('txt')
var tip_table = document.getElementById('tip_table')
var tip_table_2 = document.getElementById('tip_table_2')
var div_1 = document.getElementById('div_1')
var input_testTD = document.getElementById('input_testID')
var submit_a = document.getElementById('submit')
var div_2 = document.getElementById('div_2')
var submitBT = document.getElementById('submitBT')
var page = document.getElementById('page')


// btxts：各个按钮对应label元素的list
// ratios：顺序选择按钮组对应元素的list
// var btxts = new Array()
// var ratios = new Array()

// nowLabelList：用于保存当前组图像的顺序在testFunc中的索引；finalLabelList：用于保存用户最喜欢的方法的总序列，暂弃用
var nowLabelList
var finalLabelList = new Array()

// allFuncSort：用于保存用户选择的list；nowFuncSort：保存用户当组图片的选择的list（注意，该list有效数字为1--numfunc）
var allFuncSort = new Array()
var nowFuncSort = [0,0,0,0,0]

// 与allFuncSort一类不同，各个方法之间无互斥关系，每一种评级都可以有多张图片选择
var finalFuncGrade = new Array()
var funcGrade = new Array()
var nowFuncGrade = [0,0]

var names = new Array()
var testID

var userType

// 记录时间
var time0 = 0
var time1 = 0
var timeList = new Array()

// 临时值
var moveLPrev = -1
var moveTPrev = -1
var moveLGlobalPrev = -1
var moveTGlobalPrev = -1

var selectState = 0

var nowFocusState = 0 // 0: 前景 1: 背景


var have_submitted = false